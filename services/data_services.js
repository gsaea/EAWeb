// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Dataset' service
angular.module('dashboard').factory('Dataset', ['$resource', function ($resource) {
    // Use the '$resource' service to return a Dataset '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetDatasets:datasetId', {
        datasetId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);