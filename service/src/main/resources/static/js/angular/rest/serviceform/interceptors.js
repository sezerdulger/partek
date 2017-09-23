
var serviceformGetInterceptor = new Object();
serviceformGetInterceptor.afterSave = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	window.history.back();
};

serviceformGetInterceptor.initialized = false;



serviceformGetInterceptor.initialize = function($scope,
		$rootScope, $mdDialog, $mdMedia, $routeParams, $http, $compile,
		ServiceForm, $q, $log, $location, $route) {
	
	if (!serviceformGetInterceptor.initialized) {
		serviceformGetInterceptor.initialized = true;
	}
	else {
		
	}
	
	$scope.downloadPDF=function(serviceform) {
		$http.post("/serviceform/downloadpdf", serviceform).then(function(response) {
			console.log(response.data);
		});
	};
	
	$scope.saveAndSend = function(serviceform) {
		$scope.save();
		$scope.sendMail(serviceform);
	};
	
	$scope.sendMail=function(serviceform) {
		console.log(serviceform);
		$rootScope.dialogTemplate = "/serviceform/sendmail";
		var $modal = $("#largeModal");
		$modal.modal('show').on('shown.bs.modal', function($event) {
			console.log("shown");
		}).on('hidden.bs.modal', function($event) {
		});
		console.log("sendmail");
		
		serviceFormMailController.serviceform=serviceform;
	}
	
	$scope.$watch('serviceform.customer', function(x) {
		
		if ($scope.serviceform != undefined && $scope.serviceform.customer != null) {
			$scope.serviceform.address=$scope.serviceform.customer.address;
			$scope.serviceform.customerTitle=$scope.serviceform.customer.title;
			console.log($("form[name='serviceform']").find("input[ng-model='serviceform.emails']")[0]);
			console.log($("#test")[0]);
			var selectize_tags = $("form[name='serviceform']").find("input[ng-model='serviceform.emails']")[0].selectize;
			selectize_tags.clearOptions();
			angular.forEach($scope.serviceform.customer.emails, function(email, i) {
				selectize_tags.addOption({
			        text:email,
			        value: email
			    });
				selectize_tags.addItem(email);
			});
		    
		    
			$scope.serviceform.emails=$scope.serviceform.customer.emails;
			$scope.serviceform.tel=$scope.serviceform.customer.tel;
			$scope.serviceform.authorizedPerson=$scope.serviceform.customer.authorizedPerson;
			$scope.serviceform.contracted=$scope.serviceform.customer.contracted;
		}
		
	});

};

var serviceformIndexInterceptor = new Object();
serviceformIndexInterceptor.afterSave = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ServiceForm) {
};

serviceformIndexInterceptor.initialized = false;
serviceformIndexInterceptor.indexLoaded = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ServiceForm) {
	$scope.totalHour = 0;
	$scope.totalMinute = 0;
	angular.forEach($scope.serviceformlist, function(item) {
		
		var finishHour = new Date(item.finishTime).getHours();
		var startHour = new Date(item.startTime).getHours();
		var finishMinute = new Date(item.finishTime).getMinutes();
		var startMinute = new Date(item.startTime).getMinutes();
		//console.log(new Date(item.finishTime).getHours()-new Date(item.startTime).getHours());
		
		$scope.totalHour += (finishHour - startHour);
		$scope.totalMinute += (finishMinute - startMinute);
		console.log("$scope.totalHour "+$scope.totalHour);	
		console.log("$scope.totalMinute " + $scope.totalMinute);
		
		while ($scope.totalMinute < 0) {
			$scope.totalHour -= 1;
			$scope.totalMinute += 60;
		}
		
		while ($scope.totalMinute > 60) {
			$scope.totalHour += 1;
			$scope.totalMinute -= 60;
		}
		/*
		if (finishMinute >= startMinute) {
			$scope.totalHour += (finishHour - startHour);
			$scope.totalMinute += (finishMinute - startMinute);
		}
		else {
			$scope.totalHour += (finishHour - startHour - 1);
			$scope.totalMinute += (60 + finishMinute - startMinute);
		}*/
	});
};

