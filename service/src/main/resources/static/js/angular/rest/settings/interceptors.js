
var settingsGetInterceptor = new Object();
settingsGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Settings, $q, $log, $location, $route) {
	window.history.back();
};

settingsGetInterceptor.initialized = false;

settingsGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!settingsGetInterceptor.initialized) {
		settingsGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var settingsIndexInterceptor = new Object();
settingsIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Settings) {
};

settingsIndexInterceptor.initialized = false;

settingsIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!settingsIndexInterceptor.initialized) {
		settingsIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

settingsGetInterceptor.idChanged = function(settings) {
};

settingsGetInterceptor.languageChanged = function(settings) {
};

settingsGetInterceptor.createdByChanged = function(settings) {
};

settingsGetInterceptor.ownerChanged = function(settings) {
};

settingsGetInterceptor.createdAtChanged = function(settings) {
};

settingsGetInterceptor.deletedChanged = function(settings) {
};

*/
