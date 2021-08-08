<!-- 添加商品--Dialog -->
<template>
  <div>
    <el-dialog
      title="添加产品"
      :visible.sync="dialogFormVisible"
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
              <el-button type="primary" @click="getCategoryItem">
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
        <!-- 类目选择结构视图 -->
        <div v-for="(item,index) in paramsData" :key="index">
            <h3>{{ item.value }}</h3>
            <div v-for="(childItem,childIndex) in item.children" :key="childIndex">
                <el-form-item label-width="130px" :label="childItem.childValue">
                    <el-input v-model="childItem.value" type="text"></el-input>
                </el-form-item>
            </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      dialogFormVisible: false,
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
      paramsData: []
    };
  },
  mounted() {
    this.$bus.$on("addDialog", (res) => {
      this.dialogFormVisible = res;
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
    // 添加
    onSubmit() {
      this.$api.addProject(this.form).then((res) => {
        if (res.data.status === 200) {
          // console.log(res.data);
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "添加成功"
          })
          this.$bus.$emit("refresh", true);
          this.form = {
            title: "",
            author: "",
            category: "",
            price: "",
            desc: "",
            publish: "",
          };
          // 传输添加后，商品数据总条数
          this.$api.getCount().then((res) => {
            this.$bus.$emit("pageNum", res.data.result[0]["count(*)"]);
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败"
          })
        }
        // 提交规格参数的数据
        this.$api.updateCategory({
              cid: this.categoryData.cid,
              content: JSON.stringify(this.paramsData),
          })
          .then((res) => {
              if (res.data.status === 200) {
                  console.log(res.data.msg);
              } else {
                  console.log(res.data.msg);
              }
          });
      });
    },
    selectHandle() {
      this.categoryFlag = true;
    },
    onCategory(data) {
      // 获取类目数据
      this.categoryData = data;
      this.form.category = data.name;
    },
    // 获取类目结构数据
    getCategoryItem(){
      this.categoryFlag = false;
      this.$api.categoryClass({cid:this.categoryData.cid}).then(res => {
        this.paramsData = JSON.parse(res.data.result[0].paramData);
      })
    }
  },
};
</script>

<style lang="less" scoped>
.category {
  float: left;
  margin-right: 20px;
}
</style>