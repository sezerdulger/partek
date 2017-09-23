var mainApp=angular
  .module('mainApp', ['ngMaterial', 'ngCookies', 'LanguageModule'])
  .config(function($mdIconProvider) {
    $mdIconProvider
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  });
  /*.config([ '$routeProvider', function($routeProvider) {

  }])*/


  mainApp.controller('DemoBasicCtrl', function DemoCtrl($scope, $mdDialog) {
    this.sampleAction = function(name, ev) {
      /*$mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );*/
    	//$location.path(name);
    	//$route.reload();
    };
  });