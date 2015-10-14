angular.module('telenotes', ['ui.router']);

angular.module('telenotes').config(funcion($urlRouterProvider, $stateProvider){

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('contacts', {
		url: '/',
		templateUrl: 'contacts/contacts.html',
		controller: 'contactsCtrl'
	})
	.state('admin', {
		url: 'admin',
		templateUrl: 'admin/admin.html',
		controller: 'adminCtrl'
	})
	.state('login', {
		url: '/login',
		templateUrl: 'users/login.html',
		controller: 'usersCtrl',
		onEnter: function($state, usersService) {
			if(usersService.isLoggedIn()){
				$state.go('admin');
			}
		}
	})
	.state('register', {
		url: 'register',
		templateUrl: 'users/register.html',
		controller: 'usersCtrl',
		onEnter: function($state, usersService) {
			if(usersService.isLoggedIn()){
				$state.go('admin');
			}
		}
	})
});