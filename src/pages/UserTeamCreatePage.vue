<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @click="onSearch"/>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
    <van-button class="add-button" type="primary" icon="plus" @click="doJoinTeam"/>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";

const router = useRouter();
const searchText = ref('');

//跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

/**
 * 搜索创建的队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  // console.log("val=", val)
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.data.code === 0) {
    teamList.value = res.data.date;
  }else {
    showToast("加载队伍失败，请刷新重试");
  }
}

/**
 * 关键词搜索当前用户创建的队伍
 * todo 需要在当前用户创建的队伍里面搜，搜完给予返回功能
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeamCreate = async (val = '', status = 0) => {
  // console.log("val=", val)
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.data.code === 0) {
    teamList.value = res.data.date;
  }else {
    showToast("加载队伍失败，请刷新重试");
  }
}

// 只会在页面加载时创建一次
onMounted(() => {
  listTeam();
})

const onSearch = (val) => {
  // console.log("val",val.target.value.toString());
  const searchText = val.target.value.toString() // 转换为字符串
  listTeamCreate(searchText);
}
</script>

<style scoped>
#teamPage {

}
</style>