
var customerServices = angular.module('customerServices', [ 'ngResource' ]);

customerServices.factory('Customer', [ '$resource', function($resource) {
	
	return {
		get: $resource('customer.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('customer.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('customer.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('customer.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('customer.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('customer.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
customerServices.factory('Customer', [ '$resource', function($resource) {
	
	return $resource('customer.json/page/:page/limit/:limit', {}, {
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

customerServices.factory('Customer', [ '$resource', function($resource) {
	
	return $resource('customer.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
