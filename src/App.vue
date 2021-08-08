<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      isRouterAlive: true,
    };
  },
  // 挂载
  provide(){
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick( () => {
        //Dom 更新了
      this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
/* body {
  background: url("./assets/img/1.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  background-color: #cccccc;
} */
#app {
  width: 1140px;
  margin: 0 auto;
}
@media (max-width: 1140px) {
  #app {
    width: 100%;
  }
}
</style>
