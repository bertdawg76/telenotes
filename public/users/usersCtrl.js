angular.module('telenotes').controller('usersCtrl', function($scope, $state, usersService){
	$scope.user = {};

	$scope.register = function() {
		auth.register($scope.user).error(function(error){
			console.log($scope.user);
			$scope.error = error;
		}).then(function(){
			$state.go('admin');
		});
	};

	$scope.logIn = function() {
		auth.logIn($scope.user).error(function(error){
			console.log($scope.user);
			$scope.error = error;
		}).then(function(){
			$state.go('admin');
		});
    };
});