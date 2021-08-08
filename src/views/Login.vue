<template>
  <div class="login">
    <el-tabs type="border-card" stretch @tab-click="handleClick">
      <el-tab-pane label="用户登录">
        <el-form :model="user" status-icon :rules="rules" class="login-form" ref="loginForm">
          <el-form-item prop="name" label="用户名">
            <el-input type="text" v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户注册">
        <el-form :model="user" status-icon :rules="rules" class="register-form" ref="registerForm">
          <el-form-item prop="name" label="用户名">
            <el-input type="text" v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input type="email" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" label="确认密码">
            <el-input type="password" v-model="user.checkPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerForm('registerForm')">
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex"
export default {
  name: "Login",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱地址'));
        } else if (!String(value).includes("@")) {
          callback(new Error('请输入正确的邮箱地址'));
        } else {
          callback();
        }
      };
    return {
      user: {
        name: "",
        password: "",
        checkPass: "",
        email: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    ...mapActions("loginModule", ["setUserActions"]),
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setUserActions({
            name: this.user.name,
            password: this.user.password
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册
    registerForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.register({
            name: this.user.name,
            password: this.user.password,
            email: this.user.email 
          }).then(res => {
            // console.log(res.data);
            this.register();
            this.handleClick();
          })          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(tab, event) {
        this.user = {
          name: "",
          password: "",
          checkPass: "",
          email: ""
      }
    },
    register() {
        this.$message({
          message: '注册成功，前往登录吧！',
          type: 'success'
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-tabs {
    border-radius: 0 0 10px 10px;
  }
  .login-form, .register-form {
    padding: 15px 35px;
    padding-bottom: 0;
  }
}
</style>