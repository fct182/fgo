# ego
Vue 易购商城后台管理

### 模块需求
1. axios
    npm i --s axios
    配置、封装axios
2. UI模块--Element UI
    vue add element
    全引入elementUI

### 项目结构管理
1. 初始化CSS
2. 增加视图UI组件


### 服务器端(Server)
   1. 安装模块依赖：
       npm i --s express
       npm i --s mysql
       npm i --s jsonwebtoken
       npm i --s jwt-decode
    2. 自动刷新
       nodemon.json
    3. 前后台一次性运行配置
       npm i concurrently --save
       配置package.json
       npm run dev