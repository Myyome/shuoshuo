/**
* regist.router Module
*
* Description
*/
angular.module('login.router', [
	'login.controller',
	'comm.controller'
	])
	.config(function ($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state({
			name:'login',
			url:'/login',
			views:{
				'':{
					templateUrl:'area/login/view1.html',
					controller:'loginController'
				},
				'chart':{
					templateUrl:'views/view1.html',
					controller:'commController'
				}
			}

			
		})
})