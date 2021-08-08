# ego
Vue 易购商城后台管理

### 模块需求
1. axios<br/>
   `npm i --s axios`<br/>
   配置、封装axios
2. UI模块--Element UI<br/>
    `vue add element`<br/>
    全引入elementUI

### 项目结构管理
1. 初始化CSS
2. 增加视图UI组件
3. .....


### 服务器端(Server)
   1. 安装模块依赖： <br/>
   `npm i --s express`<br/>
   `npm i --s mysql`<br/>
   `npm i --s jsonwebtoken`<br/>
   `npm i --s jwt-decode`<br/>
       
   2. 自动刷新<br/>
       `nodemon.json`<br/>
   3. 前后台一次性运行配置<br/>
       `npm i concurrently --save`<br/>
       配置package.json<br/>
       `npm run dev`
