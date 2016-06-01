/**
 * Created by mac on 16/6/1.
 */



//输出路由模块
module.exports = function(app) {
    app.use('/api/user',require('./api/user'));
}
