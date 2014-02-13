	
app.factory('instagramService', ['$http', function($http) {

    var getId = function(username) {
      return $http({
        method: 'JSONP',
        url: "https://api.instagram.com/v1/users/search?q="+username+
        			"&access_token=23424306.f59def8.7db6e07bc5824301a0bd3d6a18838ced&callback=JSON_CALLBACK"
      });
    }
    var getData = function(id,offset,maxId) {
      console.log(maxId);
      return $http({
        method: 'JSONP',
        url: "https://api.instagram.com/v1/users/"+id+
              "/media/recent/?count=10&offset="+offset+((maxId!==undefined)?"&max_id="+maxId:"")+
        		 "&access_token=23424306.f59def8.7db6e07bc5824301a0bd3d6a18838ced&callback=JSON_CALLBACK"
      });
    }
    return {
      getId: function(username) { return getId(username); },
      getData: function(id,offset,maxId) { return getData(id,offset,maxId); },
    };
  }]);