import { createRouter , createWebHashHistory} from 'vue-router'
import Home from '../views/home/Home.vue'
import Layout from '../views/Layout.vue'
import Login from '../views/login/index.vue'
import User from '../views/user/index.vue'
import Category from '../views/category/index.vue'
import GoodsList from '../views/goods/index.vue'
import OrderList from '../views/order/index.vue'
import MenuList from '../views/menu/index.vue'
import CommentList from '../views/comment/index.vue'
import SwipeList from '../views/swipe/index.vue'
import GoodsAdd from '../views/goods/components/good-add.vue'
import GoodsEdit from '../views/goods/components/good-edit.vue'
const routes = [
  {
    path:'/',
    component:Layout,
    children:[
      {
        path:'/',
        name:Home,
        component:Home
      },
      {
        path:'/user',
        name:User,
        component:User
      },
      {
        path:'/category',
        name:Category,
        component:Category
      },
     
      {
        path:'/goods',
        name:GoodsList,
        component:GoodsList
      },
      {
        path:'/goods/add',
        name:GoodsAdd,
        component:GoodsAdd
      },
      {
        path:'/goods/edit',
        name:GoodsEdit,
        component:GoodsEdit
      },
      {
        path:'comment',
        name:CommentList,
        component:CommentList
      },
      {
        path:'order',
        name:OrderList,
        component:OrderList
      },
      {
        path:'/swipe',
        name:SwipeList,
        component:SwipeList
      },
      {
        path:'/menus',
        name:MenuList,
        component:MenuList
      },
    ]
  },
  {
    path:'/login',
    name:Login,
    component:Login
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router