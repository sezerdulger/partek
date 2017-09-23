
var roleControllers = angular.module('roleControllers', []);

roleControllers.controller('RoleIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'Role',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, Role) {
			$scope.fields=roleApp.fields;
			
			$scope.showRole = function($event, role) {
				// $rootScope.template = "/role/get/" + role.id;
				// $scope.role =
				// Role.get.query({id:role.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/role.json/" + role.id);
			}
			
			$scope.removeRole = function(role) {
				console.log(role.id);
				Role.remove.query({id:role.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeRoleConfirmation = function($event, role) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeRole(role);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(role) {
				Role.save.query(role);
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
				roleIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, Role);
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
					/*$http.get("/role.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.rolelist = Role.index.query({ page :
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
				
				Role.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.rolelist =  response.restList;
					angular.forEach($scope.rolelist, function(item) {
						
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

						
					});
					$scope.totalItems = response.count;
					roleIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, Role);
				});
				$location.path("/role.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

roleControllers.controller('RoleSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'Role',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Role) {
		$scope.fields=roleApp.fields;
		
		$scope.showRole = function($event, role) {
			// $rootScope.template = "/role/get/" + role.id;
			// $scope.role =
			// Role.get.query({id:role.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/role.json/" + role.id);
		}
		
		$scope.removeRole = function(role) {
			console.log(role.id);
			Role.remove.query({id:role.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeRoleConfirmation = function($event, role) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeRole(role);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(role) {
			Role.save.query(role);
		};
		$scope.initializing=true;
		$scope.init = function() {
			roleIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, Role);
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
				/*$http.get("/role.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.rolelist = Role.index.query({ page :
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
			
			Role.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.rolelist =  response.restList;
				angular.forEach($scope.rolelist, function(item) {
					
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

				});
				$scope.totalItems = response.count;
			});
		};
	} ]);

roleControllers.controller('RoleGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Role, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	roleGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 Role, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.role = Role.get.query({
			id : id
		}, function(role) {
			$scope.role = role;
			
			
if ($scope.role.createdAt != null) {
	$scope.role.createdAt = new Date($scope.role.createdAt);
}

if ($scope.role.updatedAt != null) {
	$scope.role.updatedAt = new Date($scope.role.updatedAt);
}

			
			
		});
		
		

		$scope.master = $scope.role;
		return $scope.role;
	};

	$scope.create = function() {
		$scope.role = Role.create.query({},
				function(role) {
					$scope.role = role;
					
					
				});

		$scope.master = $scope.role;
		return $scope.role;
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

	

	$scope.save = function() {
		
		$scope.role.$save().then(function(){
			roleGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					Role, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.role = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("role.id", function() {
		roleGetInterceptor.idChanged($scope.role);
	});

	$scope.$watch("role.title", function() {
		roleGetInterceptor.titleChanged($scope.role);
	});

	$scope.$watch("role.createdBy", function() {
		roleGetInterceptor.createdByChanged($scope.role);
	});

	$scope.$watch("role.owner", function() {
		roleGetInterceptor.ownerChanged($scope.role);
	});

	$scope.$watch("role.updatedBy", function() {
		roleGetInterceptor.updatedByChanged($scope.role);
	});

	$scope.$watch("role.createdAt", function() {
		roleGetInterceptor.createdAtChanged($scope.role);
	});

	$scope.$watch("role.updatedAt", function() {
		roleGetInterceptor.updatedAtChanged($scope.role);
	});

	$scope.$watch("role.deleted", function() {
		roleGetInterceptor.deletedChanged($scope.role);
	});

	*/
});
