// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Security' controller
angular.module('dashboard').controller('SecurityController', ['$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'ngTableParams', 'FISMA', 'FISMAPOC', 'RISSO',
    function ($scope, $http, $routeParams, $filter, $location, $sce, ngTableParams, FISMA, FISMAPOC, RISSO) {
        // Controller method for Fisma Systems table
        $scope.createFISMATable = function () {
            var fsystems = FISMA.query();
            fsystems.$promise.then(function (populateData) {
             $('#fismatable').bootstrapTable({
                    columns: [{
                        field: 'RespSSO',
                        title: 'Responsible SSO',
						sortable: true
                    }, {
                        field: 'Name',
                        title: 'System Name',
						sortable: true
                    }, {
                        field: 'FedContractorLoc',
                        title: 'Federal/Contractor',
						sortable: true
                    }, {
                        field: 'FIPS199',
                        title: 'FIPS Impact Level',
						sortable: true
                    }, {
                        field: 'ATODate',
                        title: 'ATO Date',
						sortable: true
                    }, {
                        field: 'RenewalDate',
                        title: 'Renewal Date',
						sortable: true
                    },/* {
                        field: 'ContMonitorDate',
                        title: 'Continuous Monitoring Date',
						sortable: true
                    },*/ {
                        field: 'ComplFISMA',
                        title: 'Complete Assessment For Current FY',
						sortable: true
                    }, {
                        field: 'RelatedArtName',
                        title: 'Related Artifacts',
						sortable: true
                    }],
                    data: fsystems
                });
				
            });
        }

        // Controller method for Fisma Systems table
        $scope.createFISMAPOCTable = function () {
            var fpoc = FISMAPOC.query();
            fpoc.$promise.then(function (fisma) {
				var fisma = [];
				var issm = '';
				var isso = '';
				var pm = '';
				var ao = '';
					$.each(fpoc, function (key, val) {
						issm = val.ISSMName + " " + val.ISSMEmail + " " + val.ISSMPhone;
						isso = val.ISSOName + " " + val.ISSOEmail + " " + val.ISSOPhone;
						pm = val.PMName + " " + val.PMEmail + " " + val.PMPhone;
						ao = val.AOName + " " + val.AOEmail + " " + val.AOPhone;
						fisma.push({"RespSSO" : val.RespSSO, "Name" : val.Name, "FIPS199" : val.FIPS199, "ISSMName" : issm, "ISSOName" : isso, "PMName" : pm, "AOName" : ao});
                    });
		$('#fismapoctable').bootstrapTable({
                    columns: [{
                        field: 'RespSSO',
                        title: 'Responsible SSO',
						sortable: true
                    }, {
                        field: 'Name',
                        title: 'System Name',
						sortable: true
                    }, {
                        field: 'FIPS199',
                        title: 'FIPS Impact Level',
						sortable: true
                    }, {
						field: 'ISSMName',
                        title: 'ISSM',
						sortable: true
                    }, {
                        field: 'ISSOName',
                        title: 'ISSO',
						sortable: true
                    }, {
                        field: 'PMName',
                        title: 'Program Manager',
						sortable: true
                    }, {
                        field: 'AOName',
                        title: 'Authorizing Official',
						sortable: true
                    }],
                    data: fisma
                });					
            });
        }
		
		$scope.createRISSOPOCTable = function () {
            var risso = RISSO.query();
            risso.$promise.then(function (populateData) {
				var filtrisso = [];
				$.each(risso, function (key, val) {
					if ([val.SecurityRole] == 'RISSO'){
						filtrisso.push({"Name" : val.Name, "Organization" : val.Organization, "SecurityRole" : val.SecurityRole, "Region" : val.Region, "PhoneNumber" : val.PhoneNumber, "Email" : val.Email});
                    }
				});
				$('#rissopoctable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Name',
						sortable: true
                    }, {
                        field: 'Organization',
                        title: 'Organization',
						sortable: true
                    }, {
                        field: 'SecurityRole',
                        title: 'Security Role',
						sortable: true
                    }, {
                        field: 'Region',
                        title: 'Region',
						sortable: true
                    }, {
                        field: 'PhoneNumber',
                        title: 'Phone Number',
						sortable: true
                    }, {
                        field: 'Email',
                        title: 'Email',
						sortable: true
                    }],
                    data: filtrisso
                });
				
            });
        }
    }
]);