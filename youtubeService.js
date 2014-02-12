	
app.factory('youtubeService', ['$http', function($http) {

    var getData = function(id,offset) {
      return $http({
        method: 'JSONP',
        url: "http://gdata.youtube.com/feeds/api/users/"+id+
        			"/uploads?v=2&alt=json&start-index="+offset+"&max-results=10"+
        			"&callback=JSON_CALLBACK"
      });
    }
    return {
      getData: function(id,offset) { return getData(id,offset); },
    };
  }]);