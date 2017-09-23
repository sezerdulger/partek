
var productServices = angular.module('productServices', [ 'ngResource' ]);

productServices.factory('Product', [ '$resource', function($resource) {
	
	return {
		get: $resource('product.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('product.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('product.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('product.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('product.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('product.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
productServices.factory('Product', [ '$resource', function($resource) {
	
	return $resource('product.json/page/:page/limit/:limit', {}, {
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

productServices.factory('Product', [ '$resource', function($resource) {
	
	return $resource('product.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
