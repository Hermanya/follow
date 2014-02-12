var app = angular.module("app",[]);


app.controller("mainController",["$scope","$http","$sce","instagramService","youtubeService",
	function($scope,$http,$sce,instagramService,youtubeService){

	if (window.localStorage.following==undefined){
		window.localStorage.setItem("following",'[{"name":"Herman","instagram":"23424306","youtube":"hermanstarikov"}]');
	}
	$scope.following = JSON.parse(window.localStorage.getItem("following"));
	$scope.content = [];
	$scope.select = function(followingNumber,socialNetwork){
		$scope.content = [];
		switch(socialNetwork){
			case "instagram":
				instagramService.getData($scope.following[followingNumber].instagram,1)
				.success(function(data, status) {
			    console.log(data);

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
				youtubeService.getData($scope.following[followingNumber].youtube,1)
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
			   alert(JSON.stringify(data));
			  });
				break;
			default:
			  	alert("unknown socialNetwork");
		}
	}
  $scope.toTrusted = function(html_code)
    {
    return $sce.trustAsHtml(html_code);
    }
    $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  	}
  $scope.addThisPerson = function(){
    	var person = {
    		name:$scope.newFollowingName,
    		instagram:$scope.newFollowingInstagram,
    		youtube:$scope.newFollowingYoutube
    	};
    	$scope.following.push(person);
    	window.localStorage.setItem("following",JSON.stringify($scope.following));

    }
    $scope.select(0,"instagram");
}]);


/*
 vk 1 https://api.vk.com/method/getProfiles?uids= id
 vk 2 https://api.vk.com/method/wall.get?ownenpm install grunt --save-devr_id= id &count=10&offset= alreadey

https://api.instagram.com/v1/users/search?q= id &access_token=23424306.f59def8.7db6e07bc5824301a0bd3d6a18838ced
 https://api.instagram.com/v1/users/".$_GET["id"]."/media/recent/?access_token=23424306.f59def8.7db6e07bc5824301a0bd3d6a18838ced&count=10
 */
 if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};