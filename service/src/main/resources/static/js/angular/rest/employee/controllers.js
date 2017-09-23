
var employeeControllers = angular.module('employeeControllers', []);

employeeControllers.controller('EmployeeIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'Employee',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, Employee) {
			$scope.fields=employeeApp.fields;
			
			$scope.showEmployee = function($event, employee) {
				// $rootScope.template = "/employee/get/" + employee.id;
				// $scope.employee =
				// Employee.get.query({id:employee.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/employee.json/" + employee.id);
			}
			
			$scope.removeEmployee = function(employee) {
				console.log(employee.id);
				Employee.remove.query({id:employee.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeEmployeeConfirmation = function($event, employee) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeEmployee(employee);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(employee) {
				Employee.save.query(employee);
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
				employeeIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, Employee);
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
					/*$http.get("/employee.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.employeelist = Employee.index.query({ page :
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
				
				Employee.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.employeelist =  response.restList;
					angular.forEach($scope.employeelist, function(item) {
						
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

						
					});
					$scope.totalItems = response.count;
					employeeIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, Employee);
				});
				$location.path("/employee.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

employeeControllers.controller('EmployeeSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'Employee',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Employee) {
		$scope.fields=employeeApp.fields;
		
		$scope.showEmployee = function($event, employee) {
			// $rootScope.template = "/employee/get/" + employee.id;
			// $scope.employee =
			// Employee.get.query({id:employee.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/employee.json/" + employee.id);
		}
		
		$scope.removeEmployee = function(employee) {
			console.log(employee.id);
			Employee.remove.query({id:employee.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeEmployeeConfirmation = function($event, employee) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeEmployee(employee);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(employee) {
			Employee.save.query(employee);
		};
		$scope.initializing=true;
		$scope.init = function() {
			employeeIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, Employee);
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
				/*$http.get("/employee.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.employeelist = Employee.index.query({ page :
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
			
			Employee.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.employeelist =  response.restList;
				angular.forEach($scope.employeelist, function(item) {
					
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

employeeControllers.controller('EmployeeGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Employee, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	employeeGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 Employee, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.employee = Employee.get.query({
			id : id
		}, function(employee) {
			$scope.employee = employee;
			
			
if ($scope.employee.createdAt != null) {
	$scope.employee.createdAt = new Date($scope.employee.createdAt);
}

if ($scope.employee.updatedAt != null) {
	$scope.employee.updatedAt = new Date($scope.employee.updatedAt);
}

			
			
		});
		
		

		$scope.master = $scope.employee;
		return $scope.employee;
	};

	$scope.create = function() {
		$scope.employee = Employee.create.query({},
				function(employee) {
					$scope.employee = employee;
					
					
				});

		$scope.master = $scope.employee;
		return $scope.employee;
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
		
		$scope.employee.$save().then(function(){
			employeeGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					Employee, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.employee = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("employee.id", function() {
		employeeGetInterceptor.idChanged($scope.employee);
	});

	$scope.$watch("employee.name", function() {
		employeeGetInterceptor.nameChanged($scope.employee);
	});

	$scope.$watch("employee.createdBy", function() {
		employeeGetInterceptor.createdByChanged($scope.employee);
	});

	$scope.$watch("employee.owner", function() {
		employeeGetInterceptor.ownerChanged($scope.employee);
	});

	$scope.$watch("employee.updatedBy", function() {
		employeeGetInterceptor.updatedByChanged($scope.employee);
	});

	$scope.$watch("employee.createdAt", function() {
		employeeGetInterceptor.createdAtChanged($scope.employee);
	});

	$scope.$watch("employee.updatedAt", function() {
		employeeGetInterceptor.updatedAtChanged($scope.employee);
	});

	$scope.$watch("employee.deleted", function() {
		employeeGetInterceptor.deletedChanged($scope.employee);
	});

	*/
});
