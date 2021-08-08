<template>
  <el-dialog
    title="添加规格参数"
    :visible.sync="dialogParamsVisible"
    :before-close="handleClose"
  >
    <ParamsCategory @categoryParamsEvent="onCategory" />
    <el-dialog
      title="添加分组"
      :visible.sync="innerParamsVisible"
      append-to-body
    >
      <el-button @click="addDomain" type="primary">添加分组</el-button>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
        <el-form-item
          v-for="(item, index) in dynamicValidateForm.domains"
          :key="index"
          label="规格参数"
        >
          <el-input v-model="item.value" style="width: 80%"></el-input>
          <el-button @click="addParams(index)">添加参数</el-button>
          <el-button @click="removeDomain(item)">删除分组</el-button>
          <div v-for="(childItem, childIndex) in item.children" :key="childIndex">
            <el-input v-model="childItem.childValue" style="width: 60%; margin-left: 80px"></el-input>
            <el-button @click="removeChild(index, childItem)">删除参数</el-button>
          </div>
          <el-divider><i class="el-icon-document"></i></el-divider>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerParamsVisible = false">取 消</el-button>
        <el-button type="primary" @click="paramsSubimt">
          添加
        </el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogParamsVisible = false">取 消</el-button>
      <el-button :disabled="disabled" type="primary" @click="onSubmit">
        确定并添加分组内容
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import ParamsCategory from "./ParamsCategory.vue";
export default {
  components: {
    ParamsCategory,
  },
  data() {
    return {
      dialogParamsVisible: false,
      innerParamsVisible: false,
      disabled: true,
      categoryData: {},
      dynamicValidateForm: {
        domains: [
          {
            value: "",
            children: [
              {
                childValue: "",
                value: "",
              },
              {
                childValue: "",
                value: "",
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.$bus.$on("addParamsDialog", (res) => {
      this.dialogParamsVisible = res;
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    onSubmit() {
      this.innerParamsVisible = true;
    },
    // 允许添加分组内容和接收选择数据
    onCategory(data) {
        this.disabled = false;
        this.categoryData = data;
    },
    // 添加规格大分类
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        children: [
          {
            childValue: "",
            value: "",
          },
          {
            childValue: "",
            value: "",
          },
        ],
      });
    },
    // 删除规格参数大分类
    removeDomain(item) {
      // React移除， split
      var index = this.dynamicValidateForm.domains.indexOf(item);
      this.dynamicValidateForm.domains.splice(index, 1); // start count
    },
    //  添加规格小分类
    addParams(index) {
      this.dynamicValidateForm.domains[index].children.push({
        childValue: "",
        value: "",
      });
    },
    // 删除规格参数小分类
    removeChild(index, childItem) {
      var num = this.dynamicValidateForm.domains[index].children.indexOf(childItem);
      this.dynamicValidateForm.domains[index].children.splice(num, 1); // start count
    },
    //  用户添加提示
    openMessage(msg) {
      const h = this.$createElement;
      this.$notify({
        title: "添加提示",
        message: h("i", { style: "color: teal" }, msg),
        type: "success"
      });
    },
    //提交事件
    paramsSubimt() {
        // 对象类型数据不可以直接传递，以前我们都是字符串
        this.$api.paramsAdd({
                itemCatId: this.categoryData.cid,
                content: JSON.stringify(this.dynamicValidateForm.domains)
            })
            .then((res) => {
                if (res.data.status === 200) {
                    this.dialogParamsVisible = false;
                    this.innerParamsVisible = false;
                }
                this.openMessage(res.data.msg);
                this.$bus.$emit("addOnFresh")
            });
    },
  },
};
</script>

<style lang="less" scoped>
</style>