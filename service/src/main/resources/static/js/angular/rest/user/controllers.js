
var userControllers = angular.module('userControllers', []);

userControllers.controller('UserIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'User',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, User) {
			$scope.fields=userApp.fields;
			
			$scope.showUser = function($event, user) {
				// $rootScope.template = "/user/get/" + user.id;
				// $scope.user =
				// User.get.query({id:user.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/user.json/" + user.id);
			}
			
			$scope.removeUser = function(user) {
				console.log(user.id);
				User.remove.query({id:user.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeUserConfirmation = function($event, user) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeUser(user);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(user) {
				User.save.query(user);
			};
			
			$scope.selectFilterChanged = function(fieldname) {
				if ($scope.filter[fieldname]=="optionclear") {
					$scope.filter[fieldname] = null;
					console.log("optionclear");
				}
				$scope.index();
			};
			
			$scope.initializing=true;
			$scope.init = function() {
				userIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, User);
				$scope.limit = 10;
				var query = "";
				if ($routeParams.page == undefined || $routeParams.page == "NaN") {
					$scope.currentPage = 1;
				}
				else {
					$scope.currentPage = $routeParams.page;
					query = $routeParams.query;
				}
				var queries = query.split(",");
				var newquery = "";
				$scope.filter = new Object();
				
				angular.forEach(queries, function(q, key) {
					var field = q.split("=")[0];
					var value = q.split("=")[1];
					
					if (field != "" && field != undefined && field != "none") {
						if (q.indexOf("-") > -1) {
							$scope.filter[field] = new Object();
							$scope.filter[field].min = new Date(value.split("-")[0]);
							if (value.split("-")[1] != "") {
								$scope.filter[field].max = new Date(value.split("-")[1]);
							}
							
							console.log("month:" + $scope.filter[field].min.getMonth());
						}
						else {
							if (value=="true") {
								$scope.filter[field] = true;	
							}
							else if (value=="false"){
								$scope.filter[field] = false;
							}
							else {
								$scope.filter[field] = value;
							}
						}
					}
				});
				$scope.$watch('currentPage + numPerPage', function() {
					/*$http.get("/user.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.userlist = User.index.query({ page :
					 * $scope.currentPage - 1, limit : $scope.limit });
					 */
					$scope.index();
					
					
				});
			};
			
			$scope.index = function() {
				var page = $scope.currentPage - 1;
				var query = $routeParams.query;
				
				var newquery = "";
				console.log($scope.filter);
				angular.forEach($scope.filter, function(q, key) {
					if ((q != undefined && q != "" && q != null) || q===true || q===false) {
						console.log("key:" + key);
						console.log("value:" + q);
						console.log("min:" + q.min);
						if (q.min != undefined && q.min != null && q.min != "") {
							q.min = new Date(q.min);
							var minDate = q.min.getFullYear() + "." + (q.min.getMonth() + 1) + "." + q.min.getDate();
							
							newquery += key + "=" + minDate + "-";
							if (q.max != undefined && q.max != null && q.max != "") {
								q.max = new Date(q.max);
								var maxDate = q.max.getFullYear() + "." + (q.max.getMonth() + 1) + "." + q.max.getDate();
								newquery += maxDate + ",";
							}
							else {
								newquery += ",";
							}
						}
						else if (q.max != undefined && q.max != null && q.max != "") {
							q.max = new Date(q.max);
							var maxDate = q.max.getFullYear() + "." + (q.max.getMonth() + 1) + "." + q.max.getDate();
							newquery += key + "=" + maxDate + "-,";
						}
						else if (!(q instanceof Object)) {
							if (q===true) {
								newquery += key + "=true,"; 
							}
							else if (q===false){
								newquery += key + "=false,";
							}
							else {
								newquery += key + "=" + q + ",";
							}
						}
						console.log("q instanceof Object: " + (q instanceof Object));
					}
				});
				
				if (newquery == "") {
					newquery = "none";
				}
				else {
					console.log("newquery:" + newquery);
				}
				
				User.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.userlist =  response.restList;
					angular.forEach($scope.userlist, function(item) {
						
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

						
					});
					$scope.totalItems = response.count;
					userIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, User);
				});
				$location.path("/user.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

userControllers.controller('UserSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'User',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, User) {
		$scope.fields=userApp.fields;
		
		$scope.showUser = function($event, user) {
			// $rootScope.template = "/user/get/" + user.id;
			// $scope.user =
			// User.get.query({id:user.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/user.json/" + user.id);
		}
		
		$scope.removeUser = function(user) {
			console.log(user.id);
			User.remove.query({id:user.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeUserConfirmation = function($event, user) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeUser(user);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(user) {
			User.save.query(user);
		};
		$scope.initializing=true;
		$scope.init = function() {
			userIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, User);
			$scope.limit = 10;
			var query = "";
			if ($routeParams.page == undefined || $routeParams.page == "NaN") {
				$scope.currentPage = 1;
			}
			else {
				$scope.currentPage = $routeParams.page;
				query = $routeParams.query;
			}
			var queries = query.split(",");
			var newquery = "";
			$scope.filter = new Object();
			
			angular.forEach(queries, function(q, key) {
				var field = q.split("=")[0];
				var value = q.split("=")[1];
				
				if (field != "" && field != undefined && field != "none") {
					if (q.indexOf("-") > -1) {
						$scope.filter[field] = new Object();
						$scope.filter[field].min = new Date(value.split("-")[0]);
						if (value.split("-")[1] != "") {
							$scope.filter[field].max = new Date(value.split("-")[1]);
						}
						
						console.log("month:" + $scope.filter[field].min.getMonth());
					}
					else {
						$scope.filter[field] = value;
					}
				}
			});
			$scope.$watch('currentPage + numPerPage', function() {
				/*$http.get("/user.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.userlist = User.index.query({ page :
				 * $scope.currentPage - 1, limit : $scope.limit });
				 */
				$scope.index();
			});
		};
		
		$scope.index = function() {
			var page = $scope.currentPage - 1;
			var query = $routeParams.query;
			
			var newquery = "";
			console.log($scope.filter);
			angular.forEach($scope.filter, function(q, key) {
				if (q != undefined && q != "" && q != null) {
					console.log("key:" + key);
					console.log("value:" + q);
					console.log("min:" + q.min);
					if (q.min != undefined && q.min != null && q.min != "") {
						q.min = new Date(q.min);
						var minDate = q.min.getFullYear() + "." + (q.min.getMonth() + 1) + "." + q.min.getDate();
						
						newquery += key + "=" + minDate + "-";
						if (q.max != undefined && q.max != null && q.max != "") {
							q.max = new Date(q.max);
							var maxDate = q.max.getFullYear() + "." + (q.max.getMonth() + 1) + "." + q.max.getDate();
							newquery += maxDate + ",";
						}
						else {
							newquery += ",";
						}
					}
					else if (q.max != undefined && q.max != null && q.max != "") {
						q.max = new Date(q.max);
						var maxDate = q.max.getFullYear() + "." + (q.max.getMonth() + 1) + "." + q.max.getDate();
						newquery += key + "=" + maxDate + "-,";
					}
					else if (!(q instanceof Object)) {
						newquery += key + "=" + q + ",";
					}
					console.log("q instanceof Object: " + (q instanceof Object));
				}
			});
			
			if (newquery == "") {
				newquery = "none";
			}
			else {
				console.log("newquery:" + newquery);
			}
			
			User.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.userlist =  response.restList;
				angular.forEach($scope.userlist, function(item) {
					
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

				});
				$scope.totalItems = response.count;
			});
		};
	} ]);

