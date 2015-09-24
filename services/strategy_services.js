// Invoke 'strict' JavaScript mode
'use strict';

/* Create the 'Investment' service
angular.module('dashboard').factory('Investment', ['$resource', function ($resource) {
    // Use the '$resource' service to return an Investment '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetEcpicInitiativeByPortfolio/01184D567A3713AAE053144A16AC06A9', {
        investmentId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);    */

// Create the 'Investment' service
angular.module('dashboard').factory('Investment', ['$resource', function ($resource) {
    // Use the '$resource' service to return a Goal '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetInvestments:investmentId', {
        investmentId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Goal' service
angular.module('dashboard').factory('Goal', ['$resource', function ($resource) {
    // Use the '$resource' service to return a Goal '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetGoals:goalId', {
        goalId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

// Create the 'Benchmark' service
angular.module('dashboard').factory('Benchmark', ['$resource', function ($resource) {
    // Use the '$resource' service to return a Goal '$resource' object
    return $resource('EAOpen/EAOpen.svc/GetBenchmarks:benchmarkId', {
        benchmarkId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);