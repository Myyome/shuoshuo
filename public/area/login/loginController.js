/**
* regist.controller Modul
		e
*
* Description
*/
angular.module('login.controller', [
	'login.server'
	])
		.controller('loginController', ['loginServer','$scope', function(loginServer,$scope){
			//执行登录
			$scope.login=function () {
				loginServer.dologin($scope.username,
					$scope.password,
					function (result) {
						var result=result.data;
						if(result=="1"){
							alert('登录成功,即将跳转到首页')
							window.location='/';
						}
						else if(result=="-1"){
							$scope.alertBox=true;
							$scope.text='用户名不存在';
							$scope.password='';
						}
						else if(result=="-2"){
							$scope.alertBox=true;
							$scope.text='密码不正确';
							$scope.password='';
						}
						else {
							$scope.alertBox=true;
							$scope.text='用户名不能为空';
						}
				})
			};

			$scope.closeBox=function () {
				$scope.alertBox=false;
			}
		}])