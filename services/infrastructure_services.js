// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'IT Standards' service
angular.module('dashboard').factory('ITStandard', ['$resource', function ($resource) {
    // Use the '$resource' service to return an IT Standards '$resource' object
    //return $resource('EAOpen/EAOpen.svc/GetITStandard:itstandardId', {
	return $resource('EAOpen/EAOpen.svc/GetITStandards/All', {	
        //itstandardId: '@_id'
		itstandardId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'IT Standards' service
angular.module('dashboard').factory('ITStandardByCat', ['$resource', function ($resource) {
    // Use the '$resource' service to return an IT Standards '$resource' object
    //return $resource('EAOpen/EAOpen.svc/GetITStandard:itstandardId', {
    return $resource('EAOpen/EAOpen.svc/GetITStandards/ByCategory', {  
        //itstandardId: '@_id'
        itstandardId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);