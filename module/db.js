var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/shuoshuo';

function _connectDb(callback) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.log('数据库连接不成功');
			return;
		}
	  callback(db);
	});
}

//增

exports.insertMany=function (collectionName,arr,callback) {
	_connectDb(function(db) {
		var collection = db.collection(collectionName);
		collection.insertMany(arr,
  function(err, result) {
	    if(err){
	    	console.log('增加数据失败');
	    	return;
	    }
    		callback(result);
  		});
		db.close();
	})
};

//删

exports.deleteMany=function (collectionName,json,callback) {
	_connectDb(function (db) {
		var collection = db.collection(collectionName);
		collection.deleteMany(json,function (err,result) {
			if(err){
				console.log('删除失败');
				return;
			}
			callback(result);
		})
		db.close();
	})
};

//改

exports.updateMany=function (collectionName,json1,json2,callback) {
	_connectDb(function (db) {
		var collection = db.collection(collectionName);
		collection.updateMany(json1,json2,function (err,result) {
			if(err){
				console.log('修改失败');
				return;
			}
			callback(result);
		})
		db.close();
	})
}

//查，分页

exports.find=function (collectionName,json,pagination,callback) {
	if(arguments.length==3 && typeof pagination=='function'){
		var callback=pagination;
		var page=0;
		var count=0;
	}
	else{
		var page=pagination.page;
		var count=pagination.count;
	}
	_connectDb(function (db) {
		var collection = db.collection(collectionName);
		collection.find(json).limit(count).skip(count*(page-1)).sort({"shijian":-1}).toArray(function (err,docs) {
			if(err){
				console.log('查找失败');
				return;
			}
			callback(docs);
		})
		db.close();
	})
}

//总数量
exports.count=function (collectionName,callback) {
	_connectDb(function (db) {
		var collection = db.collection(collectionName);
		collection.count({},function (err,count) {
			callback(err,count);
		})
	})
}