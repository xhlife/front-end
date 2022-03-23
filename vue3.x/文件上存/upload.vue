<template>
  <div ref="dragEl">
    <input type="file" @change="fileChage" />
    <button @click="uploadFile">上传</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import SparkMD5 from 'spark-md5';

interface chunkItem {
  index: number;
  file: Blob;
}
const file = ref<File>();
const hash = ref(null);
const fileChunks = ref<Array<any>>([]);

const hashProgress = ref<number>(0);
function createFileChunk(file: File, size?: number): Array<chunkItem> {
  size > 0 && size ? null : (size = 2 * 1024 * 1024);
  const chunks = [];
  let cur = 0;
  while (cur < file.size) {
    chunks.push({
      index: cur,
      file: file.slice(cur, cur + size),
    });
    cur += size;
  }
  return chunks;
}
async function uploadFile(): void {
  // 文件切片, 切片的大小，可以根据网速去确定切片的大小
  const chunks = createFileChunk(file.value);
  fileChunks.value = chunks;
  console.log(chunks);

  // chunks hash
  const _hash = calculateHashSample();
  const _hash2 = calculateHashIdle();
  setTimeout(() => {
    console.log(_hash, _hash2);
  }, 10000);
  _hash2.then((res) => {
    console.log(res);
  });

  hash.value = _hash;
  fileChunks.value = chunks.map((chunk, index) => {
    // 切片的名字
    const name = hash + '-' + index;
    return {
      hash,
      name,
      index,
      chunk: chunk.file,
      progress: 0,
    };
  });
  await uploadChunks();
}
async function uploadChunks() {}

const worker = ref<Worker>();

// 利用webworker 计算hash
async function calculateHashWorker() {
  return new Promise((resolve) => {
    worker.value = new Worker('./hash.js');
    worker.value.postMessage({ chunks: fileChunks.value });
    worker.value.onmessage = (e: MessageEvent) => {
      const { progress, hash } = e.data;
      hashProgress.value = Number(progress.toFixed(2));
      if (hash) {
        resolve(hash);
      }
    };
  });
}
// 利用浏览器空闲时间计算hash
async function calculateHashIdle() {
  const chunks = fileChunks.value;
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    let count = 0;
    const appendtoSpark = async (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          spark.append(e.target?.result);
          resolve();
        };
      });
    };
    const workLoop = async (deadline) => {
      while (count < chunks.length && deadline.timeRemaining() > 1) {
        // 有空闲时间， 且有任务
        await appendtoSpark(chunks[count].file);
        count++;
        if (count < chunks.length) {
          hashProgress.value = Number(
            ((100 * count) / chunks.length).toFixed(2)
          );
        } else {
          hashProgress.value = 100;
          console.timeEnd();
          resolve(spark.end());
        }
      }
      window.requestIdleCallback(workLoop);
    };
    console.time();
    window.requestIdleCallback(workLoop);
  });
}

async function calculateHashSample() {
  // 1个G 文件抽样5M以内
  // hash 一样， 文件不一定一样
  // hash 不一样， 文件一定不一样
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    const _file = file.value;
    const _size = file.value?.size;
    const offset = 2 * 1024 * 1024;

    // 第一个(区块) 2M ， 最后的一个区块数据全要
    let chunks = [_file?.slice(0, offset)];
    let cur = offset;
    while (cur < _size) {
      if (cur + offset >= _size) {
        // 最后一个区块
        chunks.push(_file?.slice(cur, cur + offset));
      } else {
        // 中间区块
        const mid = cur + offset / 2;
        const end = cur + offset;
        chunks.push(_file?.slice(cur, cur + 2));
        chunks.push(_file?.slice(mid, mid + 2));
        chunks.push(_file?.slice(end - 2, end));
      }
      cur += offset;
    }
    reader.readAsArrayBuffer(new Blob(chunks));
    reader.onload = (e) => {
      spark.append(e.target.result);
      hashProgress.value = 100;
      resolve(spark.end());
    };
  });
}
function mergeRequest() {
  axios.post('/test', {
    ext: file.value?.name.split('.').pop(),
    size: 20,
    hash: hash.value,
  });
}
async function fileChage(e: Input) {
  if (!e.target.files || !e.target.files.length) return;
  file.value = e.target.files[0];
  const type = await isPng(file.value);
  console.log(type);
}

// 根据二进制文件头，判断文件是什么格式 （图片的宽高也可以在二进制文件头读取）
// 为什么不采用input的type属性？ 因为重命名就没用了
function blobToString(blob: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      console.log(reader.result);
      console.log(reader.result.split('').map((v) => v.charCodeAt()).map((v) => v.toString(16).toUpperCase()));

      const ret = reader.result
        .split('')
        .map((v) => v.charCodeAt())
        .map((v) => v.toString(16).toUpperCase())
        .map((v) => v.padStart(2, '0')) /* 不够两个字符，前面布0 */
        .join(' ');
      resolve(ret);
    };
    reader.readAsBinaryString(blob);
  });
}
async function isGif(file: File) {
  // GIFT89a 和 GIF87a
  // 前面6个16进制，‘47 49 46 38 39 61’  ’47 49 46 38 37 61‘
  // 16进制的抓安环
  const ret = await blobToString(file.slice(0, 6));
  const isGif = ret == '47 49 46 38 39 61' || ret == '47 49 46 38 37 61';
  return isGif;
}
async function isPng(file: File) {
  const ret = await blobToString(file.slice(0, 8));
  const isPng = ret === '89 50 4E 47 0D 0A 1A 0A';
  return isPng;
}
async function isJpg(file: File) {
  const len = file.size;
  const start = await blobToString(file.slice(0, 2));
  const tail = await blobToString(file.slice(-2, len));
  const isJpg = start === 'FF D8' && tail === 'FF D9';
  return isJpg;
}

async function isImage(file: File) {
  return (await isGif(file)) || (await isPng(file));
}
// 通过拖拽的方式，选中需要上存的文件
const dragEl = ref<HTMLDivElement>();
function bindEvents() {
  const drag = dragEl.value;
  drag?.addEventListener('dragover', (e) => {
    drag.style.borderColor = 'red';
    e.preventDefault();
  });
  drag?.addEventListener('dragleave', (e) => {
    drag.style.borderColor = '#eee';
    e.preventDefault();
  });
  drag?.addEventListener('drop', (e) => {
    const fileList = e.dataTransfer?.files;
    drag.style.borderColor = '#eee';
    file.value = fileList[0];
    e.preventDefault();
  });
}
</script>

<style></style>
