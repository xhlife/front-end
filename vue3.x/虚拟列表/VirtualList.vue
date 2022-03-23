<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div
      class="infinite-list-phantom"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUpdated } from 'vue';
const props = defineProps({
  listData: {
    type: Array,
    defaut: () => [],
  },
  itemSize: {
    type: Number,
    default: 200,
  },
});
const list = ref<HTMLDivElement>(null);
const items = ref<HTMLDivElement>(null);
// 可视区域的高度
const screenHeight = ref<number>(0);
// 偏移量
const startOffset = ref<number>(0);
// 开始索引
const start = ref<number>(0);
// 结束索引
const end = ref<number | null>(null);

// 列表高度
const listHeight = computed(() => props.listData?.length * props.itemSize);
// 可显示的列表项数
const visibleCount = computed(() =>
  Math.ceil(screenHeight.value / props.itemSize)
);
// 偏移量对应的style
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0`);
// 真实展示显示列表的数据
const visibleData = computed(() =>
  props.listData?.slice(start.value, Math.min(end.value, props.listData.length))
);
onMounted(() => {
  screenHeight.value = list.value.clientHeight;
  start.value = 0;
  end.value = start.value + visibleCount.value;
});
function scrollEvent() {
  // 当前滚动位置
  let scrollTop = list.value.scrollTop;
  start.value = Math.floor(scrollTop / props.itemSize);
  end.value = start.value + visibleCount.value;
  startOffset.value = scrollTop - (scrollTop % props.itemSize);
}
</script>

<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}
.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
