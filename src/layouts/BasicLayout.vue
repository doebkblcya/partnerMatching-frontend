<template>
  <van-nav-bar
      :title="title"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right v-if="showTabbar">
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

<!--  <van-notice-bar v-show="showTabbar" left-icon="volume-o" :scrollable="false">-->
<!--    <van-swipe-->
<!--        vertical-->
<!--        class="notice-swipe"-->
<!--        :autoplay="3000"-->
<!--        :touchable="false"-->
<!--        :show-indicators="false"-->
<!--    >-->
<!--      <van-swipe-item>明月直入，无心可猜。</van-swipe-item>-->
<!--      <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>-->
<!--      <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>-->
<!--      <van-swipe-item>欲买桂花同载酒，终不似，少年游。</van-swipe-item>-->
<!--    </van-swipe>-->
<!--  </van-notice-bar>-->

  <van-notice-bar
      v-show="showTabbar"
      left-icon="volume-o"
      color="#1989fa" background="#ecf9ff"
      text="欢迎使用伙伴匹配，在这里你可以寻找你的学习伙伴和生活伙伴甚至是灵魂伴侣，同时本系统支持匹配相同爱好的伙伴和组队功能，但是要遵纪守法哦。最后欢迎大家提出反馈和建议！"
  />
  <!--  <slot name="content">-->
  <!--    <div>在这里写内容</div>-->
  <!--  </slot>-->
  <div id="content">
    <router-view/>
  </div>

  <!--  <router-link to="/">GO to Home</router-link>-->
  <!--  <router-link to="/team">队伍</router-link>-->

  <van-tabbar v-show="showTabbar" route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import routes from "../config/route";

const router = useRouter()
const route = useRoute()
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

const showTabbar = ref(true);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  // console.log(to, from);
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
  // console.log(toPath === '/user/login')
  if (toPath === '/user/login' || toPath === '/user/register') {
    showTabbar.value = false
  } else {
    showTabbar.value = true
  }
})

const onClickLeft = () => {
  // router.push('/')
  router.back();
};
const onClickRight = () => {
  router.push('/search')
};

// const shouldShowTabbar = (path: string) => {
//   console.log(route.path)
//   console.log( path !== "/user/login" && path !== "/register")
//   // 在此处编写判断逻辑,根据当前路径决定是否显示 <van-tabbar>
//   // 例如,可以在特定路径下隐藏 tabbar
//   return path !== "/user/login" && path !== "/register";
// };

onMounted(() => {
  if (route.path === '/user/login') {
    showTabbar.value = false
  }
});

watch(
    () => route.path,
    (newName) => {
      // console.log(newName === '/user/login')
      if (newName === '/user/login' || newName === '/user/register') {
        showTabbar.value = false
      } else {
        showTabbar.value = true
      }
    }
);

// const active = ref("index");
// const onChange = (index) => showToast(`标签 ${index}`);
</script>

<style scoped>
#content {
  padding-bottom: 50px;
  /*background-color: aquamarine;*/
}

 .notice-swipe {
   height: 40px;
   line-height: 40px;
 }
</style>