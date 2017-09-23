var serviceformApp = angular.module('serviceformApp', [ 'ngRoute', 'serviceformControllers', 'serviceformFilters', 'serviceformServices' ]);

serviceformApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/serviceform.json/page/:page/limit/:limit', {
		templateUrl : '/serviceform',
		reloadOnSearch: false,
		controller : 'ServiceFormIndexController'
	}).when('/serviceform/:id.json', {
		templateUrl : '/serviceform/:id',
		controller : 'ServiceFormGetController',
		reloadOnSearch: false
	});
} ]);