
<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { getCateData, setCateStatus, addCate, updateCate, getCateInfo } from '@/api/category'
import { getMenus , setMenuStatus} from '@/api/menu'
import { Edit, Setting, Avatar } from '@element-plus/icons'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getMenus({ type: 'all' }).then(res => {
    // console.log(res);
    state.menus = res
  })
}
const state = reactive({
  menus: [],
  editForm: {
    pid: '',
    name: ''
  },
  editRules: {
    name: [
      {
        required: true,
        message: '名称不能为空',
        trigger: 'blur',
      }
    ],
  },
  editShow: false,
  editId: '',
  addShow: false,
  addForm: {
    name: '',
    pid: 0,
    group: 'menus'
  },
  addRules: {
    name: [
      {
        required: true,
        message: '名称不能为空',
        trigger: 'blur',
      }
    ],
  },
})

const handleWarn = (val) => {
  setCateStatus(val.id).then(res => {
    if (res.status === 204) {
      ElMessage.success('修改状态成功')
      init()
    }
  })
}
const handleEdit = (val) => {
  // console.log(val);
  state.editId = val.id
  state.editShow = true
  getCateInfo(val.id).then(res => {
    // console.log(res);
    state.editForm.name = res.name
    state.editForm.pid = res.pid
    
  })
  // getCateInfo(val.id)
}
const resetEditForm = () => {
  state.editForm = {}
}
const editForm = ref(null)
const handleEditConfim = () => {
  editForm.value.validate(valid => {
    if (valid) {
      updateCate(state.editId, state.editForm).then(res => {
        // console.log(res);
        if (res.status == 204) {
          ElMessage.success('修改菜单成功')
          init()
          state.editShow = false
        }
      })
    }
  })
}
const handleAdd = () => {
  state.addShow = true
}
const addForm = ref(null)
const handleAddConfim = () => {
  addForm.value.validate(valid => {
    if (valid) {
      addCate(state.addForm).then(res => {
        // console.log(res);
        if (res.status === 201) {
          ElMessage.success('添加菜单成功')
          init()
          state.addShow = false
        }
      })
    }
  })
}
const resetAddForm = () => {
  state.addForm = {}
}

</script>
<template>
  <div>
    <el-dialog v-model="state.addShow" title="添加菜单" width="40%">
      <el-form
        ref="addForm"
        :model="state.addForm"
        :rules="state.addRules"
        status-icon
        label-width="80px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="state.addForm.name"
            :prefix-icon="Avatar"
            placeholder="请输入名称"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="父级id">
          <el-input
            v-model="state.addForm.pid"
            :prefix-icon="Avatar"
            placeholder="不填为顶级菜单"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="分组">
          <el-input
            v-model="state.addForm.group"
            :prefix-icon="Avatar"
            autocomplete="off"
            clearable
          ></el-input>
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
    <el-dialog v-model="state.editShow" title="编辑菜单" width="40%">
      <el-form
        ref="editForm"
        :model="state.editForm"
        :rules="state.editRules"
        status-icon
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="state.editForm.name"
            :prefix-icon="Avatar"
            placeholder="请输入昵称"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="父级id">
          <el-input
            v-model="state.editForm.pid"
            :prefix-icon="Avatar"
            placeholder="不填为顶级菜单"
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
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template #header>
        <div>
          <el-button type="danger" @click="handleAdd">添加菜单</el-button>
        </div>
      </template>
      <el-table row-key="id" border lazy :data="state.menus" style="width: 100%">
        <el-table-column sortable prop="id" label="id" width="80px" />
        <el-table-column prop="name" label="菜单名称" width="120px" />
        <el-table-column prop="level" label="菜单层级">
          <template #default="scope">
            <el-tag type="success" v-show="scope.row.level === 1">一级菜单</el-tag>
            <el-tag type="danger" v-show="scope.row.level === 2">二级菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pid" label="菜单父级id">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.pid === 0">无</el-tag>
            <el-tag type="success" v-else>{{ scope.row.pid }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80px">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status === 0">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" :icon="Setting" @click="handleWarn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style scoped lang='less'>
</style>