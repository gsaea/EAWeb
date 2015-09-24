// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'FISMA' service
angular.module('dashboard').factory('FISMA', ['$resource', function ($resource) {
    // Use the '$resource' service to return an FISMA System '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetFISMASystems/ALL:fismaId', {
        fismaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'FISMA POC' service
angular.module('dashboard').factory('FISMAPOC', ['$resource', function ($resource) {
    // Use the '$resource' service to return an FISMA System '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetFISMASystems/POC:fismaId', {
        fismaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'RISSO' service
angular.module('dashboard').factory('RISSO', ['$resource', function ($resource) {
    // Use the '$resource' service to return an FISMA System '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetRISSOPocs:rissoId', {
        rissoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);