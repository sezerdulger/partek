
var settingsControllers = angular.module('settingsControllers', []);

settingsControllers.controller('SettingsIndexController', [
		'$scope',
		'$http',
		'$routeParams',
		'$rootScope',
		'$mdDialog',
		'$mdMedia',
		'$log',
		'$location',
		'Settings',
		function($scope, $http, $routeParams, $rootScope,
				$mdDialog, $mdMedia, $log, $location, Settings) {
			$scope.fields=settingsApp.fields;
			
			$scope.showSettings = function($event, settings) {
				// $rootScope.template = "/settings/get/" + settings.id;
				// $scope.settings =
				// Settings.get.query({id:settings.id});
				if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
					$event.stopPropagation();
					return false;
				}
				$location.path("/settings.json/" + settings.id);
			}
			
			$scope.removeSettings = function(settings) {
				console.log(settings.id);
				Settings.remove.query({id:settings.id}, function() {
					$scope.index();	
				});
			}
			$scope.removeSettingsConfirmation = function($event, settings) {
				
				var confirm = $mdDialog.confirm()
				.title($("#deleteConfirmationTitle").text())
				.textContent($("#deleteConfirmation").text())
				.ariaLabel('Md Dialog')
				.targetEvent($event)
				.ok($("#yes").text())
				.cancel($("#no").text());
				$mdDialog.show(confirm).then(function() {
					$scope.removeSettings(settings);
				}, function() {
					console.log("cancel");
				});
				
			}

			$scope.save = function(settings) {
				Settings.save.query(settings);
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
				settingsIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
						$mdDialog, $mdMedia, $log, $location, Settings);
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
					/*$http.get("/settings.json/count").then(function(response){
						 $scope.totalItems = response.data;
					});*/
					/*
					 * $scope.settingslist = Settings.index.query({ page :
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
				
				Settings.index.query({
					page : page,
					limit : 10,
					query: newquery
				}, function(response) {
					console.log(response.count);
					$scope.settingslist =  response.restList;
					angular.forEach($scope.settingslist, function(item) {
						
if (item.createdAt != null) {
	item.createdAt = new Date(item.createdAt);
}

if (item.updatedAt != null) {
	item.updatedAt = new Date(item.updatedAt);
}

						
if (item.language != null) {
	 $rootScope.translate(item.language, item, "translatedlanguage");
}

					});
					$scope.totalItems = response.count;
					settingsIndexInterceptor.indexLoaded($scope, $http, $routeParams, $rootScope,
							$mdDialog, $mdMedia, $log, $location, Settings);
				});
				$location.path("/settings.json/page/" + $scope.currentPage + "/limit/10/query/" + newquery);
				
				
			};
		} ]);

settingsControllers.controller('SettingsSelectController', [
	'$scope',
	'$http',
	'$routeParams',
	'$rootScope',
	'$mdDialog',
	'$mdMedia',
	'$log',
	'$location',
	'Settings',
function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, Settings) {
		$scope.fields=settingsApp.fields;
		
		$scope.showSettings = function($event, settings) {
			// $rootScope.template = "/settings/get/" + settings.id;
			// $scope.settings =
			// Settings.get.query({id:settings.id});
			if ($event.target.nodeName == "A" || $event.target.nodeName == "I") {
				$event.stopPropagation();
				return false;
			}
			$location.path("/settings.json/" + settings.id);
		}
		
		$scope.removeSettings = function(settings) {
			console.log(settings.id);
			Settings.remove.query({id:settings.id}, function() {
				$scope.index();	
			});
		}
		$scope.removeSettingsConfirmation = function($event, settings) {
			
			var confirm = $mdDialog.confirm()
			.title($("#deleteConfirmationTitle").text())
			.textContent($("#deleteConfirmation").text())
			.ariaLabel('Md Dialog')
			.targetEvent($event)
			.ok($("#yes").text())
			.cancel($("#no").text());
			$mdDialog.show(confirm).then(function() {
				$scope.removeSettings(settings);
			}, function() {
				console.log("cancel");
			});
			
		}

		$scope.save = function(settings) {
			Settings.save.query(settings);
		};
		$scope.initializing=true;
		$scope.init = function() {
			settingsIndexInterceptor.initialize($scope, $http, $routeParams, $rootScope,
					$mdDialog, $mdMedia, $log, $location, Settings);
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
				/*$http.get("/settings.json/count").then(function(response){
					 $scope.totalItems = response.data;
				});*/
				/*
				 * $scope.settingslist = Settings.index.query({ page :
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
			
			Settings.index.query({
				page : page,
				limit : 10,
				query: newquery
			}, function(response) {
				console.log(response.count);
				$scope.settingslist =  response.restList;
				angular.forEach($scope.settingslist, function(item) {
					
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

settingsControllers.controller('SettingsGetController', function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		Settings, $q, $log, $location, $route) {
	
	$scope.hstep = 1;
	$scope.mstep = 10;

	$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
	};
	
	settingsGetInterceptor.initialize($scope,
			$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
			 Settings, $q, $log, $location, $route);
	
	$scope.get = function(id) {
		$scope.settings = Settings.get.query({
			id : id
		}, function(settings) {
			$scope.settings = settings;
			
			
if ($scope.settings.createdAt != null) {
	$scope.settings.createdAt = new Date($scope.settings.createdAt);
}

if ($scope.settings.updatedAt != null) {
	$scope.settings.updatedAt = new Date($scope.settings.updatedAt);
}

			
			
		});
		
		

		$scope.master = $scope.settings;
		return $scope.settings;
	};

	$scope.create = function() {
		$scope.settings = Settings.create.query({},
				function(settings) {
					$scope.settings = settings;
					
					
				});

		$scope.master = $scope.settings;
		return $scope.settings;
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
		
		$scope.settings.$save().then(function(){
			settingsGetInterceptor.afterSave($scope,
					$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
					Settings, $q, $log, $location, $route);
		});
		
		
	};

	$scope.reset = function() {
		$scope.settings = angular.copy($scope.master);
	};
	/*
	
	$scope.$watch("settings.id", function() {
		settingsGetInterceptor.idChanged($scope.settings);
	});

	$scope.$watch("settings.language", function() {
		settingsGetInterceptor.languageChanged($scope.settings);
	});

	$scope.$watch("settings.createdBy", function() {
		settingsGetInterceptor.createdByChanged($scope.settings);
	});

	$scope.$watch("settings.owner", function() {
		settingsGetInterceptor.ownerChanged($scope.settings);
	});

	$scope.$watch("settings.updatedBy", function() {
		settingsGetInterceptor.updatedByChanged($scope.settings);
	});

	$scope.$watch("settings.createdAt", function() {
		settingsGetInterceptor.createdAtChanged($scope.settings);
	});

	$scope.$watch("settings.updatedAt", function() {
		settingsGetInterceptor.updatedAtChanged($scope.settings);
	});

	$scope.$watch("settings.deleted", function() {
		settingsGetInterceptor.deletedChanged($scope.settings);
	});

	*/
});
