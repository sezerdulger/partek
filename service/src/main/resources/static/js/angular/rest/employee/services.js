
var employeeServices = angular.module('employeeServices', [ 'ngResource' ]);

employeeServices.factory('Employee', [ '$resource', function($resource) {
	
	return {
		get: $resource('employee.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('employee.json/page/:page/limit/:limit/query/:query', {}, {
			query : {
				method : 'GET',
				params : {
					page: '@_page',
					limit: '@_limit',
					query: '@_query'
				},
				isArray : false
			}
		}),
		save: $resource('employee.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('employee.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('employee.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('employee.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
employeeServices.factory('Employee', [ '$resource', function($resource) {
	
	return $resource('employee.json/page/:page/limit/:limit', {}, {
		index : {
			method : 'GET',
			params : {
				page: '@_page',
				limit: '@_limit'
			},
			isArray : true
		}
	});
} ]);

employeeServices.factory('Employee', [ '$resource', function($resource) {
	
	return $resource('employee.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
