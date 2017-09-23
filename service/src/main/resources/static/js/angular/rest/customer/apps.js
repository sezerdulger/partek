
var customerApp = angular.module('customerApp', [ 'ngRoute', 
                                                        'customerControllers', 'customerFilters', 'customerServices' ]);

customerApp.fields={};

customerApp.fields.id={visibility:false};

customerApp.fields.title={visibility:true};

customerApp.fields.address={visibility:false};

customerApp.fields.tel={visibility:false};

customerApp.fields.contracted={visibility:true};

customerApp.fields.emails={visibility:false};

customerApp.fields.authorizedPerson={visibility:false};

customerApp.fields.createdBy={visibility:false};

customerApp.fields.owner={visibility:false};

customerApp.fields.updatedBy={visibility:false};

customerApp.fields.createdAt={visibility:false};

customerApp.fields.updatedAt={visibility:false};

customerApp.fields.deleted={visibility:false};


customerApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/customer.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/customer/index',
		reloadOnSearch: false,
		controller : 'CustomerIndexController'
	}).when('/customer.json/:id', {
		templateUrl : function(params) {
			return '/customer/get'
		},
		controller : 'CustomerGetController',
		reloadOnSearch: false
	}).when('/customer.json/:id/:modify', {
		templateUrl : function(params) {
			return '/customer/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/customer.json', {
		templateUrl : '/customer/create',
		reloadOnSearch: false,
		controller : 'CustomerGetController'
	});
	
} ]);
