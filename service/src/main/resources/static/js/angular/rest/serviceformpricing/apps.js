
var serviceformpricingApp = angular.module('serviceformpricingApp', [ 'ngRoute', 
                                                        'serviceformpricingControllers', 'serviceformpricingFilters', 'serviceformpricingServices' ]);

serviceformpricingApp.fields={};

serviceformpricingApp.fields.id={visibility:true};

serviceformpricingApp.fields.title={visibility:true};

serviceformpricingApp.fields.createdBy={visibility:false};

serviceformpricingApp.fields.owner={visibility:false};

serviceformpricingApp.fields.updatedBy={visibility:false};

serviceformpricingApp.fields.createdAt={visibility:false};

serviceformpricingApp.fields.updatedAt={visibility:false};

serviceformpricingApp.fields.deleted={visibility:false};


serviceformpricingApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/serviceformpricing.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/serviceformpricing/index',
		reloadOnSearch: false,
		controller : 'ServiceFormPricingIndexController'
	}).when('/serviceformpricing.json/:id', {
		templateUrl : function(params) {
			return '/serviceformpricing/get'
		},
		controller : 'ServiceFormPricingGetController',
		reloadOnSearch: false
	}).when('/serviceformpricing.json/:id/:modify', {
		templateUrl : function(params) {
			return '/serviceformpricing/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/serviceformpricing.json', {
		templateUrl : '/serviceformpricing/create',
		reloadOnSearch: false,
		controller : 'ServiceFormPricingGetController'
	});
	
} ]);
