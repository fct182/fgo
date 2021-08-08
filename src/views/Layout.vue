<template>
  <div class="home">
    <Nav />
    <div class="container">
      <router-view></router-view>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "../components/Nav.vue";
export default {
  name: "Home",
  components: {
    Nav,
  },
};
</script>
<style lang="less" scoped>
.container {
  // width: 80%;
  // padding: 10px 80px;
  padding: 10px 0;
}
</style>
