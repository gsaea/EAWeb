// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Application' service
angular.module('dashboard').factory('Application', ['$resource', function ($resource) {
    // Use the '$resource' service to return an Application '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetApplications:applicationName', {
        applicationId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Application to Technology Mapping' service
angular.module('dashboard').factory('AppTechMap', ['$resource', function ($resource) {
    // Use the '$resource' service to return an AppTechMap '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetAppTechMap', {
        applicationId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Application to Technology Mapping' service
angular.module('dashboard').factory('FuncAppMap', ['$resource', function ($resource) {
    // Use the '$resource' service to return an AppTechMap '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetFuncAppMap', {
        applicationId: '@Name'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);




// Create the 'System' service
angular.module('dashboard').factory('System', ['$resource', function ($resource) {
    // Use the '$resource' service to return a System '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetGSASystems:systemId', {
        systemId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'TIME' service
angular.module('dashboard').factory('TIME', ['$resource', function ($resource) {
    // Use the '$resource' service to return a TIME '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetApplicationTIME:appId', {
        appId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Interfaces' service
angular.module('dashboard').factory('Interface', ['$resource', function ($resource) {
    // Use the '$resource' service to return an Interface '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetInterfaces:interfaceId', {
        interfaceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);