<!-- 分页 -->
<template>
  <div class="page">
      <el-pagination background layout="prev, pager, next, jumper" :total="total" :page-size="size" @current-change="handleCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
      return{
          total: 0,
          size: 5
      }
  },
  mounted() {
    //   获取数据总条数
      this.$api.getCount().then(res => {
          this.total = res.data.result[0]["count(*)"];
      });
    //   接收查询后的数据总条数
      this.$bus.$on("pageNum", res => {
          this.total = res;
      })
  },
  methods: {
      handleCurrentChange(val) {
        //   console.log(val);
          this.$bus.$emit("pageVal",val);
      }
  }
}
</script>

<style lang="less" scoped>
.page{
    margin-top: 30px;
}
</style>