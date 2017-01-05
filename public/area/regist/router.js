/**
* regist.router Module
*
* Description
*/
angular.module('regist.router', [
	'regist.controller',
	'comm.controller'
	])
	.config(function ($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state({
			name:'regist',
			url:'/regist',
			views:{
				'':{
					templateUrl:'area/regist/view1.html',
					controller:'registController'
				},
				'chart':{
					templateUrl:'views/view1.html',
					controller:'commController'
				}
			}

			
		})
})