serviceformIndexInterceptor.initialize = function($scope, $http, $routeParams, $rootScope,
		$mdDialog, $mdMedia, $log, $location, ServiceForm) {
	if (!serviceformIndexInterceptor.initialized) {
		serviceformIndexInterceptor.initialized = true;
		
		
	}
	else {
		
	}
	
	$scope.downloadPDF=function(serviceform) {
		//$scope.pdf="/serviceform/downloadpdf/" + serviceform.id;
		//$http.post("/serviceform/downloadpdf", serviceform).then(function(response) {
			
		//});
		
		 var anchor = angular.element('<a/>');
		    anchor.css({display: 'none'}); // Make sure it's not visible
		    angular.element(document.body).append(anchor); // Attach to document for FireFox

		    anchor.attr({
		        href: "/serviceform/downloadpdf/" + serviceform.id,
		        target: '_blank',
		        download: "teknikserviceformu.pdf"
		})[0].click();
		anchor.remove();
	};
	
	$scope.sendMail=function(serviceform) {
		console.log(serviceform);
		$rootScope.dialogTemplate = "/serviceform/sendmail";
		var $modal = $("#largeModal");
		$modal.modal('show').on('shown.bs.modal', function($event) {
			console.log("shown");
		}).on('hidden.bs.modal', function($event) {
		});
		console.log("sendmail");
		
		serviceFormMailController.serviceform=serviceform;
	}
};
var serviceFormMailController = serviceformControllers.controller('ServiceFormMailController', [
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
	$http.post("/serviceform/getmail", serviceFormMailController.serviceform).then(function(response) {
		$scope.serviceFormMail = response.data;
		
		
		var unregister = $scope.$watch('serviceFormMail.emails', function(x) {
			console.log("selectizing:" + x);
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
	$scope.send = function(serviceFormMail) {
		
		if (serviceFormMail.emails!= null && !angular.isArray(serviceFormMail.emails)) {
			serviceFormMail.emails = serviceFormMail.emails.split(",");
		}
		
		$http.post("/serviceform/sendmail", serviceFormMail).then(function(response) {
			if (response.data.success == true) {
				$rootScope.hideModal();
			}
			else {
				$scope.error = response.data.message;
			}
			$scope.ismailsending=false;
		});
		$scope.ismailsending="indeterminate";
	}
} ]);
/*

serviceformGetInterceptor.idChanged = function(serviceform) {
};

serviceformGetInterceptor.customerChanged = function(serviceform) {
};

serviceformGetInterceptor.departmentChanged = function(serviceform) {
};

serviceformGetInterceptor.addressChanged = function(serviceform) {
};

serviceformGetInterceptor.telChanged = function(serviceform) {
};

serviceformGetInterceptor.emailChanged = function(serviceform) {
};

serviceformGetInterceptor.requestDateChanged = function(serviceform) {
};

serviceformGetInterceptor.meetingDateChanged = function(serviceform) {
};

serviceformGetInterceptor.serviceDateChanged = function(serviceform) {
};

serviceformGetInterceptor.serviceTypeChanged = function(serviceform) {
};

serviceformGetInterceptor.scopeChanged = function(serviceform) {
};

serviceformGetInterceptor.serviceDefinitionChanged = function(serviceform) {
};

serviceformGetInterceptor.usedMaterialChanged = function(serviceform) {
};

serviceformGetInterceptor.serviceDescriptionChanged = function(serviceform) {
};

serviceformGetInterceptor.startTimeChanged = function(serviceform) {
};

serviceformGetInterceptor.finishTimeChanged = function(serviceform) {
};

serviceformGetInterceptor.durationChanged = function(serviceform) {
};

serviceformGetInterceptor.hourlyRateChanged = function(serviceform) {
};

serviceformGetInterceptor.employeeChanged = function(serviceform) {
};

serviceformGetInterceptor.createdByChanged = function(serviceform) {
};

serviceformGetInterceptor.ownerChanged = function(serviceform) {
};

serviceformGetInterceptor.createdAtChanged = function(serviceform) {
};

serviceformGetInterceptor.deletedChanged = function(serviceform) {
};

*/
