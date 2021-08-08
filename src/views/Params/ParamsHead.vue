<!-- 规格参数头部，搜索和添加 -->
<template>
  <div>
    <el-form ref="searchForm" :model="search" inline @submit.native.prevent>
      <el-form-item class="search">
        <el-input @clear="clearHandle" clearable v-model="search.value" @keyup.enter.native="onSubmit" placeholder="输入你想要搜索的规格参数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" round @click.prevent="onSubmit">
          搜索
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-tooltip content="规格参数添加" placement="right">
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
      // 规格参数查询
      if (this.search.value !== "") {
        this.$api.paramsSearch({ search: this.search.value }).then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.$bus.$emit("newParamsData", res.data.result);
          }
          else{
              this.$message({
                  message: '暂无该数据',
                  type: 'warning'
              })
          }
        });
      }
    },
    onAdd() {
      this.$bus.$emit("addParamsDialog", true);
    },
    clearHandle(){
        this.$bus.$emit("onParamsClear");
    }
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 600px;
}
</style>