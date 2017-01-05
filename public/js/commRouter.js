/**
* comm.router Module
*
* Description
*/
angular.module('comm.router', ['comm.controller'])
	.config(function ($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state({
			name:'comm',
			url:'/',
			views:{
				'chart':{
					templateUrl:'views/view1.html',
					controller:'commController'
				}
			}
	})
});
