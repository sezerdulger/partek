
var serviceformApp = angular.module('serviceformApp', [ 'ngRoute', 
                                                        'serviceformControllers', 'serviceformFilters', 'serviceformServices' ]);

serviceformApp.fields={};

serviceformApp.fields.id={visibility:false};

serviceformApp.fields.customer={visibility:true};

serviceformApp.fields.customerTitle={visibility:false};

serviceformApp.fields.department={visibility:false};

serviceformApp.fields.address={visibility:false};

serviceformApp.fields.tel={visibility:false};

serviceformApp.fields.emails={visibility:false};

serviceformApp.fields.authorizedPerson={visibility:false};

serviceformApp.fields.requestDate={visibility:true};

serviceformApp.fields.serviceDate={visibility:true};

serviceformApp.fields.serviceType={visibility:false};

serviceformApp.fields.scope={visibility:false};

serviceformApp.fields.serviceDefinition={visibility:false};

serviceformApp.fields.usedMaterial={visibility:false};

serviceformApp.fields.contracted={visibility:true};

serviceformApp.fields.serviceDescription={visibility:false};

serviceformApp.fields.startTime={visibility:false};

serviceformApp.fields.finishTime={visibility:false};

serviceformApp.fields.duration={visibility:false};

serviceformApp.fields.pricing={visibility:true};

serviceformApp.fields.serviceFormPricing={visibility:false};

serviceformApp.fields.employee={visibility:false};

serviceformApp.fields.createdBy={visibility:false};

serviceformApp.fields.owner={visibility:false};

serviceformApp.fields.updatedBy={visibility:false};

serviceformApp.fields.createdAt={visibility:false};

serviceformApp.fields.updatedAt={visibility:false};

serviceformApp.fields.deleted={visibility:false};


serviceformApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/serviceform.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/serviceform/index',
		reloadOnSearch: false,
		controller : 'ServiceFormIndexController'
	}).when('/serviceform.json/:id', {
		templateUrl : function(params) {
			return '/serviceform/get'
		},
		controller : 'ServiceFormGetController',
		reloadOnSearch: false
	}).when('/serviceform.json/:id/:modify', {
		templateUrl : function(params) {
			return '/serviceform/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/serviceform.json', {
		templateUrl : '/serviceform/create',
		reloadOnSearch: false,
		controller : 'ServiceFormGetController'
	});
	
} ]);
