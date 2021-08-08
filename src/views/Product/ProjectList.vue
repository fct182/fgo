<!-- 获取project信息 -->
<template>
  <div>
      <el-table :data="projectData" border stripe>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="title" label="商品名称" width="135"></el-table-column>
          <el-table-column prop="author" label="商品作者/产商" width="120"></el-table-column>
          <el-table-column prop="category" label="商品类别" width="120"></el-table-column>
          <el-table-column prop="price" label="价格(元)" width="80"></el-table-column>
          <el-table-column prop="publish" label="商品产地" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip prop="desc" label="商品描述"></el-table-column>
          <el-table-column label="操作" width="145">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectData: [],
      refreshFlag: false,
      currentData: {}
    };
  },
  mounted() {
    // 第一页页数据
    this.http();
    // 其他页数据
    this.$bus.$on("pageVal", res => {
        this.http({page:res});
    });
    // 商品添加/修改后，商品数据刷新
    this.$bus.$on("refresh",res => {
      this.refreshFlag = res;
      if(this.refreshFlag){
        this.http();
        this.refreshFlag = false;
      }
    });
    // 商品查询
    this.$bus.$on("newData", res => {
      this.projectData = res;
    });
    this.$bus.$on("onProductClear",res => {
      this.http();
    })
  },
  methods: {
      http(page) {
      this.$api.projectList(page).then((res) => {
      if (res.data.status === 200) {
        this.projectData = res.data.data;
        }
     });
    },
    // 数据修改
    handleEdit(index, row) {
        this.$bus.$emit("updateDialog",row);
    },
    // 数据删除
    handleDelete(index, row) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteProject({id:row.id}).then(res => {
            if(res.data.status === 200) {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.http();
            } else {
              this.$message({
              type: 'errpr',
              message: '删除失败!'
            });
          } 
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    }
  }
};
</script>

<style>
</style>