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

app.controller('SearchCtrl', ['$scope', function ($scope) {
	// add a test attribute here
	$scope.searchCtrlTest = "search test string here";
}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
	// add a test attribute
	$scope.favoritesCtrlTest = "favorites test string here";
}])