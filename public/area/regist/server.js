/**
* regist.sever Module
*
* Description
*/
angular.module('regist.server', [])
	.factory('registServer', ['$q','$http', function($q,$http){
		return {
			//执行注册
			doregist:function (username,password,callback) {
				var data={
					"username":username,
					"password":password
				};
				var postCfg = {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					transformRequest: function (data) {
						return $.param(data);
					}
				}
				$http.post('/doregist',data,postCfg)
					.then(function (result) {
						callback(result)
					},
					function (err) {
						callback(err);
					});
			},
			//查找用户名是否重复
			dorepeatUser:function (username,callback) {
				var data={
					"username":username
				};
				var postCfg = {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					transformRequest: function (data) {
						return $.param(data);
					}
				};
				$http.post('/dorepeatUser',data,postCfg)
					.then(function (result) {
						callback(result)
					},
					function (err) {
						callback(err);
					});

			}
		}
	}])