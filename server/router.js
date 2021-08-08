const express = require("express")
const router = express.Router()
const sqlFn = require("./mysql");
const jwt = require("jsonwebtoken");
const config = require("./config");
const url = require("url")
/**
 * 登录验证接口
 */
router.post("/login", (req, res) => {
    const { name, password } = req.body;
    const sql = "select * from user where `name`=? and `password`=?";
    const arr = [name, password];
    sqlFn(sql, arr, result => {
        // 返回用户信息
        if (result.length > 0) {
            const token = jwt.sign({
                id: result[0].id,
                name: result[0].name
            }, config.jwtSecret)
            res.status(200).json(token);
        } else {
            res.status(401).json({
                errors: "用户名密码错误"
            })
        }
    })
})
/**
 * 注册接口
 */
router.post("/register", (req, res) => {
    const { name, password, email } = req.body;
    const sql = "insert into user values(null,?,?,?)";
    const arr = [name, password, email];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                msg: "注册成功",
                status: 200
            })
        } else {
            res.status(401).json({
                errors: "用户注册失败"
            })
        }
    })
})
/**
 * 商品管理（获取商品）
 * 参数：Page
 */
router.get("/backend/item/selectTbItemAllByPage", (req, res) => {
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from project order by id desc limit 5 offset " + (page - 1) * 5;
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                data: "暂无此数据"
            })
        }
    })
})
/**
 * 商品数据总条数
 */
router.get("/total", (req, res) => {
    const sql = "select count(*) from project where id";
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "查询失败"
            })
        }
    })
})
/**
 * 商品增加
 */
router.get("/addProject", (req, res) => {
    const sql = "insert into project values(null,?,?,?,?,?,?)";
    const arr = [req.query.title, req.query.author, req.query.category, req.query.price, req.query.desc, req.query.publish];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                msg: "添加成功",
                status: 200
            })
        } else {
            res.send({
                status: "500",
                msg: "添加失败"
            })
        }
    })
})

/**
 * 类目查询
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
    // const id = url.parse(req.url, true).query.id || 1;
    const data = new URL(`${req.url}`, "http://localhost:3000/");
    // console.log(data);
    // console.log(req.query);//{ id: '1001' }
    const id = data.searchParams.get("id") || 1;
    const sql = "select * from category where id=?";
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 商品模糊查询接口
 */
router.get("/search",(req, res) => {
    const search = req.query.search;
    const sql = "select * from project where concat(`title`,`category`,`author`,`desc`) like '%"+search+"%'";
    sqlFn(sql, null, result => {
        // console.log(result);
        res.send(result);
    })
})
/**
 * 商品删除
 */
router.get("/removeProjectByID",(req, res) => {
    const id = req.query.id;
    const sql = "delete from project where id=?";
    const arr = [id];
    sqlFn(sql, arr, result =>{
        if(result.affectedRows > 0) {
            res.send({
                msg: "删除成功",
                status: 200
            })
        }else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
/**
 * 预更新接口
 */
router.get("/preupdateProject", (req, res) => {
    const id = req.query.id;
    const sql = "select * from project where id=?";
    const arr =[id];
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
/**
 * 修改接口
 */
router.get("/updateProject",(req, res) => {
    const sql = "update project set title=?,author=?,category=?,price=?,`desc`=?,publish=? where id=?";
    const arr = [req.query.title, req.query.author, req.query.category, req.query.price, req.query.desc, req.query.publish, req.query.id];
    sqlFn(sql, arr, result => {
        if(result.affectedRows > 0){
            res.send({
                status: 200,
                msg: "修改成功"
            })
        }else{
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 规格参数 查询
 */
 router.get("/backend/itemParam/selectItemParamAll", (req, res) => {
    const page = req.query.page || 1;
    const sql = "select * from params order by id desc limit 10 offset " + (page - 1) * 10;
    sqlFn(sql, [page], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 规格参数  模糊查询
 */
router.get("/params/search", (req, res) => {
    var search = req.query.search;
    const sql = "select * from params where concat(`paramData`) like '%" + search + "%'";
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 规格参数 添加
 */
router.get("/backend/itemParam/insertItemParam", (req, res) => {
    var itemCatId = req.query.itemCatId;
    var paramsContent = req.query.content;
    var sql = "insert into params values (null,?,?)";
    sqlFn(sql, [itemCatId, paramsContent], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

/**
 * 类目结构数据获取
 */
 router.get("/category/data", (req, res) => {
    var cid = req.query.cid;
    var sql = "select * from params where itemCatId=?";
    sqlFn(sql, [cid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
/**
 * 修改规格参数
 */
 router.get("/update/category", (req, res) => {
    var cid = req.query.cid;
    var content = req.query.content;
    var sql = "update params set paramData=? where itemCatId=?";
    sqlFn(sql, [content, cid], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
/**
 * 规格参数删除
 */
 router.get("/params/delete", (req, res) => {
    var id = req.query.id;
    const sql = "delete from params where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
/**
 * 内容分类管理 导航
 */
 router.get("/content/selectContentCategoryByParentId", (req, res) => {
    const id = req.query.id || 1;
    const sql = "select * from content where id=?";
    sqlFn(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 内容分类管理 增加子导航
 */
router.get("/content/insertContentCategory", (req, res) => {
    const pid = req.query.pid;
    const name = req.query.name;
    const currentId = Math.floor(Math.random() * 10000)
    const sql = "insert into content values (?,?,?)"
    sqlFn(sql, [pid, name, currentId], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

/**
 *  内容分类管理 修改子导航
 */
router.get("/content/updateContentCategory", (req, res) => {
    const pid = req.query.pid;
    const name = req.query.name;
    const sql = "update content set name=? where pid=?"
    sqlFn(sql, [name, pid], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 内容分类管理 删除子导航
 */
router.get("/content/deleteContentCategoryById", (req, res) => {
    const pid = req.query.pid;
    const sql = "delete from content where pid=?"
    sqlFn(sql, [pid], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 内容分类管理 内容增加
 */
router.get("/content/insertTbContent",(req,res) =>{
    const pid = req.query.pid;
    const name = req.query.name;
    const contentUrl = req.query.url;
    const image = req.query.image;
    const sql = "insert into contentinfo values(null,?,?,?,?)";
    sqlFn(sql,[pid,name,contentUrl,image],result =>{
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
* 内容分类管理 内容删除
*/

router.get("/content/deleteContentByIds",(req,res) =>{
    const id = req.query.id;
    const sql = "delete from contentinfo where id=?"
    sqlFn(sql,[id],result =>{
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 内容分类管理 内容查询
 */
router.get("/content/selectTbContentAllByCategoryId", (req, res) => {
    const pid = req.query.pid;
    const sql = "select * from contentinfo where pid=?"
    sqlFn(sql, [pid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

module.exports = router