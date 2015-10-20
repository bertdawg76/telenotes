angular.module('telenotes').service('contactsService', function($http, $q){

  var urlBase = 'api/contacts';

	this.getContact = function () {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: urlBase
    }).then(function (response){
    	console.log(response.data);
    	dfd.resolve(response.data);
    }, function (error){
    	console.log('error: ' + error);
    });
    return dfd.promise;

   
  };
  this.addContact = function (body) {
    var dfd = $q.defer();
    $http({
      method: 'POST',
      url: urlBase,
      data: body
    }).then(function (response) {
      console.log(response.data);
      dfd.resolve(response.data);
    }, function (error) {
      console.log('error: ' + error);
    });
    return dfd.promise;

  };
  
  this.updateContact = function(contact){
    var dfd = $q.defer();
    $http.put(urlBase + '/' + contact._id, contact)

    .then(function (response) {
      console.log(response.data);
      dfd.resolve(response);

    }, function (error) {
      console.log('error: ' + error);
    });
    return dfd.promise;
  }


  this.removeContact = function (id) {
    var dfd = $q.defer();
    $http({
      method: 'DELETE',
      url: urlBase + '/' + id,
      
    }).then(function (response) {
      console.log(response.data);
      dfd.resolve(response.data);
    }, function (error) {
      console.log('error: ' + error);
    });
    return dfd.promise;

  };
  this.editContact = function(id) {
  	var dfd = $q.defer();
  	$http({
  		method: 'GET',
  		url: urlBase + '/' + id
  
  	}).then(function (response){
  		console.log(response.data);
  		dfd.resolve(response.data);
  	}, function (error){
  		console.log('error: ' + error);
  	});
  	return dfd.promise;
  }
});

