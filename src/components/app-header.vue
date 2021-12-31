<template>
  <div class="header">
    <div class="left">
      <el-icon v-if="hasBack" @click="back" class="el-icon-back">
        <ArrowLeft />
      </el-icon>
      <span style="font-size: 20px">{{state.info.name}}</span>
    </div>
    <div class="right">
      <el-popover placement="bottom" :width="320" trigger="click" popper-class="popper-user-box">
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            普通用户
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{state.info.name}}</p>
          <p>邮箱：{{state.info.email}}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfo } from '@/api/login';
const router = useRouter()
const route = useRoute()
const logout = () => {
  // console.log('000');
  window.sessionStorage.removeItem('htToken')
  ElMessage.success('退出登录成功')
  router.push('/login')
}
const back = () => {
  router.go(-1)
}

const hasBack = computed(() => {
  return route.path !== '/'
})
const init = () => {
  getUserInfo().then(res => {
    // console.log(res);
    state.info = res
  }).catch(err=>{
    ElMessage.error('获取个人信息失败')
  })
}
onMounted(() => {
  init()
})
const state = reactive({
  info: {}
})
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.el-icon-back {
  border: 1px solid #e9e9e9;
  padding: 4px;
  border-radius: 50px;
  margin-right: 10px;
}
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}
.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>

<style>
.popper-user-box {
  background: url("https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png")
    50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}
.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
