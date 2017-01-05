/**
* regist.controller Modul
		e
*
* Description
*/
angular.module('regist.controller', [
	'regist.server'
	])
		.controller('registController', ['registServer','$scope', function(registServer,$scope){
			$scope.alertBox=false;
			//执行注册
			$scope.regist=function () {
				registServer.doregist($scope.username,
					$scope.password,
					function (result) {
						if(result.data!=="1"){
							$scope.alertBox=true;
							$scope.success=false;
							$scope.danger=true;
							$scope.text="用户名不能为空"
							return;
						}
						alert('注册成功,即将跳转到首页')
						window.location='/';
				})
			};
			//查找用户名是否重复
			$scope.repeatUser=function () {
				registServer.dorepeatUser($scope.username,function (result) {
					console.log(result)
					if(result.data=="1"){
						$scope.alertBox=true;
						$scope.danger=false;
						$scope.success=true;
						$scope.text="用户名可以使用"
					}
					else if(result.data=="-1"){
						$scope.alertBox=true;
						$scope.success=false;
						$scope.danger=true;
						$scope.text="用户名被占用"
					}
					else{
							$scope.alertBox=true;
							$scope.success=false;
							$scope.danger=true;
							$scope.text="用户名不能为空"
					}
				})
			}
		}])