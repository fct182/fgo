/**
 * 网络请求地址
 */
const base = {
    baseUrl: "/api",
    loginUrl: "/api/login",//登录地址
    registerUrl: "/api/register",//注册地址
    projectList:"/api/backend/item/selectTbItemAllByPage",//商品列表
    totalUrl: "/api/total",//商品总数目
    categoryUrl: "/api/backend/itemCategory/selectItemCategoryByParentId",//类目查询选择
    addProjectUrl:"/api/addProject",//增加商品
    searchUrl: "/api/search",//商品搜索
    deleteUrl: "/api/removeProjectByID",//商品删除
    preUpdateUrl: "/api/preupdateProject",//预更新
    updateUrl:"/api/updateProject",//修改商品数据
    paramsList: "/api/backend/itemParam/selectItemParamAll",//规格参数列表
    paramsSearch: "/api/params/search",//规格参数查询
    paramsAdd: "/api/backend/itemParam/insertItemParam",//规格参数添加
    categoryClass: "/api/category/data",//添加产品类目数据结构获取
    updateCategory: "/api/update/category",//商品类目信息更新
    paramsDelete:"/api/params/delete", //规格参数删除
    contentList:"/api/content/selectContentCategoryByParentId",// 内容分类管理的查询
    contentAdd:"/api/content/insertContentCategory", //内容分类管理添加子导航
    contentUpdate: "/api/content/updateContentCategory", //内容分类管理修改子导航
    contentDel: "/api/content/deleteContentCategoryById", //内容分类管理删除子导航
    contentInfoList:"/api/content/selectTbContentAllByCategoryId", //内容信息查询
    contentInfoDel:"/api/content/deleteContentByIds",//内容信息--删除
    contentInfoAdd:"/api/content/insertTbContent", //内容信息添加
}

export default base