// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'data' controller
angular.module('dashboard').controller('DataController', ['$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'ngTableParams', 'Dataset',
    function ($scope, $http, $routeParams, $filter, $location, $sce, ngTableParams, Dataset) {

        // Controller method for Datasets table
        $scope.createDatasetTable = function () {
             // Use the Dataset 'query' method to send an appropriate GET request       
            var datasets = Dataset.query();
            datasets.$promise.then(function (populateData) {
                $('#datatable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Dataset Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'Keyword',
                        title: 'Keyword',
						sortable: true
                    }, {
                        field: 'Organization',
                        title: 'Organization',
						sortable: true
                    }],
                    data: datasets
                });

            });
        }
    }
]);