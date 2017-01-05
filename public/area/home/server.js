/**
* regist.sever Module
*
* Description
*/
angular.module('home.server', [])
	.factory('homeServer', ['$q','$http', function($q,$http){
		return {
			monren:function (callback) {
				$http.get('/home')
					.then(function (result) {
						callback(result);
					},function (arr) {
						
					})
				},
			img_upload:function (fd,callback) {
       			 var postCfg = {
						headers: { 'Content-Type': undefined},
						transformRequest: angular.identity 
               
					};
				$http.post('/img_upload',fd,postCfg)
					.then(function (result) {
						callback(result);
					},function (err) {
						
					})
			},
			cut:function (w,h,x,y,imgPath,callback) {
				var postCfg = {
						headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
						transformRequest: function (data) {
							return $.param(data);
						}
					};
				$http.post('/cut',{
					"w":w.toString(),
					"h":h.toString(),
					"x":x.toString(),
					"y":y.toString(),
					"imgPath":imgPath
				},postCfg).then(function (result) {
					callback(result);
				},function (err) {
					
				})
			},
			fabiao:function (Content,callback) {
				var postCfg = {
						headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
						transformRequest: function (data) {
							return $.param(data);
						}
					};
				$http.post('/liuyan',{
					Content
				},postCfg).then(function (result) {
					callback(result);
				},function (err) {
					
				})
			},
			listLiuyan:function (callback) {
				$http.get('/listLiuyan')
					.then(function (result) {
						callback(result);
					},function (arr) {
						
					})
			},
			huifu:function (Content,getid,callback) {
				var postCfg = {
						headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
						transformRequest: function (data) {
							return $.param(data);
						}
					};
				$http.post('/huifu',{
					Content,
					getid
				},postCfg).then(function (result) {
					callback(result);
				},function (err) {
					
				})
			}	
		}
	}])		
