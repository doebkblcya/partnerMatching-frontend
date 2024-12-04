<template>
  <div style="text-align: center; margin-top: 30px; margin-bottom: 15px">
    <van-icon name="friends" size="100px" color="#07c160"/>
  </div>
  <div id="title" style="text-align: center; margin-top: 30px; margin-bottom: 30px">
    <h3>光仔匹配，专业寻找学习伙伴</h3>
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button style="margin-left: 15%;" round type="success" native-type="submit">
        登录
      </van-button>
      <van-button style="margin-left: 30%;" type="primary" round is-link to="register">注册</van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (values) => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res, '用户登录');
  console.log('code', res.data)
  if (res.data.code === 0 && res.data) {
    showToast('登录成功');
    const redirectUrl = route.query?.redirect as String ?? '/';
    window.location.href = redirectUrl;
  } else {
    showToast('登录失败');
  }
};

</script>

<style scoped>

</style>