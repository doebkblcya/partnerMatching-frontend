<template>
  <template v-if="user">
    <div v-if="user" style="text-align: center;">
      <van-image
          round
          width="8rem"
          height="8rem"
          :src="user.avatarUrl"
          style="margin-top: 20px; margin-bottom: 20px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4)"
      />
    </div>
    <van-cell title="当前登录用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    <van-button block color="linear-gradient(to right, #ff976a, #ee0a24)" title="退出登录" @click="userLogout">
      退出登录
    </van-button>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
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

const router = useRouter();

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
    // showToast('获取用户信息成功');
    // console.log(res.date)
  } else {
    showToast('获取用户信息失败');
  }
})

const userLogout = async () => {
  try {
    const res = await myAxios.post('/user/logout');
    if (res.data.code === 0) {
      showToast("退出成功");
      router.push({
        path: '/user/login'
      });
    } else {
      showToast(res.data.message || "退出失败");
    }
  } catch (error) {
    console.error('退出失败:', error);
    showToast("退出失败，请重试");
  }
};

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