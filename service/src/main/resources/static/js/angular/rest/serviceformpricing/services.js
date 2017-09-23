
var serviceformpricingServices = angular.module('serviceformpricingServices', [ 'ngResource' ]);

serviceformpricingServices.factory('ServiceFormPricing', [ '$resource', function($resource) {
	
	return {
		get: $resource('serviceformpricing.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('serviceformpricing.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('serviceformpricing.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('serviceformpricing.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('serviceformpricing.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('serviceformpricing.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
serviceformpricingServices.factory('ServiceFormPricing', [ '$resource', function($resource) {
	
	return $resource('serviceformpricing.json/page/:page/limit/:limit', {}, {
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

serviceformpricingServices.factory('ServiceFormPricing', [ '$resource', function($resource) {
	
	return $resource('serviceformpricing.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
