<template>
  <div id="teamAdd">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="registerUserDate.userAccount" name="userAccount" label="用户名" placeholder="请输入用户名"
                   :rules="Rules.userAccount" />

        <van-field v-model="registerUserDate.username" name="username" label="用户昵称" placeholder="请输入用户昵称"
                   :rules="Rules.username" />

        <van-field name="gender" label="性别">
          <template #input>
            <van-radio-group v-model="registerUserDate.gender" direction="horizontal">
              <van-radio :name="1">男</van-radio>
              <van-radio :name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field v-model="registerUserDate.userPassword" type="password" name="userPassword" label="密码"
                   placeholder="请输入密码" :rules="Rules.userPassword" />
        <van-field v-model="registerUserDate.checkPassword" type="password" name="checkPassword" label="校验密码"
                   placeholder="请输入校验密码" :rules="Rules.checkPassword" />

        <van-field v-model="registerUserDate.phone" name="phone" label="电话号码" placeholder="请输入电话号码"
                   :rules="Rules.phone" />
        <van-field v-model="registerUserDate.email" name="email" label="邮箱地址" placeholder="请输入邮箱地址"
                   :rules="Rules.email" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import MyAxios from '../plugins/myAxios.ts';
import { showToast } from 'vant';

const router = useRouter()

let Rules = ref({
  username: [{ required: true, message: '请填写用户昵称' }],
  userAccount: [{ required: true, message: '请填写用户名' }],
  gender: [{ required: true, message: '请填写性别' }],
  userPassword: [{ required: true, message: '请填写密码' }],
  checkPassword: [{ required: true, message: '请再次填写密码' }],
  phone: [{ required: true, message: '请填写电话号码' }],
  email: [{ required: true, message: '请填写邮箱地址' }],
})

const initFormData = {
  "username": "",
  "userAccount": "",
  "gender": 1,
  "userPassword": "",
  "checkPassword": "",
  "phone": null,
  "email": null,
}
// 用户填写的表单数据
const registerUserDate = ref({ ...initFormData })

let initStatus = registerUserDate.value.status == 0
const passwordDisabled = ref(initStatus)

const checkSubmit = async () => {
  const userAccount = registerUserDate.value.userAccount
  if (!userAccount || !userAccount.trim()) {
    showToast({
      message: '请填写用户名且前后不要加空格',
      type: 'fail'
    })
    return false
  }
  const res = await MyAxios.post('/user/account/exist', {
    userAccount
  })
  if (!res.data.date) {
    return true
  } else {
    showToast({
      message: '用户名已存在',
      type: 'fail'
    })
    return false
  }
}

const onSubmit = async () => {
  let check_res = await checkSubmit()
  if (!check_res) {
    return
  }

  const response = await MyAxios.post("/user/register", {
    ...registerUserDate.value
  })
  if (response.data.code === 0 && response.data.date > 0) {
    showToast({
      message: '注册成功',
      type: 'success'
    })
    router.push({
      path:'/user/login',
      replace:true,// 防止用户回退到此页面
    });
  } else {
    showToast({
      message: response.msg || '注册失败',
      type: 'fail'
    })
  }
}
</script>

<style scoped></style>