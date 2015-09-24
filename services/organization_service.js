// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'organization' service
angular.module('dashboard').factory('Organization', ['$resource', function ($resource) {
    // Use the '$resource' service to return an organization '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetOrganizations:organizationId', {
        organizationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);