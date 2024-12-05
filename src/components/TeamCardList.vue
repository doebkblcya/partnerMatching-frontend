<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        thumb="https://gips3.baidu.com/it/u=1004796864,1363400944&fm=3039&app=3039&f=JPEG?w=1024&h=1024"
        :title="`${team.name} `"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div>
          {{ '过期时间' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId === currentUser?.date.id" size="mini" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
        <!--        todo 仅加入队伍可见-->
        <van-button v-if="team.userId !== currentUser?.date.id && team.hasJoin" size="mini" plain
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.date.id" size="mini" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.userId !== currentUser?.date.id && !team.hasJoin" size="mini" plain type="primary"
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog 
    v-model:show="showPasswordDialog" 
    title="请输入密码" 
    show-cancel-button 
    @confirm="doJoinTeam"
    @cancel="doJoinCancel"
  >
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showToast, Toast} from "vant";
import {getCurrentUserState} from "../states/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
const currentUser = ref();

const router = useRouter();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {  // 公开队伍
    doJoinTeam();
  } else {  // 加密队伍
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

//队伍列表加入队伍
const doJoinTeam = async () => {  // 移除参数，使用 ref 中的值
  if (!joinTeamId.value) {
    showToast('队伍不存在');
    return;
  }
  
  try {
    const res = await myAxios.post('/team/join', {
      teamId: joinTeamId.value,  // 使用 ref 中存储的 teamId
      password: password.value || ''  // 使用 ref 中存储的 password
    });
    if (res?.data?.code === 0) {
      showToast('加入成功');
      showPasswordDialog.value = false;  // 关闭密码对话框
      password.value = '';  // 清空密码
      joinTeamId.value = 0;  // 清空队伍id
      // 如果需要刷新页面
      window.location.reload();
    } else {
      showToast(res?.data?.message ?? '加入失败');
    }
  } catch (error) {
    showToast('加入失败');
  }
}

/**
 * 更新队伍，跳转至队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id
  });
  if (res?.data.code === 0) {
    showToast("操作成功")
  } else {
    showToast("操作失败" + (res.data.description ? `，${res.data.description} ` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    id,
  });
  if (res?.data.code === 0) {
    showToast("操作成功")
  } else {
    showToast("操作失败" + (res.data.description ? `，${res.data.description} ` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>