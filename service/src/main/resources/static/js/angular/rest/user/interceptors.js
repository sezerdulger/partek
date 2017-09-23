
var userGetInterceptor = new Object();
userGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		User, $q, $log, $location, $route) {
};

userGetInterceptor.initialized = false;

userGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!userGetInterceptor.initialized) {
		userGetInterceptor.initialized = true;
	}
	else {
		
	}
};

var userIndexInterceptor = new Object();
userIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, User) {
};

userIndexInterceptor.initialized = false;

userIndexInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	if (!userIndexInterceptor.initialized) {
		userIndexInterceptor.initialized = true;
	}
	else {
		
	}
};

/*

userGetInterceptor.idChanged = function(user) {
};

userGetInterceptor.roleChanged = function(user) {
};

userGetInterceptor.usernameChanged = function(user) {
};

userGetInterceptor.passwordChanged = function(user) {
};

userGetInterceptor.activeChanged = function(user) {
};

userGetInterceptor.createdAtChanged = function(user) {
};

userGetInterceptor.deletedChanged = function(user) {
};

*/
