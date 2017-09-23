
var modelrightGetInterceptor = new Object();
modelrightGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ModelRight, $q, $log, $location, $route) {
};

modelrightGetInterceptor.initialized = false;

modelrightGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!modelrightGetInterceptor.initialized) {
		modelrightGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var modelrightIndexInterceptor = new Object();
modelrightIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ModelRight) {
};

modelrightIndexInterceptor.initialized = false;

modelrightIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!modelrightIndexInterceptor.initialized) {
		modelrightIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

modelrightGetInterceptor.idChanged = function(modelright) {
};

modelrightGetInterceptor.roleChanged = function(modelright) {
};

modelrightGetInterceptor.modelChanged = function(modelright) {
};

modelrightGetInterceptor.readChanged = function(modelright) {
};

modelrightGetInterceptor.createChanged = function(modelright) {
};

modelrightGetInterceptor.editChanged = function(modelright) {
};

modelrightGetInterceptor.deleteChanged = function(modelright) {
};

modelrightGetInterceptor.createdByChanged = function(modelright) {
};

modelrightGetInterceptor.ownerChanged = function(modelright) {
};

modelrightGetInterceptor.createdAtChanged = function(modelright) {
};

modelrightGetInterceptor.deletedChanged = function(modelright) {
};

*/
