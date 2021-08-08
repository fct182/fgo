/**
 * 网络请求的方法
 */
import axios from "../utils/request"
import base from "./base"

const api = {
    /**
     * 登录验证
     * @param {Object} params 
     * @returns 
     */
    login(params) {
        return axios.post(base.baseUrl + base.loginUrl, params);
    },
    /**
     * 用户注册
     * @param {Object} params 
     * @returns 
     */
    register(params) {
        return axios.post(base.baseUrl + base.registerUrl, params)
    },
    /**
     * 商品列表查询
     * @param {*} params 
     * @returns 
     */
    projectList(params) {
        return axios.get(base.baseUrl + base.projectList, { params })
    },
    /**
     * 商品数量查询
     * @param {*} params 
     * @returns 
     */
    getCount() {
        return axios.get(base.baseUrl + base.totalUrl)
    },
    /**
     * 类目选择
     * @param {Object} params 
     * @returns 
     */
    getCategory(params) {
        return axios.get(base.baseUrl + base.categoryUrl, { params })
    },
    /**
     * 增加商品数据
     * @param {Object} params 
     * @returns 
     */
    addProject(params) {
        return axios.get(base.baseUrl + base.addProjectUrl, { params })
    },
    /**
     * 商品查询
     * @param {*} params 
     * @returns 
     */
    getSearch(params) {
        return axios.get(base.baseUrl + base.searchUrl, { params })
    },
    /**
     * 删除商品
     * @param {*} params 
     * @returns 
     */
    deleteProject(params) {
        return axios.get(base.baseUrl + base.deleteUrl, { params })
    },
    /**
     * 预更新接口
     * @param {*} params 
     * @returns 
     */
    preUpdate(params) {
        return axios.get(base.baseUrl + base.preUpdateUrl, { params })
    },
    /**
     * 修改商品数据
     * @param {*} params 
     * @returns 
     */
    update(params) {
        return axios.get(base.baseUrl + base.updateUrl, { params })
    },
    /**
     * 规格参数列表
     * @param {*} params 
     * @returns 
     */
    paramsList(params) {
        return axios.get(base.baseUrl + base.paramsList, { params })
    },
    /**
     * 规格参数模糊查询
     * @param {*} params 
     * @returns 
     */
    paramsSearch(params) {
        return axios.get(base.baseUrl + base.paramsSearch, { params })
    },
    /**
     * 规格参数添加
     * @param {*} params 
     * @returns 
     */
    paramsAdd(params) {
        return axios.get(base.baseUrl + base.paramsAdd, { params })
    },
    /**
     * 类目数据结构获取
     * @param {*} params 
     * @returns 
     */
    categoryClass(params) {
        return axios.get(base.baseUrl + base.categoryClass, { params })
    },
    /**
     * 修改规格参数内容
     * @param {*} params 
     */
    updateCategory(params) {
        return axios.get(base.baseUrl + base.updateCategory,{ params })
    },
    /**
     * 规格参数删除
     * @param {*} params 
     * @returns 
     */
    paramsDelete(params) {
        return axios.get(base.baseUrl + base.paramsDelete, { params })
    },
    /**
     * 内容分类管理，列表数据
     * @param {*} params 
     * @returns 
     */
    contentList(params) {
        return axios.get(base.baseUrl + base.contentList, { params })
    },
    /**
     * 内容分类管理  增加子导航
     * @param {*} params 
     * @returns 
     */
    contentAdd(params) {
        return axios.get(base.baseUrl + base.contentAdd, { params })
    },
    /**
     * 内容分类管理  修改子导航
     * @param {*} params 
     * @returns 
     */
    contentUpdate(params) {
        return axios.get(base.baseUrl + base.contentUpdate, { params })
    },
    /**
     * 内容分类管理  删除子导航
     * @param {*} params 
     * @returns 
     */
    contentDel(params) {
        return axios.get(base.baseUrl + base.contentDel, { params })
    },
    /**
     * 内容信息---列表查询
     * @param {*} params 
     * @returns 
     */
    contentInfoList(params) {
        return axios.get(base.baseUrl + base.contentInfoList,{params})
    },
    /**
     * 内容信息---添加
     * @param {*} params 
     * @returns 
     */
    contentInfoAdd(params) {
        return axios.get(base.baseUrl + base.contentInfoAdd,{params})
    },
    /**
     * 内容信息---删除
     * @param {*} params 
     * @returns 
     */
    contentInfoDel(params) {
        return axios.get(base.baseUrl + base.contentInfoDel,{params})
    },

}

export default api