import SparkMD5 from 'spark-md5';

self.onmessage = (e) => {
  const { chunks} = e.data;
  const spark = new SparkMD5.ArrayBußffer();

  let progress = 0;
  let count = 0;
  const loadNext = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(chunks[index].file);
    reader.onload = e => {
      count ++;
      spark.append(e.target.result);
      if(count == chunks.length) {
        self.postMessage({
          progress: 100,
          hash: spark.end()
        })
      } else {
        progress += 100 / chunks.length;
        self.postMessage({
          progress
        })
        loadNext(count)
      }
    }
  }
  loadNext(0);
}