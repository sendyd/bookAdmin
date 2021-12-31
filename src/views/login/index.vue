<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { Avatar, Lock, View } from '@element-plus/icons'
const store = useStore()
import { ElMessage } from 'element-plus'
import { goLogin } from '@/api/login'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
}

const state = reactive({
  ruleForm: {
    email: 'test@a.com',
    password: '123123'
  },
  rules: {
    email: [
      {
        required: true,
        message: '邮箱不能为空',
        trigger: 'blur',
      },
      {
        type: 'email',
        required: true,
        message: '邮箱格式不合法',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      }
    ],
  }
})
const form = ref(null)
const resetForm = () => {
  form.value.resetFields()
  state.ruleForm = {}
}
const submitForm = () => {
  form.value.validate(valid => {
    if (valid) {
      goLogin(state.ruleForm).then(res => {
        if (res) {
          window.sessionStorage.setItem('htToken', res.access_token)
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          router.push('/')
        }
      }).catch(err=>{
        ElMessage.error('登录失败')
      })
    }
  })
}
</script>
<template>
  <div class="login">
    <div class="bg"></div>
    <el-card>
      <el-form
        ref="form"
        :model="state.ruleForm"
        :rules="state.rules"
        status-icon
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="state.ruleForm.email"
            :prefix-icon="Avatar"
            placeholder="请输入邮箱"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="state.ruleForm.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style scoped lang='less'>
.login {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  .el-card {
    width: 30%;
    margin: 200px auto;
  }
}

.bg {
  background: url("../../assets/img//tiyugongyuan.jpg") center center no-repeat;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>