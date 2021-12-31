<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import appFooterVue from '@/components/app-footer.vue'
import appHeaderVue from '@/components/app-header.vue'
import { Menu, List, ChatDotRound, UserFilled, Grid, SoldOut, ShoppingCart, Picture, } from '@element-plus/icons'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
onMounted(() => {
  init()
})
const init = () => {
}
const state = reactive({

})
const activePath = ref('')
activePath.value = window.sessionStorage.getItem('activePath')
const setPath = (index) => {
  window.sessionStorage.setItem('activePath', index)
  activePath.value = index
  console.log(index);
}
const showMenu = [
  {

    icon: UserFilled,
    name: '用户管理',
    children: [
      {
        path: '/user',
        icon: List,
        name: '用户列表',
      }
    ]
  },
  {
    icon: Grid,
    name: '分类管理',
    children: [
      {
        path: '/category',
        icon: List,
        name: '分类列表',
      }
    ]
  },
  {

    icon: SoldOut,
    name: '商品管理',
    children: [
      {
        path: '/goods',
        icon: List,
        name: '商品列表',
      }
    ]
  },
  {

    icon: ChatDotRound,
    name: '评价管理',
    children: [
      {
        path: '/comment',
        icon: List,
        name: '评价列表',
      }
    ]
  },
  {

    icon: ShoppingCart,
    name: '订单管理',
    children: [
      {
        path: '/order',
        icon: List,
        name: '订单列表',
      }
    ]
  },
  {

    icon: Picture,
    name: '轮播管理',
    children: [
      {
        path: '/swipe',
        icon: List,
        name: '轮播列表',
      }
    ]
  },
  {

    icon: Menu,
    name: '菜单管理',
    children: [
      {
        path: '/menus',
        icon: List,
        name: '菜单列表',
      }
    ]
  },
]
</script>
<template>
  <div class="layout">
    <el-container class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="../assets/img/tiyugongyuan.jpg" alt="logo" />
            <span>vue3 admin</span>
          </div>
        </div>
        <div class="line" />
        <el-menu
          active-text-color="#409EFF"
          background-color="#222832"
          class="el-menu-vertical-demo"
          :default-active="activePath"
          text-color="#fff"
          :unique-opened="true"
          router
        >
          <el-sub-menu :index="'' + index" v-for="(item,index) in showMenu" :key="index">
            <template #title>
              <el-icon>
                <component v-bind:is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(sub,i) in item.children"
              :key="i"
              :index="sub.path"
              @click="setPath(sub.path)"
            >
              <template #title>
                <div>
                  <el-icon>
                    <component v-bind:is="sub.icon"></component>
                  </el-icon>
                  <span>{{ sub.name }}</span>
                </div>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <appHeaderVue />
        <div class="main">
          <router-view />
        </div>
        <appFooterVue />
      </el-container>
    </el-container>
  </div>
</template>




<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
  display: none;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none !important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px !important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
</style>
