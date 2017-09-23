
var customerGetInterceptor = new Object();
customerGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Customer, $q, $log, $location, $route) {
	window.history.back();
};

customerGetInterceptor.initialized = false;

customerGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!customerGetInterceptor.initialized) {
		customerGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var customerIndexInterceptor = new Object();
customerIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Customer) {
};

customerIndexInterceptor.initialized = false;
customerIndexInterceptor.indexLoaded = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Customer) {
	
};
customerIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Customer, $q, $log, $location, $route) {
	
	if (!customerIndexInterceptor.initialized) {
		customerIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

customerGetInterceptor.idChanged = function(customer) {
};

customerGetInterceptor.titleChanged = function(customer) {
};

customerGetInterceptor.addressChanged = function(customer) {
};

customerGetInterceptor.telChanged = function(customer) {
};

customerGetInterceptor.emailsChanged = function(customer) {
};

customerGetInterceptor.createdByChanged = function(customer) {
};

customerGetInterceptor.ownerChanged = function(customer) {
};

customerGetInterceptor.createdAtChanged = function(customer) {
};

customerGetInterceptor.deletedChanged = function(customer) {
};

*/
