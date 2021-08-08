// 许可-----路由权限管理
import router from ".";
import store from "../store"

router.beforeEach((to, from, next) => {
    if (to.meta.isLogin) {
        const token = store.state.loginModule.user.token;
        if (token) {
            next();
        } else {
            router.replace("/login");
        }
    } else {
        next();
    }
})