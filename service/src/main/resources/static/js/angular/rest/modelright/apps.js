
var modelrightApp = angular.module('modelrightApp', [ 'ngRoute', 
                                                        'modelrightControllers', 'modelrightFilters', 'modelrightServices' ]);

modelrightApp.fields={};

modelrightApp.fields.id={visibility:false};

modelrightApp.fields.role={visibility:true};

modelrightApp.fields.model={visibility:true};

modelrightApp.fields.read={visibility:false};

modelrightApp.fields.create={visibility:false};

modelrightApp.fields.edit={visibility:false};

modelrightApp.fields.delete={visibility:false};

modelrightApp.fields.createdBy={visibility:false};

modelrightApp.fields.owner={visibility:false};

modelrightApp.fields.updatedBy={visibility:false};

modelrightApp.fields.createdAt={visibility:false};

modelrightApp.fields.updatedAt={visibility:false};

modelrightApp.fields.deleted={visibility:false};


modelrightApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/modelright.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/modelright/index',
		reloadOnSearch: false,
		controller : 'ModelRightIndexController'
	}).when('/modelright.json/:id', {
		templateUrl : function(params) {
			return '/modelright/get'
		},
		controller : 'ModelRightGetController',
		reloadOnSearch: false
	}).when('/modelright.json/:id/:modify', {
		templateUrl : function(params) {
			return '/modelright/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/modelright.json', {
		templateUrl : '/modelright/create',
		reloadOnSearch: false,
		controller : 'ModelRightGetController'
	});
	
} ]);
