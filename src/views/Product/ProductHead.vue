<!-- 商品头部，搜索和添加 -->
<template>
  <div>
    <el-form ref="searchForm" :model="search" inline @submit.native.prevent>
      <el-form-item class="search">
        <el-input  @clear="clearHandle" clearable v-model="search.value" @keyup.enter.native="onSubmit" placeholder="输入你想要搜索的商品"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" round @click.prevent="onSubmit">
          搜索
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="添加商品" placement="right">
          <el-button
            type="warning"
            icon="el-icon-plus"
            circle
            @click="onAdd"
          ></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        value: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // 商品查询
      if (this.search.value !== "") {
        this.$api.getSearch({ search: this.search.value }).then((res) => {
          // console.log(res.data);
          if (res.status === 200) {
            // 传输查询到的数据总条数
            this.$bus.$emit("pageNum", res.data.length > 5 ? 5 : res.data.length);
            this.$bus.$emit("newData", res.data);
          }else{
            this.$message({
                  message: '暂无查询到该数据',
                  type: 'warning'
              })
          }
        });
      }
    },
    onAdd() {
      this.$bus.$emit("addDialog", true);
    },
    clearHandle(){
        this.$bus.$emit("onProductClear");
        // 传输查询到的数据总条数
        this.$api.getCount().then((res) => {
          this.$bus.$emit("pageNum", res.data.result[0]["count(*)"]);
        });
    }
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 600px;
}
</style>