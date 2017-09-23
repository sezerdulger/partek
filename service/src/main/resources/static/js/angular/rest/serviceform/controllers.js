
var serviceformControllers = angular.module('serviceformControllers', []);

serviceformControllers.controller('ServiceFormIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'ServiceForm',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, ServiceForm) {
			$scope.fields=serviceformApp.fields;
			
			$scope.showServiceForm = function($event, serviceform) {
				// $rootScope.template = "/serviceform/get/" + serviceform.id;
				// $scope.serviceform =
				// ServiceForm.get.query({id:serviceform.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/serviceform.json/" + serviceform.id);
			}
			
			$scope.removeServiceForm = function(serviceform) {
				console.log(serviceform.id);
				ServiceForm.remove.query({id:serviceform.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeServiceFormConfirmation = function($event, serviceform) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeServiceForm(serviceform);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(serviceform) {
				ServiceForm.save.query(serviceform);
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
				serviceformIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, ServiceForm);
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
					/*$http.get("/serviceform.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.serviceformlist = ServiceForm.index.query({ page :
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
				
				ServiceForm.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.serviceformlist =  response.restList;
					angular.forEach($scope.serviceformlist, function(item) {
						
if (item.requestDate != null) {
	item.requestDate = new Date(item.requestDate);
}

if (item.serviceDate != null) {
	item.serviceDate = new Date(item.serviceDate);
}

if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

						
if (item.scope != null) {
	 $rootScope.translate(item.scope, item, "translatedscope");
}

if (item.pricing != null) {
	 $rootScope.translate(item.pricing, item, "translatedpricing");
}

					});
					$scope.totalItems = response.count;
					serviceformIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, ServiceForm);
				});
				$location.path("/serviceform.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

serviceformControllers.controller('ServiceFormSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'ServiceForm',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ServiceForm) {
		$scope.fields=serviceformApp.fields;
		
		$scope.showServiceForm = function($event, serviceform) {
			// $rootScope.template = "/serviceform/get/" + serviceform.id;
			// $scope.serviceform =
			// ServiceForm.get.query({id:serviceform.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/serviceform.json/" + serviceform.id);
		}
		
		$scope.removeServiceForm = function(serviceform) {
			console.log(serviceform.id);
			ServiceForm.remove.query({id:serviceform.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeServiceFormConfirmation = function($event, serviceform) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeServiceForm(serviceform);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(serviceform) {
			ServiceForm.save.query(serviceform);
		};
		$scope.initializing=true;
		$scope.init = function() {
			serviceformIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, ServiceForm);
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
				/*$http.get("/serviceform.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.serviceformlist = ServiceForm.index.query({ page :
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
			
			ServiceForm.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.serviceformlist =  response.restList;
				angular.forEach($scope.serviceformlist, function(item) {
					
if (item.requestDate != null) {
	item.requestDate = new Date(item.requestDate);
}

if (item.serviceDate != null) {
	item.serviceDate = new Date(item.serviceDate);
}

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

serviceformControllers.controller('ServiceFormGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	serviceformGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 ServiceForm, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.serviceform = ServiceForm.get.query({
			id : id
		}, function(serviceform) {
			$scope.serviceform = serviceform;
			
			
if ($scope.serviceform.requestDate != null) {
	$scope.serviceform.requestDate = new Date($scope.serviceform.requestDate);
}

if ($scope.serviceform.serviceDate != null) {
	$scope.serviceform.serviceDate = new Date($scope.serviceform.serviceDate);
}

if ($scope.serviceform.createdAt != null) {
	$scope.serviceform.createdAt = new Date($scope.serviceform.createdAt);
}

if ($scope.serviceform.updatedAt != null) {
	$scope.serviceform.updatedAt = new Date($scope.serviceform.updatedAt);
}

			
			
		var unregister = $scope.$watch('serviceform.emails', function(x) {
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
		
		

		$scope.master = $scope.serviceform;
		return $scope.serviceform;
	};

	$scope.create = function() {
		$scope.serviceform = ServiceForm.create.query({},
				function(serviceform) {
					$scope.serviceform = serviceform;
					
					
		var unregister = $scope.$watch('serviceform.emails', function(x) {
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

		$scope.master = $scope.serviceform;
		return $scope.serviceform;
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

	
	$scope.showcustomerList = function($event) {
		var url = $($event.currentTarget).data("url");
		var template = $($event.currentTarget).data("template");
		var id = $($event.currentTarget).data("id");
		$scope.showModal(template, $scope.selectcustomer);
	};
	
	$scope.selectcustomer = function(customer) {
		$scope.serviceform.customer = customer;
	};

	$scope.deletecustomer = function() {
		$scope.serviceform.customer = null;
	};

	$scope.showserviceFormPricingList = function($event) {
		var url = $($event.currentTarget).data("url");
		var template = $($event.currentTarget).data("template");
		var id = $($event.currentTarget).data("id");
		$scope.showModal(template, $scope.selectserviceFormPricing);
	};
	
	$scope.selectserviceFormPricing = function(serviceFormPricing) {
		$scope.serviceform.serviceFormPricing = serviceFormPricing;
	};

	$scope.deleteserviceFormPricing = function() {
		$scope.serviceform.serviceFormPricing = null;
	};

	$scope.showemployeeList = function($event) {
		var url = $($event.currentTarget).data("url");
		var template = $($event.currentTarget).data("template");
		var id = $($event.currentTarget).data("id");
		$scope.showModal(template, $scope.selectemployee);
	};
	
	$scope.selectemployee = function(employee) {
		$scope.serviceform.employee = employee;
	};

	$scope.deleteemployee = function() {
		$scope.serviceform.employee = null;
	};


	$scope.save = function() {
		
	if ($scope.serviceform.emails!= null && !angular.isArray($scope.serviceform.emails)) {
		$scope.serviceform.emails = $scope.serviceform.emails.split(",");
	}

		$scope.serviceform.$save().then(function(){
			serviceformGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					ServiceForm, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.serviceform = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("serviceform.id", function() {
		serviceformGetInterceptor.idChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.customer", function() {
		serviceformGetInterceptor.customerChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.customerTitle", function() {
		serviceformGetInterceptor.customerTitleChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.department", function() {
		serviceformGetInterceptor.departmentChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.address", function() {
		serviceformGetInterceptor.addressChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.tel", function() {
		serviceformGetInterceptor.telChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.emails", function() {
		serviceformGetInterceptor.emailsChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.authorizedPerson", function() {
		serviceformGetInterceptor.authorizedPersonChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.requestDate", function() {
		serviceformGetInterceptor.requestDateChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.serviceDate", function() {
		serviceformGetInterceptor.serviceDateChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.serviceType", function() {
		serviceformGetInterceptor.serviceTypeChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.scope", function() {
		serviceformGetInterceptor.scopeChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.serviceDefinition", function() {
		serviceformGetInterceptor.serviceDefinitionChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.usedMaterial", function() {
		serviceformGetInterceptor.usedMaterialChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.contracted", function() {
		serviceformGetInterceptor.contractedChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.serviceDescription", function() {
		serviceformGetInterceptor.serviceDescriptionChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.startTime", function() {
		serviceformGetInterceptor.startTimeChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.finishTime", function() {
		serviceformGetInterceptor.finishTimeChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.duration", function() {
		serviceformGetInterceptor.durationChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.pricing", function() {
		serviceformGetInterceptor.pricingChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.serviceFormPricing", function() {
		serviceformGetInterceptor.serviceFormPricingChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.employee", function() {
		serviceformGetInterceptor.employeeChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.createdBy", function() {
		serviceformGetInterceptor.createdByChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.owner", function() {
		serviceformGetInterceptor.ownerChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.updatedBy", function() {
		serviceformGetInterceptor.updatedByChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.createdAt", function() {
		serviceformGetInterceptor.createdAtChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.updatedAt", function() {
		serviceformGetInterceptor.updatedAtChanged($scope.serviceform);
	});

	$scope.$watch("serviceform.deleted", function() {
		serviceformGetInterceptor.deletedChanged($scope.serviceform);
	});

	*/
});
