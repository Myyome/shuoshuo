/**
* regist.sever Module
*
* Description
*/
angular.module('comm.server', [])
	.factory('commServer', ['$q','$http', function($q,$http){
		return {
				isSession:function (callback) {
					$http.get('/session')
					.then(function (result) {
						if(result.data.mess=="1"){
							callback(result.data.username);
						}
						else if(result.data.mess=="0"){
							callback("0");
						}
					},function (arr) {
						// body...
					})
				}
			}
		
	}])