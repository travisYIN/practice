var mongoose = require('mongoose'); //引用mongoose模块
var db = mongoose.createConnection('localhost', 'test'); //创建一个数据库连接

console.log(db)

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    //一次打开记录
});
