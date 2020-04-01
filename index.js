const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.json())//使用json格式
app.use(cors())

app.set('secret', "codeisanything1234567890.") //JWT token 密钥

/*---------------------------------------静态文件夹挂载-----------------*/
app.use('/upload', express.static(__dirname + "\\public\\upload"))

require('./mongoose/index')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)


app.get('/', (req, res, next) => {
    res.send({
        code: 0,
        data: null,
        message: "后端服务正在运行...."
    })
})


app.listen(3000, () => {
    console.log('http://localhost:3000')
})  