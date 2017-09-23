
var employeeApp = angular.module('employeeApp', [ 'ngRoute', 
                                                        'employeeControllers', 'employeeFilters', 'employeeServices' ]);

employeeApp.fields={};

employeeApp.fields.id={visibility:false};

employeeApp.fields.name={visibility:false};

employeeApp.fields.createdBy={visibility:false};

employeeApp.fields.owner={visibility:false};

employeeApp.fields.updatedBy={visibility:false};

employeeApp.fields.createdAt={visibility:false};

employeeApp.fields.updatedAt={visibility:false};

employeeApp.fields.deleted={visibility:false};


employeeApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/employee.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/employee/index',
		reloadOnSearch: false,
		controller : 'EmployeeIndexController'
	}).when('/employee.json/:id', {
		templateUrl : function(params) {
			return '/employee/get'
		},
		controller : 'EmployeeGetController',
		reloadOnSearch: false
	}).when('/employee.json/:id/:modify', {
		templateUrl : function(params) {
			return '/employee/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/employee.json', {
		templateUrl : '/employee/create',
		reloadOnSearch: false,
		controller : 'EmployeeGetController'
	});
	
} ]);
