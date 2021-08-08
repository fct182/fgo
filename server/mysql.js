const mysql = require("mysql");
var client = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123",
    database:"test"
})

// query理解为查询，数据库的操作方法
function sqlFn(sql,arr,callback){
    /**
     * 接受三个参数
     *  sql语句
     *  sql语句的参数
     *  回调函数返回值
     */
    client.query(sql,arr,function(error,result){
        if(error){
            console.log(error);
            return;
        }
        // 回调函数
        callback(result)
    })
}

module.exports = sqlFn