<!-- 商品添加内嵌 Dialog -->
<template>
  <div>
    <el-tree
      highlight-current
      :props="defaultProps"
      :load="loadNode"
      @node-click="handleNodeClick"
      lazy
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getCategory().then((res) => {
          // console.log(res.data);
          if(res.status === 200){
            return resolve(res.data.data)
          }else{
            alert("请求错误")
          }
        });
      }
      if (node.level >= 1) {
        this.$api.getCategory({id:node.data.cid}).then((res) => {
          if(res.status === 200){
            return resolve(res.data.data)
          }else{
            alert("请求错误")
          }
        }).catch(error => {
          resolve([]);
        });
      }
    },
    handleNodeClick(data) {
      // console.log(data);
      this.$emit("categoryEvent",data);
    },
  },
  props: {
    category: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
};
</script>

<style>
</style>