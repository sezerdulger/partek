
var roleApp = angular.module('roleApp', [ 'ngRoute', 
                                                        'roleControllers', 'roleFilters', 'roleServices' ]);

roleApp.fields={};

roleApp.fields.id={visibility:false};

roleApp.fields.title={visibility:true};

roleApp.fields.createdBy={visibility:false};

roleApp.fields.owner={visibility:false};

roleApp.fields.updatedBy={visibility:false};

roleApp.fields.createdAt={visibility:false};

roleApp.fields.updatedAt={visibility:false};

roleApp.fields.deleted={visibility:false};


roleApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/role.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/role/index',
		reloadOnSearch: false,
		controller : 'RoleIndexController'
	}).when('/role.json/:id', {
		templateUrl : function(params) {
			return '/role/get'
		},
		controller : 'RoleGetController',
		reloadOnSearch: false
	}).when('/role.json/:id/:modify', {
		templateUrl : function(params) {
			return '/role/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/role.json', {
		templateUrl : '/role/create',
		reloadOnSearch: false,
		controller : 'RoleGetController'
	});
	
} ]);
