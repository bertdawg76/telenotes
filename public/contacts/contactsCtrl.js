angular.module('telenotes').controller('contactsCtrl', function($scope, contactsService){

	$scope.addContact = function(contact) {
		console.log(contact);
		contactsService.addContact(contact).then(function(response){
			console.log(response);
		});
		$scope.contact = '';
	}
})