<!-- 添加商品--Dialog -->
<template>
  <div>
    <el-dialog
      title="修改产品"
      :visible.sync="dialogUptateVisible"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="类目选择" :label-width="formLabelWidth">
          <el-button class="category" type="primary" @click="selectHandle"
            >类目选择</el-button
          >
          <span class="category">{{ form.category }}</span>
          <el-dialog
            title="选择类目"
            :visible.sync="categoryFlag"
            append-to-body
            center
          >
            <ProductCategory @categoryEvent="onCategory" />
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="categoryFlag = false">
                确 定
              </el-button>
            </div>
          </el-dialog>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品作者/产商" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品价格(元)" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="产品产地" :label-width="formLabelWidth">
          <el-input v-model="form.publish" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUptateVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ProductCategory from "./ProductCategory.vue";
export default {
  components: {
    ProductCategory,
  },
  data() {
    return {
      dialogUptateVisible: false,
      form: {
        title: "",
        author: "",
        category: "",
        price: "",
        desc: "",
        publish: "",
      },
      formLabelWidth: "120px",
      categoryFlag: false,
      categoryData: {},
    };
  },
  mounted() {
    this.$bus.$on("updateDialog", (row) => {
      this.dialogUptateVisible = true;
      this.$api.preUpdate({ id:row.id }).then(res => {
          if(res.data.status === 200) {
            this.form = res.data.data[0];
          }
        })
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
      // 修改商品
      // console.log(this.form);
      this.$api.update(this.form).then(res => {
        if(res.data.status === 200) {
          this.dialogUptateVisible = false;
          //页面刷新
          this.$bus.$emit("refresh", true);
          this.$message({
            type: "success",
            message: "修改成功"
          })
        }else{
          this.$message({
            type: "error",
            message: "修改失败"
          })
        }
      })
    },
    selectHandle() {
      this.categoryFlag = true;
    },
    onCategory(data) {
      // 获取类目数据
      this.categoryData = data;
      this.form.category = data.name;
    },
  },
};
</script>

<style lang="less" scoped>
.category {
  float: left;
  margin-right: 20px;
}
</style>