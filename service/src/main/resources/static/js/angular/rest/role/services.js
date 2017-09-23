
var roleServices = angular.module('roleServices', [ 'ngResource' ]);

roleServices.factory('Role', [ '$resource', function($resource) {
	
	return {
		get: $resource('role.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('role.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('role.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('role.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('role.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('role.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
roleServices.factory('Role', [ '$resource', function($resource) {
	
	return $resource('role.json/page/:page/limit/:limit', {}, {
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

roleServices.factory('Role', [ '$resource', function($resource) {
	
	return $resource('role.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
