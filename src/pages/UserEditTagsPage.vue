<!--<template>-->
<!--  <TagEdit>-->
<!--    <template #search>-->
<!--      <div></div> &lt;!&ndash;不显示搜索框&ndash;&gt;-->
<!--    </template>-->
<!--    <template #footer="{ activeIds }">-->
<!--      <div style="padding: 12px;">-->
<!--        <van-button block style="" type="primary" @click="doConfrimEdit(activeIds)">确定</van-button>-->
<!--      </div>-->
<!--    </template>-->
<!--  </TagEdit>-->
<!--</template>-->

<!--<script setup>-->
<!--import { UserStore } from '@/stores/userStore';-->
<!--import { onMounted, ref } from 'vue';-->
<!--import { useRouter } from 'vue-router'-->
<!--import TagEdit from '@/components/TagEdit.vue';-->

<!--import {useRoute, useRouter} from "vue-router";-->
<!--import myAxios from "../plugins/myAxios.js";-->

<!--const router = useRouter()-->
<!--const store = UserStore()-->


<!--const doConfrimEdit = async(activeIds) => {-->
<!--  if (!store.userInfo.id) {-->
<!--    await store.storeUserInfo()-->
<!--  }-->
<!--  const res = await myAxios.post('user/update', {-->
<!--    id: store.userInfo.id,-->
<!--    tags: activeIds-->
<!--  })-->

<!--  if (res.status === 200 && res.ret === 0) {-->
<!--    showToast({-->
<!--      message: '修改成功',-->
<!--      type: 'success',-->
<!--    });-->
<!--    await store.storeUserInfo()-->
<!--    router.back()-->
<!--  } else {-->
<!--    showToast({-->
<!--      message: '更新失败',-->
<!--      type: 'fail'-->
<!--    });-->
<!--  }-->
<!--}-->

<!--// onMounted(async () => {-->

<!--// })-->

<!--</script>-->