
var modelrightServices = angular.module('modelrightServices', [ 'ngResource' ]);

modelrightServices.factory('ModelRight', [ '$resource', function($resource) {
	
	return {
		get: $resource('modelright.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('modelright.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('modelright.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('modelright.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('modelright.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('modelright.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
modelrightServices.factory('ModelRight', [ '$resource', function($resource) {
	
	return $resource('modelright.json/page/:page/limit/:limit', {}, {
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

modelrightServices.factory('ModelRight', [ '$resource', function($resource) {
	
	return $resource('modelright.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
