module.exports = app => {//导出个函数
    const mongoose = require("mongoose")
    const config = require("../config.js")
    //数据库配置
    var option = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        auto_reconnect: true,
        useUnifiedTopology: true
    }
    //连接数据库
    mongoose.connect(config.DB_URL, option);

    const db = mongoose.connection;

    db.once('open', () => {
        console.log('************数据库信息**************')
        console.log('连接成功');
        console.log('***********************************')
    })

    db.on('error', function (error) {
        console.log('************数据库信息**************')
        console.error('数据库连接失败: ' + error);
        console.log('***********************************')
        mongoose.disconnect();
    });

    db.on('close', function () {
        console.log('************数据库信息**************')
        console.log('数据库已关闭！');
        console.log('***********************************')
        mongoose.connect(config.DB_URL, option.auto_reconnect);
    });

}