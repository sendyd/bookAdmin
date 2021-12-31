<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { Edit, Setting, Avatar, Delete } from '@element-plus/icons'
import { getSwipes, setSwipeStatus, addSwipe, updateSwipeInfo , deleteSwipe , getSwipeInfo } from '@/api/swipe'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getSwipes({ current: state.current }).then(res => {
    // console.log(res);
    state.data = res.data
    state.total = res.meta.pagination.total
    state.pageSize = res.meta.pagination.count
  })
}
const state = reactive({
  current: 1,
  data: [],
  total: 0,
  pageSize: 1,
  addForm: {
    title: '',
    img: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    // img: 'https://tse1-mm.cn.bing.net/th/id/R-C.c6c03edea530e9caa677c9d17f193a4d?rik=MBgpsjumbTD5eQ&riu=http%3a%2f%2fwww.desktx.com%2fd%2ffile%2fwallpaper%2fscenery%2f20170209%2fca186d97701674b996264b2d352894a7.jpg&ehk=HunG%2fPF7pUbpcS34cWpNvlS%2faoDPbcaTYL6LFFPQIIM%3d&risl=&pid=ImgRaw&r=0',
    url: 'https://api.shop.eduwork.cn',
    status: 1
  },
  rules: {
    title: [
      {
        required: true,
        message: '名称不能为空',
        trigger: 'blur',
      },
    ],
    img: [
      {
        required: true,
        message: '图片地址不能为空',
        trigger: 'blur',
      },
    ]
  },
  addShow: false,
  swipeId: 0,
  editShow: false,
  editForm: {
    title: '',
    img: '',
    // img: 'https://tse1-mm.cn.bing.net/th/id/R-C.c6c03edea530e9caa677c9d17f193a4d?rik=MBgpsjumbTD5eQ&riu=http%3a%2f%2fwww.desktx.com%2fd%2ffile%2fwallpaper%2fscenery%2f20170209%2fca186d97701674b996264b2d352894a7.jpg&ehk=HunG%2fPF7pUbpcS34cWpNvlS%2faoDPbcaTYL6LFFPQIIM%3d&risl=&pid=ImgRaw&r=0',
    url: '',
    status: ''
  },
  editId:''
})
const handleCurrentChange = (val) => {
  state.current = val
  init()
}
const handleAdd = () => {
  state.addShow = true
}
const handleStatus = (val) => {
  setSwipeStatus(val.id).then(res => {
    // console.log(res);
    if (res.status === 204) {
      ElMessage.success('修改状态成功')
      init()
    }

  })
}
const resetAddForm = () => {
  state.addForm = {}
}
const addForm = ref(null)
const handleAddConfim = () => {
  addForm.value.validate(valid => {
    if (valid) {
      addSwipe(state.addForm).then(res => {
        // console.log(res);
        if (res.status === 201) {
          ElMessage.success('添加轮播成功')
          init()
          state.addShow = false
        }
      })
    }
  })
}
const handleDelete = (val) => {
  // console.log(val);
  state.swipeId = val.id
}
const handleConfim = () => {
  deleteSwipe(state.swipeId).then(res => {
    if (res.status === 204) {
      init()
      ElMessage.success('删除成功')

    }
  })
}
const handleEdit = (val) => {
getSwipeInfo(val.id).then(res=>{
  // console.log(res);
  state.editForm.title = res.title
  state.editForm.img = res.img
  state.editForm.url = res.url
  state.editForm.status = res.status
})
  state.editId = val.id
  state.editShow = true
}
const editForm = ref(null)
const handleEditConfim = (val) => {
  editForm.value.validate(valid => {
    if(valid){
      updateSwipeInfo(state.editId , state.editForm).then(res=>{
        if(res.status === 204) {
          ElMessage.success('修改成功')
          init()
          state.editShow = false

        }
      })
    }
  })
}
const resetEditForm = () => {
  state.editForm = {}
}
</script>
<template>
  <div>
    <el-dialog v-model="state.editShow" title="修改轮播" width="40%">
      <el-form
        ref="editForm"
        :model="state.editForm"
        :rules="state.rules"
        status-icon
        label-width="80px"
      >
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="state.editForm.title"
            :prefix-icon="Avatar"
            placeholder="请输入名称"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="img">
          <el-input
            v-model="state.editForm.img"
            :prefix-icon="Avatar"
            placeholder="请输入图片地址"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input
            v-model="state.editForm.url"
            :prefix-icon="Avatar"
            placeholder="请输入跳转链接"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input
            v-model="state.editForm.status"
            :prefix-icon="Avatar"
            placeholder="请输入状态0/1"
            clearable
          />
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
    <el-dialog v-model="state.addShow" title="添加轮播" width="40%">
      <el-form
        ref="addForm"
        :model="state.addForm"
        :rules="state.rules"
        status-icon
        label-width="80px"
      >
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="state.addForm.title"
            :prefix-icon="Avatar"
            placeholder="请输入名称"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="img">
          <el-input
            v-model="state.addForm.img"
            :prefix-icon="Avatar"
            placeholder="请输入图片地址"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="url">
          <el-input
            v-model="state.addForm.url"
            :prefix-icon="Avatar"
            placeholder="请输入跳转链接"
            clearable
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input
            v-model="state.addForm.status"
            :prefix-icon="Avatar"
            placeholder="请输入状态0/1"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button @click="resetAddForm">重置</el-button>
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
      <el-breadcrumb-item>轮播管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template #header>
        <div>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-button type="danger" @click="handleAdd">添加轮播</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
      <el-table height="500" border :data="state.data" style="width: 100%">
        <el-table-column prop="id" label="id" width="80px" />
        <el-table-column prop="title" label="轮播图名称" width="120px" />
        <el-table-column prop="url" label="跳转连接" width="120px" />
        <el-table-column prop="seq" label="排序" width="80px" />
        <el-table-column prop="created_at" label="添加时间" width="180px" />
        <el-table-column prop="updated_at" label="修改时间" width="180px" />
        <el-table-column prop="status" label="状态" width="80px">
          <template #default="scope">
            <div>
              <el-tag type="danger" v-show="scope.row.status === 0">禁用</el-tag>
              <el-tag type="success" v-show="scope.row.status === 1">正常</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="img_url" label="轮播图图片" width="120px">
          <template #default="scope">
            <div class="img">
              <img :src="scope.row.img_url" alt="轮播图图片" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" :icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="success" :icon="Setting" @click="handleStatus(scope.row)">禁用/启用</el-button>
            <el-popconfirm title="确定执行此操作吗?" @confirm="handleConfim">
              <template #reference>
                <el-button type="danger" :icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-popconfirm>
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
img {
  width: 100px;
  height: auto;
}
</style>