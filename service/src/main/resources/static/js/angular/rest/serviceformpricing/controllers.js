
var serviceformpricingControllers = angular.module('serviceformpricingControllers', []);

serviceformpricingControllers.controller('ServiceFormPricingIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'ServiceFormPricing',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, ServiceFormPricing) {
			$scope.fields=serviceformpricingApp.fields;
			
			$scope.showServiceFormPricing = function($event, serviceformpricing) {
				// $rootScope.template = "/serviceformpricing/get/" + serviceformpricing.id;
				// $scope.serviceformpricing =
				// ServiceFormPricing.get.query({id:serviceformpricing.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/serviceformpricing.json/" + serviceformpricing.id);
			}
			
			$scope.removeServiceFormPricing = function(serviceformpricing) {
				console.log(serviceformpricing.id);
				ServiceFormPricing.remove.query({id:serviceformpricing.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeServiceFormPricingConfirmation = function($event, serviceformpricing) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeServiceFormPricing(serviceformpricing);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(serviceformpricing) {
				ServiceFormPricing.save.query(serviceformpricing);
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
				serviceformpricingIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, ServiceFormPricing);
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
					/*$http.get("/serviceformpricing.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.serviceformpricinglist = ServiceFormPricing.index.query({ page :
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
				
				ServiceFormPricing.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.serviceformpricinglist =  response.restList;
					angular.forEach($scope.serviceformpricinglist, function(item) {
						
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

						
					});
					$scope.totalItems = response.count;
					serviceformpricingIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, ServiceFormPricing);
				});
				$location.path("/serviceformpricing.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

serviceformpricingControllers.controller('ServiceFormPricingSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'ServiceFormPricing',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ServiceFormPricing) {
		$scope.fields=serviceformpricingApp.fields;
		
		$scope.showServiceFormPricing = function($event, serviceformpricing) {
			// $rootScope.template = "/serviceformpricing/get/" + serviceformpricing.id;
			// $scope.serviceformpricing =
			// ServiceFormPricing.get.query({id:serviceformpricing.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/serviceformpricing.json/" + serviceformpricing.id);
		}
		
		$scope.removeServiceFormPricing = function(serviceformpricing) {
			console.log(serviceformpricing.id);
			ServiceFormPricing.remove.query({id:serviceformpricing.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeServiceFormPricingConfirmation = function($event, serviceformpricing) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeServiceFormPricing(serviceformpricing);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(serviceformpricing) {
			ServiceFormPricing.save.query(serviceformpricing);
		};
		$scope.initializing=true;
		$scope.init = function() {
			serviceformpricingIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, ServiceFormPricing);
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
				/*$http.get("/serviceformpricing.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.serviceformpricinglist = ServiceFormPricing.index.query({ page :
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
			
			ServiceFormPricing.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.serviceformpricinglist =  response.restList;
				angular.forEach($scope.serviceformpricinglist, function(item) {
					
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

serviceformpricingControllers.controller('ServiceFormPricingGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceFormPricing, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	serviceformpricingGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 ServiceFormPricing, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.serviceformpricing = ServiceFormPricing.get.query({
			id : id
		}, function(serviceformpricing) {
			$scope.serviceformpricing = serviceformpricing;
			
			
if ($scope.serviceformpricing.createdAt != null) {
	$scope.serviceformpricing.createdAt = new Date($scope.serviceformpricing.createdAt);
}

if ($scope.serviceformpricing.updatedAt != null) {
	$scope.serviceformpricing.updatedAt = new Date($scope.serviceformpricing.updatedAt);
}

			
			
		});
		
		

		$scope.master = $scope.serviceformpricing;
		return $scope.serviceformpricing;
	};

	$scope.create = function() {
		$scope.serviceformpricing = ServiceFormPricing.create.query({},
				function(serviceformpricing) {
					$scope.serviceformpricing = serviceformpricing;
					
					
				});

		$scope.master = $scope.serviceformpricing;
		return $scope.serviceformpricing;
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
		
		$scope.serviceformpricing.$save().then(function(){
			serviceformpricingGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					ServiceFormPricing, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.serviceformpricing = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("serviceformpricing.id", function() {
		serviceformpricingGetInterceptor.idChanged($scope.serviceformpricing);
	});

	$scope.$watch("serviceformpricing.title", function() {
		serviceformpricingGetInterceptor.titleChanged($scope.serviceformpricing);
	});

	$scope.$watch("serviceformpricing.createdBy", function() {
		serviceformpricingGetInterceptor.createdByChanged($scope.serviceformpricing);
	});

	$scope.$watch("serviceformpricing.owner", function() {
		serviceformpricingGetInterceptor.ownerChanged($scope.serviceformpricing);
	});

	$scope.$watch("serviceformpricing.updatedBy", function() {
		serviceformpricingGetInterceptor.updatedByChanged($scope.serviceformpricing);
	});

	$scope.$watch("serviceformpricing.createdAt", function() {
		serviceformpricingGetInterceptor.createdAtChanged($scope.serviceformpricing);
	});

	$scope.$watch("serviceformpricing.updatedAt", function() {
		serviceformpricingGetInterceptor.updatedAtChanged($scope.serviceformpricing);
	});

	$scope.$watch("serviceformpricing.deleted", function() {
		serviceformpricingGetInterceptor.deletedChanged($scope.serviceformpricing);
	});

	*/
});
