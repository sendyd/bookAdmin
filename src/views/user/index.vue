<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
import { Search, Edit, Delete , Lock ,  Avatar} from '@element-plus/icons'
import { getUser, setUserStatus, addUser , getInfo , setInfo} from '@/api/user'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  const params = {
    name: state.name,
    phone: state.phone,
    email: state.email,
    current: state.page
  }
  getUser(params).then(res => {
    // console.log(res);
    state.data = res.data
    state.total = res.meta.pagination.total
    state.pageSize = res.meta.pagination.count
  }).catch(err=>{
    ElMessage.error('获取用户列表失败')
  })
}
const state = reactive({
  name: '',
  phone: '',
  email: '',
  data: [],
  total: 0,
  pageSize: 1,
  page: 1,
  addShow: false,
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
    name: [
      {
        required: true,
        message: '昵称不能为空',
        trigger: 'blur',
      }
    ],
  },
  ruleForm: {
    email: '',
    password: '',
    name:''
  },
  editForm: {
    email: '',
    name:''
  },
  editRules:{
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
     name: [
      {
        required: true,
        message: '昵称不能为空',
        trigger: 'blur',
      }
    ],
  },
  editShow:false,
  editId:1
})

const handleCurrentChange = (val) => {
  console.log(val);
  state.page = val
  init()
}
const handleSearch = () => {
  state.page = 1
  init()
}
const handleSwitch = (val) => {
  // console.log(val)
  
  setUserStatus(val.id).then(res => {
    // console.log(res);
    if (res.status === 204) {
      ElMessage.success('修改状态成功')
      init()
    }
  }).catch(err => {
    ElMessage.error('修改状态失败')
  })
}
const handleAdd = () => {
  state.addShow = true
}
const resetForm = () => {
  state.ruleForm = {}
}
const form = ref(null)
const handleAddConfim = () => {
  form.value.validate(valid => {
    if(valid) {
      addUser(state.ruleForm).then(res=>{
        // console.log(res);
        if(res.status === 201) {
          ElMessage.success('添加用户成功')
          init()
          state.addShow = false
        }
      }).catch(err=>{
        ElMessage.error('添加用户失败')
      })
    }
  })
}
const handleEdit =(val) => {
  state.editId = val.id
  state.editShow = true
  // console.log(val.id);
  getInfo(val.id).then(res=>{
    // console.log(res);
    state.editForm.name = res.name
    state.editForm.email = res.email
  }).catch(err=>{
    ElMessage.error('获取用户详情失败')
  })
}
const editForm = ref(null)
const handleEditConfim =() => {
  editForm.value.validate(valid=>{
    if(valid){
      setInfo(state.editId , state.editForm).then(res=>{
        console.log(res);
        if(res.status){
          ElMessage.success('修改用户信息成功')
          state.editShow = false
          init()
        }
      }).catch(err=>{
    ElMessage.error('修改用户信息失败')
  })
    }
  })
}
const resetEditForm =() => {
  state.editForm = {}
}
</script>
<template>
  <div>
    <el-dialog v-model="state.editShow" title="编辑用户" width="40%">
      <el-form
        ref="editForm"
        :model="state.editForm"
        :rules="state.editRules"
        status-icon
        label-width="80px"
        class="demo-ruleForm"
      >
      <el-form-item label="昵称" prop="name">
          <el-input
            v-model="state.editForm.name"
            :prefix-icon="Avatar"
            placeholder="请输入昵称"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="state.editForm.email"
            :prefix-icon="Avatar"
            placeholder="请输入邮箱"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
       

        <el-form-item>
          <el-button @click="resetEditForm">重置</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.editShow = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfim">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="state.addShow" title="添加用户" width="40%">
      <el-form
        ref="form"
        :model="state.ruleForm"
        :rules="state.rules"
        status-icon
        label-width="80px"
        class="demo-ruleForm"
      >
      <el-form-item label="昵称" prop="name">
          <el-input
            v-model="state.ruleForm.name"
            :prefix-icon="Avatar"
            placeholder="请输入昵称"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
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
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.addShow = false">取消</el-button>
          <el-button type="primary" @click="handleAddConfim">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template #header>
        <div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input
                v-model="state.name"
                :suffix-icon="Search"
                placeholder="请输入姓名"
                class="input-with-select"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-col>

            <el-col :span="4">
              <el-button type="danger" @click="handleAdd">添加用户</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
      <el-table  height="500" border :data="state.data" style="width: 100%">
        <el-table-column  prop="id" label="id" width="80px" />
        <el-table-column prop="name" label="用户姓名" width="120px" />
        <el-table-column prop="email" label="用户邮箱" />
        <el-table-column prop="created_at" label="用户创建时间" />
        <el-table-column prop="is_locked" label="状态" width="80px">
          <template #default="scope">
            <el-switch @click="handleSwitch(scope.row)" :model-value="scope.row.is_locked === 0" />
          </template>
        </el-table-column>
        <el-table-column prop="avatar_url" label="用户头像" width="120px">
          <template #default="scope">
            <div class="img">
              <img :src="scope.row.avatar_url" alt="商品图片" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" :icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-model:currentPage="state.page"
      :page-size="state.pageSize"
      layout="prev, pager, next, jumper"
      :total="state.total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<style scoped lang='less'>
.img {
  width: 100px;
  img {
    width: 100%;
    height: auto;
  }
}
</style>  
