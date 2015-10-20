angular.module('telenotes', ['ui.router']);

angular.module('telenotes').config(function($urlRouterProvider, $stateProvider){

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('contacts', {
		url: '/',
		templateUrl: 'contacts/contacts.html',
		controller: 'contactsCtrl'
	})
	.state('admin', {
		url: '/admin',
		templateUrl: 'admin/admin.html',
		controller: 'contactsCtrl'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'users/login.html',
		controller: 'usersCtrl',
		onEnter: function($state, auth) {
			if(auth.isLoggedIn()){
				$state.go('admin');
			}
		}
	})
	.state('register', {
		url: '/register',
		templateUrl: 'users/register.html',
		controller: 'usersCtrl',
		onEnter: function($state, auth) {
			if(auth.isLoggedIn()){
				$state.go('admin');
			}
		}
	})
});