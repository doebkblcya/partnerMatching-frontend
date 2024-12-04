<template>
  <van-form @submit="onSubmit">
    <van-field v-if="editUser.editKey === 'gender'" :name="editUser.editKey" :label="editUser.editName">
      <template #input>
        <van-radio-group v-model="editUser.currentValue" direction="horizontal">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>

<!--    <van-field v-else-if="editUser.editKey === 'avatarUrl'" :name="editUser.editKey" label="上传头像">-->
<!--      {{ editUser.editKey }}-->
<!--      <template #input>-->
<!--        <van-uploader v-model="fileList" :multiple="false" max-count="1"-->
<!--                      :after-read="afterRead" :before-delete="beforeDelete" />-->
<!--      </template>-->
<!--    </van-field>-->

    <van-field v-else
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
        :rules="[{ required: true, message: `请填写${editUser.editName}`}]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user";


const route = useRoute();//查看当前页面信息
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

const onSubmit = async () => {

  const currentUser = await getCurrentUser();
  // console.log("currentUser", currentUser)
  if (!currentUser) {
    showToast('用户未登录');
    return;
  }

  // todo 把 editKey, currentValue, editName提交到后台
  const res = await myAxios.post('/user/update', {
    'id': currentUser.date.id,
    [editUser.value.editKey  as string]: editUser.value.currentValue,
  })
  if (res.data.code === 0 && res.data.date > 0) {
    showToast('修改成功')
    router.back();
  } else {
    showToast('修改失败');
  }
};
</script>

<style scoped>

</style>