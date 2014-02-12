	
app.factory('vkService', ['$http', function($http) {

    var getId = function(username) {
      return $http({
        method: 'JSONP',
        url: "https://api.vk.com/method/getProfiles?uids="+username+
        			"&callback=JSON_CALLBACK"
      });
    }
    var getData = function(id,offset) {
      return $http({
        method: 'JSONP',
        url: "https://api.vk.com/method/wall.get?owner_id="+id+
        		 "&count=10&offset="+offset+"&callback=JSON_CALLBACK"
      });
    }
    return {
      getId: function(username) { return getId(username); },
      getData: function(id,offset) { return getData(id,offset); },
    };
  }]);