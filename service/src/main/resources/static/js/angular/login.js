var mainApp = angular.module('mainApp', [ 'ngMaterial', 
		'ngAnimate',  'ngRoute', 'ngCookies', 'ngResource' ], function($compileProvider) {
	// configure new 'compile' directive by passing a directive
	// factory function. The factory function injects the '$compile'
	/*$compileProvider.directive('compile', function($compile) {
		// directive factory creates a link function
		return function(scope, element, attrs) {
			scope.$watch(function(scope) {
				// watch the 'compile' expression for changes
				return scope.$eval(attrs.compile);
			}, function(value) {
				// when the 'compile' expression changes
				// assign it into the current DOM
				element.html(value);

				// compile the new DOM and link it to the current
				// scope.
				// NOTE: we only compile .childNodes so that
				// we don't get into infinite loop compiling ourselves
				$compile(element.contents())(scope);
			});
		};
	});*/
})
/*
 * .config(['$provide', function ($provide) { $provide.decorator('$browser',
 * ['$delegate', function ($delegate) { $delegate.onUrlChange = function () {};
 * $delegate.url = function () { return ""}; return $delegate; }]); }])
 */
;
/*
 * .config([ '$routeProvider', function($routeProvider) {
 * 
 * }])
 */



mainApp.controller('MainController', function MainCtrl($scope, $rootScope,
		$http, $mdDialog, $compile, $cookies, $location, $route, $routeParams) {
		$scope.error = ($location.absUrl().indexOf("?error") > -1);
});