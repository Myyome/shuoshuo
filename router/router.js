var db = require("../module/db.js");
var Class=require("../module/liuyan.js");
var md5 =require("../module/md5.js");
var multer = require('multer'); 
var moment = require('moment');
var fs = require('fs')
  , gm = require('gm');
  var path=require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
  	var exname=file.mimetype.substring(file.mimetype.indexOf('/')+1);
    cb(null, req.session.username+'&'+new Date().getTime()+'.'+exname)
  }
})
var upload = multer({ storage: storage }).single('file')
//查看session
exports.session=function (req,res) {
	console.log(req.session.username)
	if(req.session.regist=="1"){
		res.json({"mess":"1","username":req.session.username});
	}
	else{
		res.json({"mess":"0"});
	}
}
//删除session
exports.logout=function (req,res) {
	delete req.session.regist;
	delete req.session.username;
	console.log(req.session.regist)
	res.redirect('/');
}

//执行注册
exports.doregist=function (req,res) {
	//保存到数据库
	var username=req.body.username;
	var password=req.body.password;
	if(username==""){
		res.send("-3")//用户名不能为空
		return;
	}
	password=md5(md5(password)+md5(password).substring(5,12));
	db.insertMany('users',[{"username":username,"password":password,"touxiang":'touxiang/moren.jpg'}],function (result) {
		req.session.regist="1";
		req.session.username=username;
		res.send("1");//增加数据成功
	})
};
//查找用户名是否重复
exports.dorepeatUser=function (req,res) {
	//查找数据库
	var username=req.body.username;
	if(username==''){
		res.send("-3");//用户名不能为空
		return;
	}
	db.find('users',{"username":username},function (docs) {
		if(docs.length==0){
			res.send("1");//可以注册
		}
		else{
			res.send("-1");//用户名重复
		}
	})
};
//执行登录
exports.dologin=function (req,res) {
	//查找数据库
	var username=req.body.username;
	var password=req.body.password;
	if(username==""){
		res.send("-3")//用户名不能为空
		return;
	}
	console.log(username)
	password=md5(md5(password)+md5(password).substring(5,12));
	db.find('users',{"username":username},function (docs) {
		if(docs.length==0){
			res.send("-1")//用户名不存在
		}
		else {
				if(password==docs[0].password){
					req.session.regist="1";
					req.session.username=username;
					res.send("1") //登录成功
				}
				else{
					res.send("-2") //密码错误
				}
		}
	})
	
};
//展示首页
exports.showHome=function (req,res) {
	// now=moment(Date.now()).format();
	// now=moment(now).unix()
	// now=moment(now*1000).format('YYYY-MM-DD HH:mm:ss')
	// console.log(now)
	if(req.session.regist=="1"){
		db.find('users',{"username":req.session.username},function (docs) {
			res.send(docs[0].touxiang);
		})
	}
}
//上传头像
exports.img_upload=function (req,res) {
	upload(req, res, function (err) {
        //添加错误处理
    if (err) {
         return  console.log(err);
    } 
  var imgPath = path.join(__dirname,'../',req.file.path)
  imgPath=imgPath.replace(/\\/g,'/');
  console.log(imgPath)
        //文件信息在req.file或者req.files中显示。
       gm(imgPath)
		.resize(568)
		.write(imgPath, function (err) {
		  if (err) console.log(err);
		});
        
    res.status(200).send({src:req.file.path,imgPath:imgPath});  
	})
}
//裁剪图像
exports.cut=function (req,res) {
	var w =parseInt(req.body.w);
    var h = parseInt(req.body.h);
    var x = parseInt(req.body.x);
    var y = parseInt(req.body.y);
    var imgPath=req.body.imgPath;
 
    var basename=path.basename(imgPath);
  		basename=basename.split('&');
    var relativePath=path.join("touxiang",basename[0]+'.jpeg');
    var toPath=path.join(__dirname,'../',relativePath)
    console.log(relativePath)
     gm(imgPath)
        .crop(w,h,x,y)
        .resize(150,150,"!")
        .write(toPath,function(err){
        if(err){
        	console.log(err);
            res.send("-1");
            return;
        }
        db.updateMany("users",{"username":req.session.username},
        		{$set:{"touxiang":relativePath}},function (result) {
        			res.send("1");
        		}
        	)
        });
};
exports.liuyan=function (req,res) {
	var data={
		Content:req.body.Content,
		date:new Date(),
		Date:new Date(),
		username:req.session.username
	}
	Class.Liuyan.create(data,function (err,result) {
		if(err){
			throw err;
		}
		Class.User.findOne({username:req.session.username},function (err,result2) {
			result.touxiang=result2.touxiang;
			result.date=moment(result.date).format('YYYY-MM-DD HH:mm:ss');
			res.send(result);
		})

	})
};
exports.listLiuyan=function (req,res) {
	if(req.session.regist!=="1"){
		return;
	}
	Class.Liuyan.find({}).sort({"Date":-1}).exec(function (err,result) {
		(function diedai1 (i) {
			 	if(i==result.length){
			 		res.send(result);
			 		return;
				}
				result[i].zhaoliuyantouxiang(function (err,result2) {
					result[i].touxiang=result2.touxiang;
					(function diedai2 (j) {
						if(j==result[i].comments.length){
							return;
						}
						result[i].zhao(result[i].comments[j].username,function (err,result3) {
							result[i].comments[j].touxiang=result3.touxiang;
							result[i].comments[j].date=moment(result[i].comments[j].date).format('YYYY-MM-DD HH:mm:ss')
							diedai2(j+1)
						})
					})(0)
					
					result[i].date=moment(result[i].date).format('YYYY-MM-DD HH:mm:ss')
					diedai1(i+1)
				})
			})(0)
	})
};
exports.huifu=function (req,res) {
	if(req.session.regist!=="1"){
		return;
	}
	var commentObj={
		Content:req.body.Content,
		date:new Date(),
		username:req.session.username
	}
	console.log(1234)
	Class.Comment.create(commentObj
	,function (err,result1) {
			Class.Liuyan.cun(req.body.getid,result1,function (err,result2) {
					result1.zhaopingluntouxiang(function (err,result3) {
						result2.zhaoliuyantouxiang(function (err,result4) {
							result2.touxiang=result4.touxiang;
							result2.date=moment(result2.date).format('YYYY-MM-DD HH:mm:ss');
							(function diedai (i) {
								if(i==result2.comments.length){
										console.log(result2)
										res.send(result2);
										return;
								}
								result2.zhao(result2.comments[i].username,function (err,result5) {
										result2.comments[i].touxiang=result5.touxiang;
										result2.comments[i].date=moment(result2.comments[i].date).format('YYYY-MM-DD HH:mm:ss');
										diedai(i+1);
										
									})
						
							})(0)
						})
						
						})
		
				
				
			});

	})
}