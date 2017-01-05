/**
* regist.router Module
*
* Description
*/
angular.module('home.router', [
	'home.controller',
	'comm.controller'
	])
	.config(function ($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state({
			name:'home',
			url:'/home',
			views:{
				'':{
					templateUrl:'area/home/view1.html',
					controller:'homeController'
				},
				'chart':{
					templateUrl:'views/view1.html',
					controller:'commController'
				}
			}

			
		})
})