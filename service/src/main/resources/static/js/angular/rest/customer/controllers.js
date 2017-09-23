
var customerControllers = angular.module('customerControllers', []);

customerControllers.controller('CustomerIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'Customer',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, Customer) {
			$scope.fields=customerApp.fields;
			
			$scope.showCustomer = function($event, customer) {
				// $rootScope.template = "/customer/get/" + customer.id;
				// $scope.customer =
				// Customer.get.query({id:customer.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/customer.json/" + customer.id);
			}
			
			$scope.removeCustomer = function(customer) {
				console.log(customer.id);
				Customer.remove.query({id:customer.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeCustomerConfirmation = function($event, customer) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeCustomer(customer);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(customer) {
				Customer.save.query(customer);
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
				customerIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, Customer);
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
					/*$http.get("/customer.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.customerlist = Customer.index.query({ page :
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
				
				Customer.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.customerlist =  response.restList;
					angular.forEach($scope.customerlist, function(item) {
						
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

						
					});
					$scope.totalItems = response.count;
					customerIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, Customer);
				});
				$location.path("/customer.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

customerControllers.controller('CustomerSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'Customer',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Customer) {
		$scope.fields=customerApp.fields;
		
		$scope.showCustomer = function($event, customer) {
			// $rootScope.template = "/customer/get/" + customer.id;
			// $scope.customer =
			// Customer.get.query({id:customer.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/customer.json/" + customer.id);
		}
		
		$scope.removeCustomer = function(customer) {
			console.log(customer.id);
			Customer.remove.query({id:customer.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeCustomerConfirmation = function($event, customer) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeCustomer(customer);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(customer) {
			Customer.save.query(customer);
		};
		$scope.initializing=true;
		$scope.init = function() {
			customerIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, Customer);
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
				/*$http.get("/customer.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.customerlist = Customer.index.query({ page :
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
			
			Customer.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.customerlist =  response.restList;
				angular.forEach($scope.customerlist, function(item) {
					
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

customerControllers.controller('CustomerGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Customer, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	customerGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 Customer, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.customer = Customer.get.query({
			id : id
		}, function(customer) {
			$scope.customer = customer;
			
			
if ($scope.customer.createdAt != null) {
	$scope.customer.createdAt = new Date($scope.customer.createdAt);
}

if ($scope.customer.updatedAt != null) {
	$scope.customer.updatedAt = new Date($scope.customer.updatedAt);
}

			
			
		var unregister = $scope.$watch('customer.emails', function(x) {
				$(".myrestselect2").selectize({
					plugins: ['remove_button'],
					//create: true,
					create: function(input) {
				        return {
				            value: input,
				            text: input
				        }
				    },
					persist: false,
			 	});
				unregister();
			});

		});
		
		

		$scope.master = $scope.customer;
		return $scope.customer;
	};

	$scope.create = function() {
		$scope.customer = Customer.create.query({},
				function(customer) {
					$scope.customer = customer;
					
					
		var unregister = $scope.$watch('customer.emails', function(x) {
				$(".myrestselect2").selectize({
					plugins: ['remove_button'],
					//create: true,
					create: function(input) {
				        return {
				            value: input,
				            text: input
				        }
				    },
					persist: false,
			 	});
				unregister();
			});

				});

		$scope.master = $scope.customer;
		return $scope.customer;
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
		
	if ($scope.customer.emails!= null && !angular.isArray($scope.customer.emails)) {
		$scope.customer.emails = $scope.customer.emails.split(",");
	}

		$scope.customer.$save().then(function(){
			customerGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					Customer, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.customer = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("customer.id", function() {
		customerGetInterceptor.idChanged($scope.customer);
	});

	$scope.$watch("customer.title", function() {
		customerGetInterceptor.titleChanged($scope.customer);
	});

	$scope.$watch("customer.address", function() {
		customerGetInterceptor.addressChanged($scope.customer);
	});

	$scope.$watch("customer.tel", function() {
		customerGetInterceptor.telChanged($scope.customer);
	});

	$scope.$watch("customer.contracted", function() {
		customerGetInterceptor.contractedChanged($scope.customer);
	});

	$scope.$watch("customer.emails", function() {
		customerGetInterceptor.emailsChanged($scope.customer);
	});

	$scope.$watch("customer.authorizedPerson", function() {
		customerGetInterceptor.authorizedPersonChanged($scope.customer);
	});

	$scope.$watch("customer.createdBy", function() {
		customerGetInterceptor.createdByChanged($scope.customer);
	});

	$scope.$watch("customer.owner", function() {
		customerGetInterceptor.ownerChanged($scope.customer);
	});

	$scope.$watch("customer.updatedBy", function() {
		customerGetInterceptor.updatedByChanged($scope.customer);
	});

	$scope.$watch("customer.createdAt", function() {
		customerGetInterceptor.createdAtChanged($scope.customer);
	});

	$scope.$watch("customer.updatedAt", function() {
		customerGetInterceptor.updatedAtChanged($scope.customer);
	});

	$scope.$watch("customer.deleted", function() {
		customerGetInterceptor.deletedChanged($scope.customer);
	});

	*/
});
