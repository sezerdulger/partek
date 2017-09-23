
var productGetInterceptor = new Object();
productGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Product, $q, $log, $location, $route) {
};

productGetInterceptor.initialized = false;

productGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!productGetInterceptor.initialized) {
		productGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var productIndexInterceptor = new Object();
productIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Product) {
};

productIndexInterceptor.initialized = false;

productIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!productIndexInterceptor.initialized) {
		productIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

productGetInterceptor.idChanged = function(product) {
};

productGetInterceptor.customerChanged = function(product) {
};

productGetInterceptor.createdByChanged = function(product) {
};

productGetInterceptor.ownerChanged = function(product) {
};

productGetInterceptor.createdAtChanged = function(product) {
};

productGetInterceptor.deletedChanged = function(product) {
};

*/
