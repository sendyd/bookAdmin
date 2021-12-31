<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { Search, Edit, Delete, Lock, Avatar , Setting} from '@element-plus/icons'
import { getGoodsData , setIsOn , setIsRecommend} from '@/api/goods'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
  getGoodsData({current:state.current,title:state.title}).then(res => {
    // console.log(res);
    state.table = res.data
    state.total = res.meta.pagination.total
    state.pageSize = res.meta.pagination.count
  })
}
const state = reactive({
  table: [],
  total: 0,
  pageSize: 1,
  current: 1,
  title: '',

})
const handleCurrentChange = (val) => {
  state.current = val
  init()
}
const handleSearch = () => {
  init()
}
const handleisOn = (val) =>{
  setIsOn(val.id).then(res=>{
    // console.log(res);
    if(res.status === 204) {
      ElMessage.success('修改成功')
      init()
    }
  })
}
const handleisRecommend = (val) =>{
  setIsRecommend(val.id).then(res=>{
    // console.log(res);
    if(res.status === 204) {
      ElMessage.success('修改成功')
      init()
    }
  })
}
const handleAdd =() => {
  router.push('/goods/add')
}
const handleEdit = (val) => {
  router.push({path:'/goods/edit',query:{id:val.id}})
}
</script>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template #header>
        <div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input
                v-model="state.title"
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
      <el-table height="500" border :data="state.table" style="width: 100%">
        <el-table-column prop="id" label="id" width="80px" />
        <el-table-column prop="title" label="标题" width="160px" />
        <el-table-column prop="price" label="价格" width="80px" />
        <el-table-column prop="stock" label="库存
" width="80px" />
        <el-table-column prop="category_id" label="分类
" width="80px" />
        <el-table-column prop="sales" label="销量
" width="80px" />
        <el-table-column prop="cover_url" label="封面图
" width="120px">
          <template  #default="scope">
            <div>
              <img :src="scope.row.cover_url" alt />
            </div>
          </template>
        </el-table-column>
<el-table-column prop="is_on" label="是否上架
" width="80px">
   <template  #default="scope">
            <div>
              <el-tag type="success" v-show="scope.row.is_on === 1">是</el-tag>
              <el-tag type="danger" v-show="scope.row.is_on === 0">否</el-tag>
            </div>
          </template>
</el-table-column>
<el-table-column prop="is_recommend" label="是否推荐
" width="80px" >
 <template  #default="scope">
            <div>
              <el-tag type="success" v-show="scope.row.is_recommend === 1">是</el-tag>
              <el-tag type="danger" v-show="scope.row.is_recommend === 0">否</el-tag>
            </div>
          </template>
</el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" :icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" :icon="Setting" @click="handleisOn(scope.row)">上架/下架</el-button>
            <el-button type="primary" :icon="Setting" @click="handleisRecommend(scope.row)">推荐/不推荐</el-button>
          </template>
        </el-table-column>
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
img{
  width: 100px;
  height: auto;
}
</style>