
var employeeGetInterceptor = new Object();
employeeGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Employee, $q, $log, $location, $route) {
};

employeeGetInterceptor.initialized = false;

employeeGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!employeeGetInterceptor.initialized) {
		employeeGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var employeeIndexInterceptor = new Object();
employeeIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Employee) {
};

employeeIndexInterceptor.initialized = false;

employeeIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!employeeIndexInterceptor.initialized) {
		employeeIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

employeeGetInterceptor.idChanged = function(employee) {
};

employeeGetInterceptor.nameChanged = function(employee) {
};

employeeGetInterceptor.createdByChanged = function(employee) {
};

employeeGetInterceptor.ownerChanged = function(employee) {
};

employeeGetInterceptor.createdAtChanged = function(employee) {
};

employeeGetInterceptor.deletedChanged = function(employee) {
};

*/
