
var userServices = angular.module('userServices', [ 'ngResource' ]);

userServices.factory('User', [ '$resource', function($resource) {
	
	return {
		get: $resource('user.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('user.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('user.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('user.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('user.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('user.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
userServices.factory('User', [ '$resource', function($resource) {
	
	return $resource('user.json/page/:page/limit/:limit', {}, {
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

userServices.factory('User', [ '$resource', function($resource) {
	
	return $resource('user.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
