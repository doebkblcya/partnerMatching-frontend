<template>
  <user-card-list :user-list="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {showToast} from 'vant';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const userList = ref([]);
const loading = ref(true);

onMounted(async () => {
  const {tags} = route.query;
  loading.value = true;
  
  try {
    const searchParams = {
      tagNameList: Array.isArray(tags) ? tags : [tags]
    };
    console.log("Search params:", searchParams);
    
    const response = await myAxios.get('/user/search/tags', {
      params: searchParams,
      paramsSerializer: {
        serialize: params => qs.stringify(params, { arrayFormat: 'brackets' })
      }
    });
    
    console.log("Full response:", response);
    
    if (response?.data?.code === 0) {
      const userData = response.data.date;
      console.log("User data:", userData);
      
      if (Array.isArray(userData)) {
        userList.value = userData.map(user => {
          console.log("Processing user:", user);
          return {
            ...user,
            tags: typeof user.tags === 'string' ? JSON.parse(user.tags) : user.tags
          };
        });
      }
      console.log("Final userList:", userList.value);
    } else {
      showToast('搜索失败：' + response?.data?.message);
    }
  } catch (error) {
    console.error("Search error:", error);
    showToast('搜索请求失败');
  } finally {
    loading.value = false;
  }
});
</script>