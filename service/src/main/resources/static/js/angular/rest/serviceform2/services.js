var serviceformServices = angular.module('serviceformServices', [ 'ngResource' ]);

serviceformServices.factory('ServiceForm', [ '$resource', function($resource) {
	
	return {
		get: $resource('serviceform/:id.json', {}, {
			query : {
				method : 'GET',
				params : {
					id : '@_id'
				},
				isArray : false
			}
		}),
		index : $resource('serviceform.json/page/:page/limit/:limit', {}, {
			method : 'GET',
			params : {
				page: '@_page',
				limit: '@_limit'
			},
			isArray : true
		}),
		save: $resource('serviceform.json', {}, {
			query : {
				method : 'POST',
			}
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