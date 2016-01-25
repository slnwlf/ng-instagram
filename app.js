var app = angular.module('instagramSearchApp', ['ngRoute']);

var parseRequestHeaders = {
  'X-Parse-Application-Id': 'cVJWwtQDGlEaf3Z6SxbdcYk1316mvocFYIIlsJJg',
  'X-Parse-REST-API-Key': '5W6v082DKbVCgMraDiyYDBKvzGvTw3nyMEIaJPU0'
};

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/search.html',
			controller: 'SearchCtrl'
		})
		.when('/favorites', {
			templateUrl: 'templates/favorites.html',
			controller: 'FavoritesCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);

app.factory('Photo', ['$resource', function ($resource) {
	return $resource('https://api.parse.com/1/classes/Photo/:photoId', { photoId: '@photoId' },
	{
		query: {
			method: 'GET',
			isArray: false,
			headers: parseRequestHeaders
		},
		save: {
			method: 'POST',
			headers: parseRequestHeaders
		}
	});

	    // $resource function exposes all five RESTful methods/routes
    // { 'get'   : { method: 'GET'                },
    //   'save'  : { method: 'POST'               },
    //   'query' : { method: 'GET', isArray: true },
    //   'remove': { method: 'DELETE'             },
    //   'delete': { method: 'DELETE'             } };

}]);

// Controllers

app.controller('SearchCtrl', ['$scope', '$http', 'Photo', function ($scope, $http, Photo) {
	// add a test attribute here
	$scope.searchCtrlTest = 'search controller is working';

	$scope.searchTag = function () {
		var tag = $scope.tag;
		var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';
		console.log($scope.tag);

		$http.jsonp(url)
			.then(function (response) {
				$scope.photos = response.data.data;
				console.log(response.data.data);
				// success callback
			}, function (error) {
				// error callback
			});
	};
		$scope.savePhoto = function (photo) {
			var photoData = {
				url: photo.images.low_resolution.url,
				user: photo.user.username,
				likes: photo.likes.count
	};
	Photo.save(photoData);
};

}]);

app.controller('FavoritesCtrl', ['$scope', '$http', 'Photo', function ($scope, $http, Photo) {
	$scope.favorites = Photo.query();

}]);

