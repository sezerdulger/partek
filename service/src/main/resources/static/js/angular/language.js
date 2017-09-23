var langModule = angular.module('LanguageModule', []);
langModule.controller('LanguageController', function($scope, $location, $http, $cookies) {
    $scope.changeLanguage = function (ev) {
    	//$location.path("lang=" + $scope.selectedLang);
    	//$http.get("partek.html?lang=" + $scope.selectedLang);
    	//$route.reload();
    	//window.location.reload();
    	$cookies.put("lang", $scope.selectedLang);
    	//$translation.use($scope.selectedLang);
    };
      $scope.langs = [
          "en",
          "tr"
      ];
      console.log($cookies.get("lang"));
      $scope.selectedLang = $cookies.get("lang") || "en";
      
    });