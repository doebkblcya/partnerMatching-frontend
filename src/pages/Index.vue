<template>
  <van-cell center title="心动模式">
    <van-icon name="like" size="15" color="#ff976a"/>
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import {showToast} from 'vant';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const route = useRoute();
const isMatchMode = ref<boolean>(false);

const userList = ref([]);
const loading = ref(true)

const loadData = async () => {
  let userListData;
  loading.value = true;
  //心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
   userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          // console.log('/user/match success', response);
          // showToast("请求成功")
          return response?.data?.date;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          showToast('请求失败')
        });
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          // console.log('/user/recommend success', response.data.date.records);
          // showToast("请求成功")
          return response?.data?.date?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showToast('请求失败')
        });
  }
  // 遍历date数组并将每个对象转换为字符串（例如，使用JSON.stringify）并添加到userList.value中
  // console.log("userListData2", userListData.date)
  if (userListData) {
    (userListData).forEach((user: UserType) => {
      // console.log("userListData", userListData)
      // console.log("user.tags", user.tags)
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
      // 这里我们使用JSON.stringify将对象转换为数组，但您可以根据需要进行更复杂的处理
      // userList.value.push(user);
    });
    userList.value = userListData;
// 现在userList.value包含了date数组中每个对象的字符串表示
//     console.log(userList.value);
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

</script>

<style scoped>

</style>