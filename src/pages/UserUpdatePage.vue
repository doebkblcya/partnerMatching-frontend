<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
              @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount"
              @click="toEdit('userAccount', '账号', user.userAccount)"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
      <img style="height: 40px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="性别" is-link :value="getGenderText(user.gender)" @click="toEdit('gender', '性别', user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
    <van-cell title="个人介绍" is-link to="/user/edit" :value="user.profile" @click="toEdit('profile', '个人介绍', user.profile)"/>
<!--    <van-cell title="我的标签" is-link :value="formatTags(user.tags)" to="/user/edit/tags" @click="toEditTags('tags', '标签', user.tags)" />-->
    <van-cell title="星球编号" :value="user.planetCode"/>
    <van-cell title="注册时间" :value="user.createTime.toISOString()"/>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user";

// const user = {
//   id: 1,
//   username: '二蛋',
//   userAccount: 'xxErdan',
//   avatarUrl: 'https://gips3.baidu.com/it/u=1004796864,1363400944&fm=3039&app=3039&f=JPEG?w=1024&h=1024',
//   gender: '男',
//   phone: '12312312333',
//   email: '12345@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const user = ref();

onMounted(async () => {
  const res = await getCurrentUser();
  // console.log("res1=", res)
  if (res.code === 0) {
    const timeStr = res.date.createTime;

    // 将非标准时间字符串转换为标准格式
    const createTime = new Date(
        timeStr.includes("-")
            ? timeStr
            : +new Date(timeStr)
    );

    // console.log(createTime)

    user.value = {
      ...res.date,
      // 加上8小时转换为东八区时间
      createTime: new Date(createTime.getTime() + 8 * 60 * 60 * 1000)
    }
    showToast('获取用户信息成功');
    // console.log(res.date)
  } else {
    showToast('获取用户信息失败');
  }
})

const router = useRouter();

const getGenderText = computed(() => (gender: number | null) => {
  if (gender === 0) {
    return '男'
  } else if (gender === 1) {
    return '女'
  } else {
    return '该用户很懒,未填写'
  }
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  //校验是否为null
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<style scoped>

</style>