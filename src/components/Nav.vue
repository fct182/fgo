<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      router
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="/"><i class="el-icon-menu"></i> 商品管理</el-menu-item>
      <el-menu-item index="/params"><i class="el-icon-tickets"></i>规格参数</el-menu-item>
      <el-menu-item index="/content"><i class="el-icon-edit"></i>广告分类管理</el-menu-item>
      <el-menu-item class="userInfo">
        欢迎你，<router-link to="/user" style="color:#fee140;font-size:17px">{{ name }}</router-link>
        <el-button @click="loginOut">退出</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      activeIndex: "/",
      name: this.$store.state.loginModule.user.name,
    };
  },
  mounted() {
    if (localStorage.getItem("keyPath")) {
      this.activeIndex = localStorage.getItem("keyPath");
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key) {
        localStorage.setItem("keyPath", key);
      }
    },
    loginOut() {
      //   退出登录
      localStorage.removeItem("ego");
      localStorage.removeItem("keyPath");
      this.$store.commit("loginModule/removeUser");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  // padding: 0 80px;
}
.el-menu > .userInfo {
  float: right;
  cursor: default;
}
.userInfo:hover {
  background-color: rgb(84, 92, 100) !important;
}
.userInfo > button {
  margin-left: 15px;
  margin-right: -10px;
}
</style>

