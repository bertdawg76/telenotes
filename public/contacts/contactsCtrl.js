angular.module('telenotes').controller('contactsCtrl', function($scope, contactsService){

	var refresh = function() {
		contactsService.getContact().then(function(response){
			$scope.contactList = response;
			$scope.contact = "";
		})
	};

	refresh();


	$scope.addContact = function(contact) {
		console.log(contact);
		contactsService.addContact(contact).then(function(response){
			console.log(response);
			refresh();
		});
		
	};

	$scope.removeContact = function(id) {
		console.log(id);
		contactsService.removeContact(id).then(function(response){
			console.log(response);
			refresh();
		})
	};

	$scope.updateContact = function(id, contact) {
		console.log(id);
		contactsService.updateContact(id, contact).then(function(response){
			
			refresh();
		})
	};

	$scope.editContact = function(id) {
		console.log(id);
		contactsService.editContact(id).then(function(response){
			console.log(response);
			$scope.contact = response.data;
		});
	};

	$scope.getContact = function() {
		contactsService.getContact().then(function(response){
			console.log(response);
			$scope.contactList = response;

		})
	}
});