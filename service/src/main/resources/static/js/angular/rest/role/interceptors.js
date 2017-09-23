
var roleGetInterceptor = new Object();
roleGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Role, $q, $log, $location, $route) {
};

roleGetInterceptor.initialized = false;

roleGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!roleGetInterceptor.initialized) {
		roleGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var roleIndexInterceptor = new Object();
roleIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Role) {
};

roleIndexInterceptor.initialized = false;

roleIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!roleIndexInterceptor.initialized) {
		roleIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

roleGetInterceptor.idChanged = function(role) {
};

roleGetInterceptor.titleChanged = function(role) {
};

roleGetInterceptor.createdByChanged = function(role) {
};

roleGetInterceptor.ownerChanged = function(role) {
};

roleGetInterceptor.createdAtChanged = function(role) {
};

roleGetInterceptor.deletedChanged = function(role) {
};

*/
