<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="introduce">
    <div class="order">
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>用户数量</span>
          </div>
        </template>
        <div class="item">{{ state.data.users_count }}</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>商品数量</span>
          </div>
        </template>
        <div class="item">{{ state.data.goods_count }}</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>订单数据</span>
          </div>
        </template>
        <div class="item">{{ state.data.order_count }}</div>
      </el-card>
    </div>
    <div id="main" style="width:100%;"></div>
  </el-card>
</template>

<script setup>
import { getHomeData } from '@/api/home';
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';
import { onMounted, reactive } from 'vue';
// 方法
const initEcharts = () => {
  // 新建一个promise对象
  let newPromise = new Promise((resolve) => {
    resolve()
  })
  //然后异步执行echarts的初始化函数
  newPromise.then(() => {
    //	此dom为echarts图标展示dom
    echarts.init(document.getElementById('main'))
      .setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        color: [
          '#c23531',
        ],

        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            color: [
              '#dd6b66'
            ]
            // .
          }
        ]
      });
  })
}
const init = () => {
  getHomeData().then(res => {
    // console.log(res);
    state.data = res
  }).catch(err=>{
    ElMessage.error('获取首页数据失败')
  })
}
onMounted(() => {
  initEcharts()
  init()
})
const state = reactive({
  data: {}
})

</script>

<style scoped>
.introduce .order {
  display: flex;
  margin-bottom: 50px;
}
.introduce .order .order-item {
  flex: 1;
  margin-right: 20px;
}
.introduce .order .order-item:last-child {
  margin-right: 0;
}
#main {
  min-height: 300px;
}
</style>