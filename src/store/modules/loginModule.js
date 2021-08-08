import jwt from "jwt-decode"
import api from "../../api"
import router from "../../router";
import { Message } from 'element-ui';

export default {
    namespaced: true,
    state: {
        user: {
            name: "",
            token: "",
            isLogin: false
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        removeUser(state) {
            state.user = {
                name: "",
                token: "",
                isLogin: false
            }
        },
    },
    actions: {
        setUserActions({ commit }, user) {
            api.login(user).then(res => {
                if (res.status === 200) {
                    const temp = {
                        name: jwt(res.data).name,
                        token: res.data,
                        isLogin: Boolean(res.data)
                    }
                    commit("setUser", temp);
                    // 本地存储
                    localStorage.setItem("ego", JSON.stringify(temp));
                    //  重定向到首页
                    router.push("/");
                }
            }).catch(err => {
                console.log(err.data);
                //   alert("账号或密码错误！");
                Message({
                    message: '账号或密码错误！',
                    type: 'error'
                });
            })

        }
    }
}