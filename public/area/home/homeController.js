/**
* home.controller Modul
		
*
* Description
*/
angular.module('home.controller', [
	'home.server',
	'home.directive',
	'login.server',
	'comm.server'
	])
		.controller('homeController', ['$timeout','loginServer','commServer','$state','homeServer','$scope', function($timeout,loginServer,commServer,$state,homeServer,$scope){
			$scope.comment={
				Content:''
			}
			$scope.liuyanContent={
				Content:'',
				date:'',
				user:'',
				touxiang:'',
				_id:'',
				comment:$scope.comment
			}
			$scope.liuyanContentArry=[];
			//查看session
			commServer.isSession(function (result) {
				if (result=="0") {
					//没登录
					$scope.Login=false;
				}
				else{
					$scope.Login=true;
				}
			})
			homeServer.monren(function (result) {
				$scope.imgSrc=result.data;
				console.log($scope.imgSrc)
			});
			homeServer.listLiuyan(function (result) {
				var result=result.data;
				console.log(result)
				$scope.liuyanContentArry=result;
			})
			$scope.img_upload=function (file) {
				var fd = new FormData();
       			var file = document.querySelector('input[type=file]').files[0];
       			 fd.append('file', file); 
       			 homeServer.img_upload(fd,function (result) {
       			 	console.log(result)
       			 		var data=result.data.src.replace('\\','/')
       			 		$scope.src=data;
       			 		$scope.imgPath=result.data.imgPath;
       			 		var img=$(".jcrop-holder img");
 						if (img.length!==0){
 							img.attr('src',data);
 						}

       			 		//console.log($scope.src);

       			 })
			}
			$scope.cut=function (imgPath) {
				var w=parseInt($(".jcrop-holder>div:first").css("width"));
				var h= parseInt($(".jcrop-holder>div:first").css("height"));
				var x= parseInt($(".jcrop-holder>div:first").css("left"));
				var y= parseInt($(".jcrop-holder>div:first").css("top"));
				homeServer.cut(w,h,x,y,imgPath,function (result) {
					if (result.data=="1"){
						window.location.reload(true);
					}
				})
			};
			$scope.sendData= {
		        username: "",
		        password: "",
		        textarea:""
    		};
			$scope.login=function () {
				console.log($scope.sendData.username)
				loginServer.dologin($scope.sendData.username,
					$scope.sendData.password,
					function (result) {
						var result=result.data;
						if(result=="1"){
							window.location.reload(true);
						}
						else if(result=="-1"){
							$scope.alertBox=true;
							$scope.text='用户名不存在';
							$scope.sendData.password='';
						}
						else if(result=="-2"){
							$scope.alertBox=true;
							$scope.text='密码不正确';
							$scope.sendData.password='';
						}
						else {
							$scope.alertBox=true;
							$scope.text='用户名不能为空';
						}
				})
			};

			$scope.closeBox=function () {
				$scope.alertBox=false;
			};
			$scope.fabiao=function () {
				homeServer.fabiao($scope.sendData.textarea,function (result) {
					var result=result.data;
					console.log(result)
					$scope.liuyanContentArry.splice(0,0,result);
					$scope.sendData.textarea='';
				})
			}
			$scope.getid='';
			falg=true;
			$scope.hid=function ($event) {
				$scope.comment.Content='';
				var getid=$($event.target).parents('.attribution').children(':last').text();
				$scope.getid=getid;
				var thisbody=$($event.target).parents('.comment-body')
					if(thisbody.find('.comment-nei').css('display')=='none' || falg==true){
						$('.comment-nei').css('display','none');
						thisbody.find('.comment-nei').css('display','block');
						$('.ipt-txt').focus();
						falg=false;
					}
					else{
						thisbody.find('.comment-nei').css('display','none');
					}
					//falg=!falg;
				
			}
			$scope.hid2=function ($event) {
				var getid=$($event.target).parents('.comment-body').find('._id').text();
				console.log(getid)
				$scope.getid=getid;
				var  commentUsername=$($event.target).parents('.attribution').find('span:eq(0)').text();
				$scope.comment.Content=' 回复 @'+commentUsername+' ：';
				var thisbody=$($event.target).parents('.comment-body')
				$('.comment-nei').css('display','none');
					thisbody.find('.comment-nei').css('display','block');
					falg=true;
					$('.ipt-txt').focus(); //文本框得到光标
	
			}
			$scope.huifu=function () {
				homeServer.huifu($scope.comment.Content,$scope.getid,function (result) {
				var result=result.data;
					for(var i=0;i<$scope.liuyanContentArry.length;i++){
						var item=$scope.liuyanContentArry[i];
						if(item._id==result._id){
							item=result;
							$scope.liuyanContentArry.splice(i,1,item);
							
						}
					}
					$scope.comment.Content='';

				})
			}
		}])