<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @click="onSearch"/>
<!--    <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>-->
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
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

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  // console.log("val=", val)
  const res = await myAxios.get("/team/list/my/join", {
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
 * todo 需要在当前用户加入的队伍里面搜，搜完给予返回功能
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeamJoin = async (val = '', status = 0) => {
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
  listTeamJoin(searchText);
}
</script>

<style scoped>
#teamPage {

}
</style>