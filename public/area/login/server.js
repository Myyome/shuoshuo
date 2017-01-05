/**
* regist.sever Module
*
* Description
*/
angular.module('login.server', [])
	.factory('loginServer', ['$q','$http', function($q,$http){
		return {
			//执行登录
			dologin:function (username,password,callback) {
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
				$http.post('/dologin',data,postCfg)
					.then(function (result) {
						callback(result)
					},
					function (err) {
						callback(err);
					});
			}
		}
	}])