
var serviceformpricingGetInterceptor = new Object();
serviceformpricingGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceFormPricing, $q, $log, $location, $route) {
	window.history.back();
};

serviceformpricingGetInterceptor.initialized = false;

serviceformpricingGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceFormPricing, $q, $log, $location, $route) {
	if (!serviceformpricingGetInterceptor.initialized) {
		serviceformpricingGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var serviceformpricingIndexInterceptor = new Object();
serviceformpricingIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ServiceFormPricing) {
};

serviceformpricingIndexInterceptor.initialized = false;

serviceformpricingIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceFormPricing, $q, $log, $location, $route) {
	if (!serviceformpricingIndexInterceptor.initialized) {
		serviceformpricingIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

serviceformpricingGetInterceptor.idChanged = function(serviceformpricing) {
};

serviceformpricingGetInterceptor.titleChanged = function(serviceformpricing) {
};

serviceformpricingGetInterceptor.createdAtChanged = function(serviceformpricing) {
};

serviceformpricingGetInterceptor.createdByChanged = function(serviceformpricing) {
};

serviceformpricingGetInterceptor.deletedChanged = function(serviceformpricing) {
};

serviceformpricingGetInterceptor.ownerChanged = function(serviceformpricing) {
};

serviceformpricingGetInterceptor.updatedAtChanged = function(serviceformpricing) {
};

serviceformpricingGetInterceptor.updatedByChanged = function(serviceformpricing) {
};

*/
