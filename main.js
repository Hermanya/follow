var app = angular.module("app",[]);


app.controller("mainController",["$scope","$http","$sce","instagramService","youtubeService","vkService",
	function($scope,$http,$sce,instagramService,youtubeService,vkService){

	if (window.localStorage.following==undefined){
		var me = {
			name:"Herman",
			instagram:"23424306",
			youtube:"hermanstarikov",
			vk:"20796153"
		};
		var kevin = {
			name:"Kevin Spacey",
			vk:"198977223"
		};
		window.localStorage.setItem("following",JSON.stringify([kevin,me]));
	}
	$scope.following = JSON.parse(window.localStorage.getItem("following"));
	$scope.content = [];
	$scope.select = function(followingNumber,socialNetwork,offset){
		$scope.currentPersonNumber = followingNumber;
		$scope.currentSocialNetwork = socialNetwork;
		if (offset === undefined){
			$scope.content = [];
			offset = 0;
		}
		switch(socialNetwork){
			case "instagram":
				instagramService.getData($scope.following[followingNumber].instagram,offset+1,$scope.instagram_maxId)
				.success(function(data, status) {
			    console.log(data);
			    $scope.instagram_maxId = data.pagination.next_max_id;
			    for (var i = 0; i < data.data.length; i++) {
			    	$scope.content.push({
			    		isInstagram: true,
			    		instagram_imageURL: data.data[i].images.standard_resolution.url,
			    		instagram_caption: data.data[i].caption,
			    	});
			    };

			  }).error(function(data, status) {
			    // Some error occurred
			   alert(JSON.stringify(data));
			  });
				break;
			case "youtube":
				youtubeService.getData($scope.following[followingNumber].youtube,offset+1)
				.success(function(data, status) {

			    for (var i = 0; i < data.feed.entry.length; i++) {

			    	$scope.content.push({
			    		isYoutube: true,
			    		youtube_title:data.feed.entry[i].title.$t,
			    		youtube_videoURL:"http://www.youtube.com/embed/"+
			    											data.feed.entry[i].id.$t.split(":").last(),
			    	});
			    };

			  }).error(function(data, status) {
			    // Some error occurred
			   alert(status);
			  });
				break;
				case "vk":
				vkService.getData($scope.following[followingNumber].vk,offset)
				.success(function(data, status) {
					console.log(data);

			    for (var i = 1; i < data.response.length; i++) {

			    	$scope.content.push({
			    		isVk: true,
			    		vk_text:data.response[i].text,
			    		vk_attachment:data.response[i].attachment
			    	});
			    };

			  }).error(function(data, status) {
			    // Some error occurred
			   alert(status);
			  });
				break;
			default:
			  	alert("unknown socialNetwork");
		}
	}
  $scope.toTrusted = function(html_code){
    return $sce.trustAsHtml(html_code);
  }
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $scope.considerThisPerson = function(){
    var person = {
    	name:$scope.newFollowingName?$scope.newFollowingName:"John",
    	instagram:$scope.newFollowingInstagram?$scope.newFollowingInstagram.split("/").last():undefined,
    	youtube:$scope.newFollowingYoutube?$scope.newFollowingYoutube.split("/").last():undefined,
    	vk:$scope.newFollowingVk?$scope.newFollowingVk.split("/").last():undefined
    };
    if (person.instagram !== undefined)
	  	instagramService.getId(person.instagram)
	  	.success(function(data, status) {
	  		if (data.data[0].id)
	  			person.instagram = data.data[0].id;
	  		else
	  			person.instagram = undefined;
	  		$scope.addThisPerson(person);
	  	}).error(function(data, status) {
	  		person.instagram = undefined;
	  		$scope.addThisPerson(person);
	  	});

	  if (person.vk !== undefined)
	  	vkService.getId(person.vk)
	  	.success(function(data, status) {
	  		if (data.response[0].uid)
	  			person.vk = data.response[0].uid;
	  		else
	  			person.vk = undefined;
	  		$scope.addThisPerson(person);
	  	}).error(function(data, status) {
	  		person.vk = undefined;
	  		$scope.addThisPerson(person);
	  	});
	  $scope.addThisPerson(person);
  }
  $scope.addThisPerson = function(person){
  	if ((person.instagram == undefined || parseInt(person.instagram))&&
  		(person.vk == undefined || parseInt(person.vk))){
	    $scope.following.push(person);
	    window.localStorage.setItem("following",JSON.stringify($scope.following));
	    $scope.newFollowingName = undefined;
    	$scope.newFollowingInstagram = undefined;
    	$scope.newFollowingYoutube = undefined;
    	$scope.newFollowingVk = undefined;
  	}
  }
  $scope.loadMore = function(){
  	$scope.select($scope.currentPersonNumber,$scope.currentSocialNetwork,$scope.content.length);
  }
  $scope.select(0,"vk");
}]);

 if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};