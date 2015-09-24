// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Organization' service
angular.module('dashboard').factory('Organization', ['$resource', function ($resource) {
    // Use the '$resource' service to return an Organization '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetOrganizations:organizationId', {
        organizationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Function' service
angular.module('dashboard').factory('BusFunction', ['$resource', function ($resource) {
    // Use the '$resource' service to return an Organization '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetBRMElement:brmId', {
        brmId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Organization to Application Mapping' service
angular.module('dashboard').factory('OrgAppMap', ['$resource', function ($resource) {
    // Use the '$resource' service to return an OrgAppMap '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetOrgAppMap', {
        organizationId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Organization to System Mapping' service
angular.module('dashboard').factory('OrgSysMap', ['$resource', function ($resource) {
    // Use the '$resource' service to return an OrgSysMap '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetOrgSysMap', {
        organizationId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Organization to Goal Mapping' service
angular.module('dashboard').factory('OrgGoalMap', ['$resource', function ($resource) {
    // Use the '$resource' service to return an OrgGoalMap '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetOrgGoalMap', {
        organizationId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);