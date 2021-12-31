<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { Search, Edit, Avatar } from '@element-plus/icons'
const store = useStore()
import { getOrders, setOrders } from '@/api/order'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getOrders({ current: state.current }).then(res => {
    // console.log(res);
    state.data = res.data
    state.total = res.meta.pagination.total
    state.pageSize = res.meta.pagination.count
  })
}
const state = reactive({
  current: 1,
  data: [],
  pageSize: 1,
  total: 0,
  editShow: false,
  editForm: {
    express_type: '',
    express_no: ''
  },
  editId: '',
  editRules: {
    express_type: [
      {
        required: true,
        message: '快递类型不能为空',
        trigger: 'blur',
      }
    ],
    express_no: [
      {
        required: true,
        message: '快递单号不能为空',
        trigger: 'blur',
      }
    ],
  }
})
const handleCurrentChange = (val) => {
  state.current = val
  init()
}
const handleEdit = (val) => {
  state.editShow = true
  // console.log(val);
  state.editId = val.id

}
const resetEditForm = () => {
  state.editForm = {}
}
const editForm = ref(null)
const handleEditConfim = () => {
  editForm.value.validate(valid => {
    if (valid) {
      setOrders(state.editId, state.editForm).then(res => {
        if (res.status === 204) {
          ElMessage.success('发货成功')
          state.editForm = {}
          init()
          state.editShow = false
          
        }
      })
    }
  })
}
</script>
<template>
  <div>
    <el-dialog v-model="state.editShow" title="发货" width="40%">
      <el-form
        ref="editForm"
        :model="state.editForm"
        :rules="state.editRules"
        status-icon
        label-width="80px"
      >
        <el-form-item label="快递类型" prop="express_type">
          <el-input
            v-model="state.editForm.express_type"
            :prefix-icon="Avatar"
            placeholder="请输入快递类型"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="快递单号" prop="express_no">
          <el-input
            v-model="state.editForm.express_no"
            :prefix-icon="Avatar"
            placeholder="请输入快递单号"
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
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table height="500" border :data="state.data" style="width: 100%">
        <el-table-column prop="id" label="id" width="80px" />
        <el-table-column prop="order_no" label="单号" width="190px" />
        <el-table-column prop="user_id" label="创建者" width="80px" />
        <el-table-column prop="amount" label="总价" width="80px" />
        <el-table-column prop="address_id" label="收货地址" width="80px" />
        <el-table-column prop="created_at" label="添加时间" width="160px" />
        <el-table-column prop="updated_at" label="修改时间" width="160px" />

        <el-table-column prop="status" label="状态" width="80px">
          <template #default="scope">
            <el-tag type="success" v-show="scope.row.status === 1">下单</el-tag>
            <el-tag type="success" v-show="scope.row.status === 2">支付</el-tag>
            <el-tag type="success" v-show="scope.row.status === 3">发货</el-tag>
            <el-tag type="success" v-show="scope.row.status === 4">收货</el-tag>
            <el-tag type="success" v-show="scope.row.status === 5">过期</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" :icon="Edit" @click="handleEdit(scope.row)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-model:currentPage="state.current"
      :page-size="state.pageSize"
      :pager-count="11"
      layout="prev, pager, next, jumper"
      :total="state.total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<style scoped lang='less'>
</style>