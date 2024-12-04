<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc="user.profile"
        :title="`${user.username}【${user.planetCode}】`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <!--danger 红色边框， primary 蓝色边框-->
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="toIntroUser(user)">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {defineProps, withDefaults} from "vue";
import {useRouter} from "vue-router";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = defineProps<UserCardListProps>();

const router = useRouter();

const toIntroUser = (user: UserType) => {
  // console.log(JSON.stringify(user))
  router.push({
    path: '/user/intro',
    query: {
      userInfoParam: JSON.stringify(user)
    }
  });
}
// todo 设置默认值存在问题
// const props = defineProps<UserCardListProps>();

// 使用withDefaults设置默认值,有问题，类型不兼容
// props = withDefaults(props, {
//   userList: []
// })

/*const props = withDefaults(defineProps<UserCardListProps>(), {
  // @ts-ingore
  userList: [] as UserType[],
});*/
</script>

<style scoped>

</style>