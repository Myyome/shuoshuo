/**
* comm.controller Module
*
* Description
*/
angular.module('comm.controller', ['comm.server'])
	.controller('commController', ['commServer','$scope', function(commServer,$scope){
		$scope.nonesession=true;
		commServer.isSession(function (reslut) {
			if(reslut=="0"){
				$scope.session=false;
				$scope.nonesession=true;
			}
			else{
				$scope.nonesession=false;
				$scope.session=true;
				$scope.username=reslut;
			}
		})
	}])