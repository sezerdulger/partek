
var serviceformServices = angular.module('serviceformServices', [ 'ngResource' ]);

serviceformServices.factory('ServiceForm', [ '$resource', function($resource) {
	
	return {
		get: $resource('serviceform.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('serviceform.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('serviceform.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('serviceform.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('serviceform.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('serviceform.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
serviceformServices.factory('ServiceForm', [ '$resource', function($resource) {
	
	return $resource('serviceform.json/page/:page/limit/:limit', {}, {
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

serviceformServices.factory('ServiceForm', [ '$resource', function($resource) {
	
	return $resource('serviceform.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
