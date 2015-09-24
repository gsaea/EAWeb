// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Infrastructure' controller
angular.module('dashboard').controller('InfrastructureController', ['$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'ngTableParams', 'ITStandard', 'ITStandardByCat',
        function ($scope, $http, $routeParams, $filter, $location, $sce, ngTableParams, ITStandard, ITStandardByCat) {
        // Controller method for IT Standards table
        $scope.createITStandardTable = function () {
            var itstandards = [];
            var filteredstands = [];
                if ($.isEmptyObject($routeParams)){
                    itstandards = ITStandard.query();
                    itstandards.$promise.then(function (populateData) {
                        $scope.itstandards = itstandards;
						$('#standtable').bootstrapTable({
							columns: [{
								field: 'Name',
								title: 'Standard Name',
								sortable: true
                    		}, {
								field: 'Description',
								title: 'Description',
								sortable: true
                    		}, {
								field: 'Type',
								title: 'Type',
								sortable: true
                    		}, {
								field: 'Category',
								title: 'Category',
								sortable: true
                    		}, {
								field: 'Status',
								title: 'Status',
								sortable: true
                    		}],
                    		data: itstandards
                		});
                    });
                }
                else  {
                    var itstandards = ITStandardByCat.query();
                    itstandards.$promise.then(function (populateData) {
                        var standcat = '';
                        standcat = $routeParams.standardCat;
                        $.each(itstandards, function (key, val) {
                            if ([val.ParentCategory] == standcat) {
                                filteredstands.push({"Category" : val.Category, "Name" : val.Name, "Status" : val.Status, "Type" : val.Type});
                            }
                        });
                        $scope.itstandards = filteredstands;
                    });
                    // Use the ITStandard 'query' method to send an appropriate GET request
                    $scope.tableParams = new ngTableParams({
                        page: 1,            // show first page
                        count: 10,           // count per page
    		            filter: {
                            ParentCategory: '',
    						Name: '',       // initial filter
                            Status: '',
                            Type: ''
                        },
                    }, {
                        total: itstandards.length, // length of data
                        getData: function ($defer, params) {
                            
    						//var filteredData = params.filter() ?
    						var orderedData = params.filter() ?
                                $filter('filter')($scope.itstandards, params.filter()) :
    							$scope.itstandards;
    						//	params.total(filteredData.length);
    					    //var orderedData = params.sorting() ?
                            //   $filter('orderBy')(itstandards, params.orderBy()) :
                            //   $scope.itstandards;
    						   params.total(orderedData.length);
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                    }
                });
            }
        } 

         // Controller method for Standards table
        $scope.createITStandByCatTable = function () {
             // Use the Standards 'query' method to send an appropriate GET request       
		var standcat = ITStandardByCat.query();
	    var stands = [];
		standcat.$promise.then(function (populateData) {
   		if ($.isEmptyObject($routeParams)){
                    stands = standcat;
                }
                else {
                    var standardcat = '';
					var filteredstands =[];
                    standardcat = $routeParams.standardCat;
                    $.each(standcat, function (key, val) {
                        if ([val.ParentCategory] == standardcat) {
                            filteredstands.push({"Name" : val.Name, "Category" : val.Category, "ParentCategory" : val.ParentCategory});
                        }
                    });
                    stands = filteredstands;
                }
                $('#standcattable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Standard Name',
						sortable: true
                    }, {
                        field: 'Category',
                        title: 'Category',
						sortable: true
                    }, {
                        field: 'ParentCategory',
                        title: 'Parent Category',
						sortable: true
                    }],
                    data: stands,
			
                });
            });
        }  

			// Controller method for IT Standards pie chart on dashboard
        $scope.createITStandardChart = function () {
             // Use the IT Standard By Category 'query' method to send an appropriate GET request   
            var stands = ITStandardByCat.query();
			$('#standardsbody').html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
            stands.$promise.then(function (populateData) {
				$('#standardsbody').html('<svg id="standardschart" class="dashboard"></svg>');
                var count = [];
                $.each(stands, function (key, val) {
                    var item = [val.ParentCategory];
                    count[item] = count[item] + 1 || 1;
                });
                var result = [];
                for (var i in count) {
                    if (i == '')
                        result.push({"key" : 'Unknown', "y" : count[i]});
                    else
                        result.push({"key" : i, "y" : count[i]});
                }
                result.sort(); 
                nv.addGraph(function() {
                    var chart = nv.models.pieChart()
                        .x(function(d) { return d.key })
                        .y(function(d) { return d.y })
                        .showLabels(false)
						.valueFormat(d3.format('d'))
                    d3.select("#standardschart")
                        .datum(result)
                        .transition().duration(1200)
                        .call(chart)
                    chart.pie.dispatch.on("elementClick", function(e) {
                        $location.path('/itstandards_ByCategory/' + e.label);
                        $scope.$apply();
                        $('.nvtooltip').empty(); 
                    });
 		    chart.legend.dispatch.on("legendClick", function(t) {
                        $location.path('/itstandards_ByCategory/' + t.key);
			$scope.$apply();
                    });
                    return chart;
                });
            })
			.catch(function error(msg) {
				console.error(msg);
				$('#standardsbody').html('<p>System Architect services are not available at this time</p>');
			});
        }
    }
]);