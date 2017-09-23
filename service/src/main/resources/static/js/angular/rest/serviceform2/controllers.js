var serviceformControllers = angular.module('serviceformControllers', []);
/*
serviceformControllers.controller('MyModelController', function($scope, $http) {
	$http.get('serviceform/index.json').success(function(data) {
		$scope.serviceforms = data;
	});

	$scope.orderProp = 'name';
});

serviceformControllers.controller('MyModelDetailCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		function($scope, $routeParams, $http) {
			$http.get('/serviceform/get.json/' + $routeParams.id).success(
					function(data) {
						$scope.serviceform = data;
					});
		} ]);

*/
serviceformControllers.controller('ServiceFormIndexController', ['$scope', '$routeParams', '$log', '$location', 'ServiceForm',  
                                                                 function($scope, $routeParams, $log, $location, ServiceForm) {
	
	  //$scope.serviceforms = ServiceForm.index.query({page: $routeParams.page, limit: 10});
	  $scope.currentPage = $routeParams.page;
	  $scope.totalItems=64;
	  //$scope.serviceforms = ServiceForm.index.query({page: $scope.currentPage, limit: 10});
	  $scope.save = function(serviceform) {
    	  console.log("saving..." + serviceform.id);
    	  //$scope.master = $scope.serviceform;
          //$scope.serviceform.$save();
    	  ServiceForm.save.query(serviceform);
      };
	  //$scope.orderProp = 'name';

	  $scope.$watch('currentPage + numPerPage', function() {
		  console.log($location.url());
		  //$location.search('page', $scope.currentPage);
		  console.log("page changedto " + $scope.currentPage);
		  $scope.serviceforms = ServiceForm.index.query({page: $scope.currentPage, limit: 10});
		  $location.path('serviceform.json/page/' +$scope.currentPage+"/limit/10");
		  //window.history.replaceState('Object', 'Title', 'serviceform/page/' +$scope.currentPage+"/limit/10");
		});
	  //$location.path("serviceform").replace();
	  
	  $scope.getCustomer = function(ev) {
		    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'dialog1.tmpl.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: useFullScreen
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    });
		    $scope.$watch(function() {
		      return $mdMedia('xs') || $mdMedia('sm');
		    }, function(wantsFullScreen) {
		      $scope.customFullscreen = (wantsFullScreen === true);
		    });
		  };
	  
	}]);



serviceformControllers.controller('ServiceFormGetController', ['$scope', '$routeParams', 'ServiceForm', function($scope, $routeParams, ServiceForm) {
	  $scope.serviceform = ServiceForm.get({id: $routeParams.id}, function(serviceform) {
		  console.log($routeParams.id);
	      $scope.serviceform = serviceform;
	  });

	  $scope.setName = function(name) {
	    $scope.name = name;
	  };
	  
      
	  $scope.master = $scope.serviceform;
      $scope.update = function(serviceform) {
    	  console.log("saving...");
    	  //$scope.master = $scope.serviceform;
          $scope.serviceform.$save();
      };

      $scope.reset = function() {
        $scope.serviceform = angular.copy($scope.master);
      };

      //$scope.reset();
      
	}]);
