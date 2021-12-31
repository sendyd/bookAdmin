<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { addGoods } from '@/api/goods'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
}
const state = reactive({
  ruleForm:{
    category_id:'',
  title:'',
  description:'',
  price:'',
  stock:'',
  cover:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  pics:[],
  details:'',
  }
})
const rules = {
  category_id: [
    {
      required: true,
      message: '分类id不能为空',
      trigger: 'blur',
    }
  ],
  title: [
    {
      required: true,
      message: '标题不能为空',
      trigger: 'blur',
    }
  ],
  description: [
    {
      required: true,
      message: '描述不能为空',
      trigger: 'blur',
    }
  ],
  price: [
    {
      required: true,
      message: '价格不能为空',
      trigger: 'blur',
    }
  ],
  stock: [
    {
      required: true,
      message: '库存不能为空',
      trigger: 'blur',
    }
  ],
  cover: [
    {
      required: true,
      message: '封面图不能为空',
      trigger: 'blur',
    }
  ],
  details: [
    {
      required: true,
      message: '详情不能为空',
      trigger: 'blur',
    }
  ],
 
}
const resetForm = () => {
  state.ruleForm = {}
}
const ruleForm = ref(null)
const submitForm = () => {
 ruleForm.value.validate(valid=>{
   if(valid) {
     addGoods(state.ruleForm).then(res=>{
       console.log(res);
       if(res.status === 201) {
         ElMessage.success('添加商品成功')
         state.ruleForm = {}
         router.push('/goods')
       }
     })
   }
 })
}
</script>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/goods">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/goods">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        ref="ruleForm"
        :model="state.ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类" prop="category_id">
          <el-input v-model="state.ruleForm.category_id"></el-input>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="state.ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="state.ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="state.ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="state.ruleForm.stock"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="cover">
          <el-input v-model="state.ruleForm.cover"></el-input>
        </el-form-item>
        <el-form-item label="小图集" prop="pics">
          <el-input v-model="state.ruleForm.pics"></el-input>
        </el-form-item>

        <el-form-item label="详情
" prop="details">
          <el-input v-model="state.ruleForm.details" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style scoped lang='less'>
</style>