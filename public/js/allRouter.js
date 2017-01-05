/**
* allRouter Module
*
* Description
*/
angular.module('allRouter', [
	'comm.router',
	'regist.router',
	'login.router',
	'home.router'
	])
	.config(function ($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

})