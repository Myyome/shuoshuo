var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var router= require('./router/router.js')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge: 86400000 }
}))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('./public'));
app.use('/touxiang',express.static('./touxiang'));
app.use('/upload',express.static('./upload'));
//查看session
app.get('/session',router.session);
//删除session
app.get('/logout',router.logout);
//执行注册
app.post('/doregist',router.doregist);
//执行登录
app.post('/dologin',router.dologin);
//首页
app.get('/home',router.showHome);
//上传头像
app.post('/img_upload',router.img_upload);
//裁剪图片
app.post('/cut',router.cut);
//查找用户名是否重复
app.post('/dorepeatUser',router.dorepeatUser);
//发表留言
app.post('/liuyan',router.liuyan);
//留言列表
app.get('/listLiuyan',router.listLiuyan)
//参与回复
app.post('/huifu',router.huifu)
app.listen(3000);