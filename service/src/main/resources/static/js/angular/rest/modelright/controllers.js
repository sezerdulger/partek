
var modelrightControllers = angular.module('modelrightControllers', []);

modelrightControllers.controller('ModelRightIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'ModelRight',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, ModelRight) {
			$scope.fields=modelrightApp.fields;
			
			$scope.showModelRight = function($event, modelright) {
				// $rootScope.template = "/modelright/get/" + modelright.id;
				// $scope.modelright =
				// ModelRight.get.query({id:modelright.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/modelright.json/" + modelright.id);
			}
			
			$scope.removeModelRight = function(modelright) {
				console.log(modelright.id);
				ModelRight.remove.query({id:modelright.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeModelRightConfirmation = function($event, modelright) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeModelRight(modelright);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(modelright) {
				ModelRight.save.query(modelright);
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
				modelrightIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, ModelRight);
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
					/*$http.get("/modelright.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.modelrightlist = ModelRight.index.query({ page :
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
				
				ModelRight.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.modelrightlist =  response.restList;
					angular.forEach($scope.modelrightlist, function(item) {
						
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

						
if (item.model != null) {
	 $rootScope.translate(item.model, item, "translatedmodel");
}

					});
					$scope.totalItems = response.count;
					modelrightIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, ModelRight);
				});
				$location.path("/modelright.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

modelrightControllers.controller('ModelRightSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'ModelRight',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ModelRight) {
		$scope.fields=modelrightApp.fields;
		
		$scope.showModelRight = function($event, modelright) {
			// $rootScope.template = "/modelright/get/" + modelright.id;
			// $scope.modelright =
			// ModelRight.get.query({id:modelright.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/modelright.json/" + modelright.id);
		}
		
		$scope.removeModelRight = function(modelright) {
			console.log(modelright.id);
			ModelRight.remove.query({id:modelright.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeModelRightConfirmation = function($event, modelright) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeModelRight(modelright);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(modelright) {
			ModelRight.save.query(modelright);
		};
		$scope.initializing=true;
		$scope.init = function() {
			modelrightIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, ModelRight);
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
				/*$http.get("/modelright.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.modelrightlist = ModelRight.index.query({ page :
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
			
			ModelRight.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.modelrightlist =  response.restList;
				angular.forEach($scope.modelrightlist, function(item) {
					
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

modelrightControllers.controller('ModelRightGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ModelRight, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	modelrightGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 ModelRight, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.modelright = ModelRight.get.query({
			id : id
		}, function(modelright) {
			$scope.modelright = modelright;
			
			
if ($scope.modelright.createdAt != null) {
	$scope.modelright.createdAt = new Date($scope.modelright.createdAt);
}

if ($scope.modelright.updatedAt != null) {
	$scope.modelright.updatedAt = new Date($scope.modelright.updatedAt);
}

			
			
		});
		
		

		$scope.master = $scope.modelright;
		return $scope.modelright;
	};

	$scope.create = function() {
		$scope.modelright = ModelRight.create.query({},
				function(modelright) {
					$scope.modelright = modelright;
					
					
				});

		$scope.master = $scope.modelright;
		return $scope.modelright;
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
		$scope.modelright.role = role;
	};

	$scope.deleterole = function() {
		$scope.modelright.role = null;
	};


	$scope.save = function() {
		
		$scope.modelright.$save().then(function(){
			modelrightGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					ModelRight, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.modelright = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("modelright.id", function() {
		modelrightGetInterceptor.idChanged($scope.modelright);
	});

	$scope.$watch("modelright.role", function() {
		modelrightGetInterceptor.roleChanged($scope.modelright);
	});

	$scope.$watch("modelright.model", function() {
		modelrightGetInterceptor.modelChanged($scope.modelright);
	});

	$scope.$watch("modelright.read", function() {
		modelrightGetInterceptor.readChanged($scope.modelright);
	});

	$scope.$watch("modelright.create", function() {
		modelrightGetInterceptor.createChanged($scope.modelright);
	});

	$scope.$watch("modelright.edit", function() {
		modelrightGetInterceptor.editChanged($scope.modelright);
	});

	$scope.$watch("modelright.delete", function() {
		modelrightGetInterceptor.deleteChanged($scope.modelright);
	});

	$scope.$watch("modelright.createdBy", function() {
		modelrightGetInterceptor.createdByChanged($scope.modelright);
	});

	$scope.$watch("modelright.owner", function() {
		modelrightGetInterceptor.ownerChanged($scope.modelright);
	});

	$scope.$watch("modelright.updatedBy", function() {
		modelrightGetInterceptor.updatedByChanged($scope.modelright);
	});

	$scope.$watch("modelright.createdAt", function() {
		modelrightGetInterceptor.createdAtChanged($scope.modelright);
	});

	$scope.$watch("modelright.updatedAt", function() {
		modelrightGetInterceptor.updatedAtChanged($scope.modelright);
	});

	$scope.$watch("modelright.deleted", function() {
		modelrightGetInterceptor.deletedChanged($scope.modelright);
	});

	*/
});
