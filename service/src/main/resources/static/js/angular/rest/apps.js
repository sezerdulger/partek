var mainApp = angular.module('mainApp', [ 'ngMaterial', 'ng-selectize', 'selectize',
		'ngAnimate', 'ngRoute', 'ngCookies', 'ngResource', 'ui.bootstrap',
		'serviceformApp', 'customerApp', 'roleApp', 'modelrightApp', 'userApp', 'settingsApp' ], function($compileProvider) {
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



mainApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/about', {
		templateUrl : '/about',
		reloadOnSearch: false,
	})
} ]);

mainApp.controller('DemoBasicCtrl', function DemoCtrl($scope, $rootScope,
		$http, $mdDialog, $compile, $cookies, $location, $route, ServiceForm) {
	$rootScope.container = "123";
	this.settings = {
		printLayout : true,
		showRuler : true,
		showSpellingSuggestions : true,
		presentationMode : 'edit'
	};
	this.sampleAction = function(name, ev) {
		/*
		 * $mdDialog.show($mdDialog.alert().title(name).textContent( 'You
		 * triggered the "' + name + '" action').ok('Great') .targetEvent(ev));
		 */
		// $location.path(name);
		// $scope.container = "afdsaf";
		/*
		 * $http.get(name).then(function(response) { $scope.container =
		 * response.data; });
		 */

		// $scope.templateUrl = '/serviceform/index';
	};

	/*
	 * $scope.$watch('currentPage + numPerPage', function() {
	 * console.log("changed"); //$location.search('page', $scope.currentPage);
	 * console.log("page changedto " + $scope.currentPage); $scope.formlist =
	 * ServiceForm.index.query({page: $scope.currentPage, limit: 10}); });
	 */

});

mainApp.controller('MainController', function MainCtrl($scope, $rootScope,
		$http, $mdDialog, $compile, $cookies, $location, $route, $mdSidenav, $log) {
	$scope.menuItems=[];
	$scope.adminMenuItems=[];
	var forms = ["serviceform", "customer", "user", "role", "modelright"];
	var formRoles;
	$http.get("/getrights").then(function(response) {
		formRoles = response.data;
		//console.log(formRoles);
		angular.forEach(forms, function(form, index) {
			$scope.menuItems[index] = new Object();
			$scope.menuItems[index].form = form;
			$scope.menuItems[index].text = formTexts[form];
			$scope.menuItems[index].newhref = "/" + form + ".json";
			$scope.menuItems[index].indexhref = "/" + form + ".json/page/1/limit/10/query/none";
			$scope.menuItems[index].roles = formRoles[form];
		});
		$rootScope.userFormRoles = [];
		$http.get("/getsecureuser").then(function(response) {
			$rootScope.userdetails = response.data;
			
			angular.forEach(formRoles, function(v, k) {
				//console.log(formRoles[k]);
				//console.log($rootScope.userdetails.user.role.title);
				if (formRoles[k].indexOf($rootScope.userdetails.user.role.title) > -1) {
					$rootScope.userFormRoles[k] = true;
					//console.log("true");
				}
			});
		});
	});
	
	var formTexts = {"serviceform": "Service Formu", "customer": "Müşteri",
			"user": "Kullanıcı", "role": "Rol", "modelright": "İzinler"};
	
	
	$rootScope.selectResultMethod = undefined;
	$rootScope.selectRelation = function(selected) {
		$rootScope.selectResultMethod(selected);
		$rootScope.hideModal();
		
	};
	$rootScope.hideModal = function() {
		var $modal = $("#largeModal");
		$modal.modal("hide");
	}
	$scope.go = function(path) {
		$location.path(path, true);
	};
	
	var $modal = $("#largeModal");
	$modal.modal("hide").on("hidden.bs.modal", function($event) {
		console.log("root hidden");
		
		$rootScope.dialogTemplate = "";
	});
	
	$scope.toggleLeft = buildToggler("left");
	$scope.isOpenLeft = function(){
       return $mdSidenav("left").isOpen();
    };
    
    $rootScope.translate = function(item, assignItem, assignValue) {
    	$http.get("/translate/" + item + "/").then(function(response) {
    		assignItem[assignValue] = response.data.data;
    	});
    };
	
	function buildToggler(navID) {
	      return function() {
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      }
	};
	
	$scope.checkDeletedStatus = function($event, status) {
		if (status) {
			$scope.showAlert($event, "Silinmiş form", "Bu form artık geçersizdir.");
			$event.stopPropogation();
			return false;
		}
		var href = $($event.target).data("href");
		$location.path(href);
	};
	
	$scope.showAlert = function(event, title, content) {
		$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#maindiv')))
				.clickOutsideToClose(true)
				.title(title)
				.textContent(content)
				.ariaLabel("AlertDialog")
				.ok("Tamam")
				.targetEvent(event)
		);
	};
	
	$scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
      ev.stopPropagation();
      return false;
    };
	
/*
	this.getIndex = function(url, template) {
		$http.get(url, template).then(function(response) {
			$rootScope.template = template;
		});
	};

	this.getCreate = function(url, template) {
		$http.get(url, template).then(function(response) {
			$rootScope.template = template;
		});
	};*/
});

mainApp.controller('NavController', function MainCtrl($scope, $rootScope,
		$http, $mdDialog, $compile, $cookies, $location, $route, $mdSidenav, $log) {
	$scope.nav = function(path) {
		$location.path(path, true);
		$scope.close();
	};
	
	$scope.close = function () {
      $mdSidenav("left").close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
});