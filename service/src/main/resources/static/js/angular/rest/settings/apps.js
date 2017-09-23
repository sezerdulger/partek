
var settingsApp = angular.module('settingsApp', [ 'ngRoute', 
                                                        'settingsControllers', 'settingsFilters', 'settingsServices' ]);

settingsApp.fields={};

settingsApp.fields.id={visibility:false};

settingsApp.fields.language={visibility:true};

settingsApp.fields.createdBy={visibility:false};

settingsApp.fields.owner={visibility:false};

settingsApp.fields.updatedBy={visibility:false};

settingsApp.fields.createdAt={visibility:false};

settingsApp.fields.updatedAt={visibility:false};

settingsApp.fields.deleted={visibility:false};


settingsApp.config([ '$routeProvider', function($routeProvider) {
	
	
	$routeProvider.when('/settings.json/page/:page/limit/:limit/query/:query', {
		templateUrl : '/settings/index',
		reloadOnSearch: false,
		controller : 'SettingsIndexController'
	}).when('/settings.json/:id', {
		templateUrl : function(params) {
			return '/settings/get'
		},
		controller : 'SettingsGetController',
		reloadOnSearch: false
	}).when('/settings.json/:id/:modify', {
		templateUrl : function(params) {
			return '/settings/' + params.modify
		},
		controller : 'UserGetController',
		reloadOnSearch: false
	}).when('/settings.json', {
		templateUrl : '/settings/create',
		reloadOnSearch: false,
		controller : 'SettingsGetController'
	});
	
} ]);
