var mainApp = angular.module('mainApp', ['ngMaterial', 'ngAnimate', 'ui.bootstrap', 'ngRoute', 'ngCookies', 'ngResource', 'serviceformApp'])
.config(function($mdIconProvider) {
    $mdIconProvider
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  });
  /*.config([ '$routeProvider', function($routeProvider) {

  }])*/


  mainApp.controller('DemoBasicCtrl', function DemoCtrl($scope, $mdDialog, $cookies, $location, $route) {
	  this.settings = {
		      printLayout: true,
		      showRuler: true,
		      showSpellingSuggestions: true,
		      presentationMode: 'edit'
		    };
		    this.sampleAction = function(name, ev) {
		      /*$mdDialog.show($mdDialog.alert()
		        .title(name)
		        .textContent('You triggered the "' + name + '" action')
		        .ok('Great')
		        .targetEvent(ev)
		      );*/
		    	//$location.path(name);
		    };
		    
		    
  });