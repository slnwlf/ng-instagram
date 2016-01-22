var app = angular.module('instagramSearchApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/templates/search.html',
			controller: 'SearchCtrl'
		})
		.when('/favorites', {
			templateUrl: '/templates/favorites.html',
			controller: 'FavoritesCtrl'
		});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);

app.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
	// add a test attribute here
	$scope.searchCtrlTest = "search test string here";
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
		$scope.favoritePhoto = function (photo) {
		console.log(photo);
	};
}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
	// add a test attribute
	$scope.favoritesCtrlTest = "favorites test string here";
}]);