userControllers.controller('UserGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		User, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	userGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 User, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.user = User.get.query({
			id : id
		}, function(user) {
			$scope.user = user;
			
			
if ($scope.user.createdAt != null) {
	$scope.user.createdAt = new Date($scope.user.createdAt);
}

			
			
		});
		
		

		$scope.master = $scope.user;
		return $scope.user;
	};

	$scope.create = function() {
		$scope.user = User.create.query({},
				function(user) {
					$scope.user = user;
					
					
				});

		$scope.master = $scope.user;
		return $scope.user;
	};

	$scope.init = function() {
		var id = $routeParams.id;
		console.log(id);
		if (id != undefined) {
			$scope.get(id);
		} else {
			$scope.create();
		}
	};

	$scope.showModal = function(template, selectedMethod) {
		var $modal = $("#largeModal");
		$modal.modal('show').on('shown.bs.modal', function($event) {
			console.log("shown");
			$rootScope.selectResultMethod = selectedMethod;
		}).on('hidden.bs.modal', function($event) {
		});

		$rootScope.dialogTemplate = template;
	};

	
	$scope.showroleList = function($event) {
		var url = $($event.currentTarget).data("url");
		var template = $($event.currentTarget).data("template");
		var id = $($event.currentTarget).data("id");
		$scope.showModal(template, $scope.selectrole);
	};
	
	$scope.selectrole = function(role) {
		$scope.user.role = role;
	};

	$scope.deleterole = function() {
		$scope.user.role = null;
	};


	$scope.save = function() {
		
		$scope.user.$save().then(function(){
			userGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					User, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("user.id", function() {
		userGetInterceptor.idChanged($scope.user);
	});

	$scope.$watch("user.role", function() {
		userGetInterceptor.roleChanged($scope.user);
	});

	$scope.$watch("user.fullname", function() {
		userGetInterceptor.fullnameChanged($scope.user);
	});

	$scope.$watch("user.username", function() {
		userGetInterceptor.usernameChanged($scope.user);
	});

	$scope.$watch("user.password", function() {
		userGetInterceptor.passwordChanged($scope.user);
	});

	$scope.$watch("user.active", function() {
		userGetInterceptor.activeChanged($scope.user);
	});

	$scope.$watch("user.createdAt", function() {
		userGetInterceptor.createdAtChanged($scope.user);
	});

	$scope.$watch("user.deleted", function() {
		userGetInterceptor.deletedChanged($scope.user);
	});

	*/
});
