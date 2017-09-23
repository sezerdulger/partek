
var userApp = angular.module('userApp', [ 'ngRoute', 
                                                        'userControllers', 'userFilters', 'userServices' ]);

userApp.fields={};

userApp.fields.id={visibility:false};

userApp.fields.role={visibility:true};

userApp.fields.fullname={visibility:true};

userApp.fields.username={visibility:true};

userApp.fields.password={visibility:false};

userApp.fields.active={visibility:true};

userApp.fields.createdAt={visibility:false};

userApp.fields.deleted={visibility:false};


userApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/user.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/user/index',
		reloadOnSearch: false,
		controller : 'UserIndexController'
	}).when('/user.json/:id', {
		templateUrl : function(params) {
			return '/user/get'
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/user.json/:id/:modify', {
		templateUrl : function(params) {
			return '/user/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/user.json', {
		templateUrl : '/user/create',
		reloadOnSearch: false,
		controller : 'UserGetController'
	});
	
} ]);
