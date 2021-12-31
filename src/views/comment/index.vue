<script setup>
import { ref ,reactive, onBeforeMount, onMounted , computed ,defineProps,watch} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { Search, Edit, Delete , Lock ,  Avatar} from '@element-plus/icons'
import { getComments } from '@/api/commnet'
import { useRouter ,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {
init()
})
const init = () => {
  getComments().then(res=>{
    console.log(res);
    state.comments = res.data
    state.total = res.meta.pagination.total
    state.pageSize = res.meta.pagination.count
  })
}
const state = reactive({
  goods_title:'',
  current:1,
  comments:[],
  total:0,
  pageSize:1
})
const handleSearch = () => {
  init()
}
const handleAdd = () => {

}
const handleCurrentChange = (val) => {
  state.current = val
  init()
}
</script>
<template>
  <div>
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评价管理</el-breadcrumb-item>
      <el-breadcrumb-item>评价列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template #header>
        <div>
           <el-row :gutter="20">
            <el-col :span="8">
              <el-input
                v-model="state.goods_title"
                :suffix-icon="Search"
                placeholder="请输入关键字"
                class="input-with-select"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-col>

            <el-col :span="4">
              <el-button type="danger" @click="handleAdd">回复评价</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
        <el-table  height="500" border :data="state.comments" style="width: 100%">

        </el-table>
    </el-card>
     <el-pagination
      v-model:currentPage="state.current"
      :page-size="state.pageSize"
      layout="prev, pager, next, jumper"
      :total="state.total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<style scoped lang='less'>
</style>