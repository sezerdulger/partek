
var productApp = angular.module('productApp', [ 'ngRoute', 
                                                        'productControllers', 'productFilters', 'productServices' ]);

productApp.fields={};

productApp.fields.id={visibility:false};

productApp.fields.name={visibility:true};

productApp.fields.customer={visibility:true};

productApp.fields.createdBy={visibility:false};

productApp.fields.owner={visibility:false};

productApp.fields.updatedBy={visibility:false};

productApp.fields.createdAt={visibility:false};

productApp.fields.updatedAt={visibility:false};

productApp.fields.deleted={visibility:false};


productApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/product.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/product/index',
		reloadOnSearch: false,
		controller : 'ProductIndexController'
	}).when('/product.json/:id', {
		templateUrl : function(params) {
			return '/product/get'
		},
		controller : 'ProductGetController',
		reloadOnSearch: false
	}).when('/product.json/:id/:modify', {
		templateUrl : function(params) {
			return '/product/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/product.json', {
		templateUrl : '/product/create',
		reloadOnSearch: false,
		controller : 'ProductGetController'
	});
	
} ]);
