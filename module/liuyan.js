 var mongoose = require('mongoose');    //引用mongoose模块
	mongoose.connect('mongodb://localhost/shuoshuo'); 
 var db = mongoose.connection;
 	db.on('error',console.error.bind(console,'连接错误:'));
  	db.once('open',function(){
      //一次打开记录
    });
	var CommentSchema= new mongoose.Schema({
    	Content:String,
    	date:String,
    	username:String,
        touxiang:String
    });
    var LiuyanSchema= new mongoose.Schema({
    	Content:String,
        date:String,
    	Date:Date,
    	username:String,
    	comments:[CommentSchema],
    	touxiang:String
    });
     var UserSchema= new mongoose.Schema({
    	username:String,
    	password:String,
    	touxiang:String
    });
     //找留言头像
	LiuyanSchema.methods.zhaoliuyantouxiang=function (callback) {
		User.findOne({username:this.username},function (err,result) {
			callback(err,result);
		})
	}
    //找留言中的评论头像
    LiuyanSchema.methods.zhao=function (commentuser,callback) {
        User.findOne({username:commentuser},function (err,result) {
            callback(err,result);
        })
    }
    //找评论头像
    CommentSchema.methods.zhaopingluntouxiang=function (callback) {
        User.findOne({username:this.username},function (err,result) {
            callback(err,result);
        })
    }
    //把评论对象存到留言中
    LiuyanSchema.statics.cun=function (getid,Comment,callback) {
        this.findOne({_id:getid},function (err,result) {
            console.log(result)
           result.comments.push(Comment);
           result.save();
           callback(err,result)
        })
    }
     var Liuyan = db.model('Liuyan',LiuyanSchema);
     var Comment = db.model('Comment',CommentSchema);
     var User = db.model('User',UserSchema);
     exports.Liuyan=Liuyan;
     exports.Comment=Comment;
     exports.User=User;
