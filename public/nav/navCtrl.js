angular.module('telenotes').controller('navCtrl', function ($scope, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
});
  