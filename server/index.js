const express = require("express")
const app = express()
const port = 3000
const router = require("./router")
const debug = require('debug')("my-application")


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", router)

app.listen(port, () => {
    debug("服务器运行在http://localhost:"+port);
})