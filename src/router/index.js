import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from "../views/Product"
import Login from "../views/Login.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: "/product",
        name: "Product",
        component: Product,
        meta: {
          isLogin: true
        }
      },
      {
        path: "/content",
        name: "Content",
        component: () => import("../views/Content"),
        meta: {
          isLogin: true
        }
      }, {
        path: "/params",
        name: "Params",
        component: () => import("../views/Params"),
        meta: {
          isLogin: true
        }
      }
    ],
    redirect: "/product"
  }, {
    path: "/login",
    name: "Login",
    component: Login
  },{
    path: "/user",
    name: "User",
    component: () => import("../views/User"),
    meta: {
      isLogin: true
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
