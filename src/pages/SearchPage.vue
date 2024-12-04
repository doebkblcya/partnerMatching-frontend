<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {showToast} from 'vant';
import {useRouter} from "vue-router";

const router = useRouter();
const loading = ref(false);  // 添加loading状态
const searchText = ref('');

const originTagList = [
  {
    text: '专业',
    children: [
      {text: 'Java', id: 'java'},
      {text: 'C++', id: 'c++'},
      {text: 'Go', id: 'go'},
      {text: '嵌入式', id: '嵌入式'},
      {text: 'Python', id: 'python'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '研一', id: '研一'},
      {text: '研二', id: '研二'},
      {text: '研三', id: '研三'},
    ],
  },
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '状态',
    children: [
      {text: '单身', id: '单身'},
      {text: '有对象', id: '有对象'},
      {text: '已婚', id: '已婚'},
      {text: 'emo', id: 'emo'},
      {text: '内卷', id: '内卷'},
    ],
  },
]

//标签列表
let tagList = ref(originTagList);

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
};

const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/**
 * 执行搜索
 */
const doSearchResult = () => {
  loading.value = true;  // 开始搜索时设置loading
  try {
    // 执行搜索后跳转
    router.push({
      path: '/user/list',
      query: {
        tags: activeIds.value
      }
    });
  } finally {
    loading.value = false;  // 搜索完成后设置loading为false
  }
}

</script>

<style scoped>

</style>