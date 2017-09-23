
var settingsServices = angular.module('settingsServices', [ 'ngResource' ]);

settingsServices.factory('Settings', [ '$resource', function($resource) {
	
	return {
		get: $resource('settings.json/:id', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('settings.json/page/:page/limit/:limit/query/:query', {}, {
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
		save: $resource('settings.json', {}, {
			query : {
				method : 'POST',
			}
		}),
		create: $resource('settings.json', {}, {
			query : {
				method : 'GET',
			}
		}),
		remove: $resource('settings.json/:id', {}, {
			query : {
				method : 'DELETE',
				params : {
					id: '@_id'
				},
				isArray : false
			}
		}),
		count: $resource('settings.json/count', {}, {
			query : {
				method : 'GET',
			},
			isArray : false
		})
	};
} ]);
/*
settingsServices.factory('Settings', [ '$resource', function($resource) {
	
	return $resource('settings.json/page/:page/limit/:limit', {}, {
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

settingsServices.factory('Settings', [ '$resource', function($resource) {
	
	return $resource('settings.json', {}, {
		save : {
			method : 'POST',
		}
	});
} ]);
*/
