// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'strategy' controller
angular.module('dashboard').controller('StrategyController', ['$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'ngTableParams', 'Goal', 'Investment', 'Benchmark',
    function ($scope, $http, $routeParams, $filter, $location, $sce, ngTableParams, Goal, Investment, Benchmark) {
        // Controller method for Goal table
        $scope.createGoalTable = function () {
            $scope.tablename = 'GSA Goals';
            var goals = Goal.query();
            goals.$promise.then(function (populateData) {
                $('#goaltable').bootstrapTable({
                    columns: [{
                        field: 'ID',
                        title: 'ID',
						sortable: true
                    }, {
                        field: 'Name',
                        title: 'Goal Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'TargetDate',
                        title: 'Target Date',
						sortable: true
                    }, {
                        field: 'Owner',
                        title: 'Owning Organization',
						sortable: true
                    }],
                    data: goals
                });
            });
        }
        // Controller method for Benchmark table
        $scope.createBenchmarkTable = function () {
            $scope.tablename = 'GSA Benchmarks';
            var benchmarks = Benchmark.query();
            benchmarks.$promise.then(function (populateData) {
                $('#benchmarktable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Benchmark Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'Format',
                        title: 'Result Format',
						sortable: true
                    }, {
                        field: 'FY13Perf',
                        title: 'FY13',
						sortable: true
                    }, {
                        field: 'FY13GovtMed',
                        title: 'FY13 Govt Median',
						sortable: true
                    }, {
                        field: 'FY13Source',
                        title: 'FY13 Source',
						sortable: true,
						visible: false
                    },{
                        field: 'FY14Perf',
                        title: 'FY14',
						sortable: true,
                    }, {
                        field: 'FY14GovtMed',
                        title: 'FY 14 Govt Median',
						sortable: true,
                    }, {
                        field: 'FY14Source',
                        title: 'FY14 Source',
						sortable: true,
						visible: false
                    }],
                    data: benchmarks
                });
            });
        }
		
	/*	$('#benchmarktable').on('click-row.bs.table', function (e, row, $element) {
			var benchpath = row.Name
			benchpath = benchpath.replace(/\//g , "-%")
		
			$location.path('/benchmarks/' + benchpath);
			$scope.$apply();
		});  */
		
		// Controller method for Benchmark Detail
        $scope.createBenchmarkDetail = function () {
			var bench = $routeParams.benchmarkId;
			var benchmark = Benchmark.query();
			var name = '';
			var desc = '';
			var bformat = '';
			var fy13gm = '';
			var fy13perf = '';
			var range = '';
			benchmark.$promise.then(function (populateData) {
				$.each(benchmark, function (key, val) {
					if (val.Name = bench){
						$scope.benchname = name = val.Name;
						$scope.description = desc = val.Description;
						$scope.benchtype = bformat = val.Format;
						$scope.primarysa = val.PrimarySA;
						$scope.secondarysa = val.SecondarySA;
						$scope.fy13govmed = fy13perf = val.FY13GovtMed;
						$scope.fy13govmed = fy13gm = val.FY13GovtMed;
						fy13gm = parseFloat(fy13gm);
						fy13perf = parseFloat(fy13perf);
						if (bformat == 'Percent'){
							range = [0, fy13gm, 100]
						}
					}
				});
				var benchdata = {
						"title": name,		//Label the bullet chart
						"subtitle": bformat,		//sub-label for bullet chart
						"ranges": range,	 //Minimum, mean and maximum values.
						"measures":[58],		 //Value representing current measurement (the thick blue line in the example)
						"markers": [fy13gm]		 //Place a marker on the chart (the white triangle marker)
					  }
					  
					  
					  ;
				nv.addGraph(function() {  
					var chart = nv.models.bulletChart();

					d3.select('#benchmarkchart svg')
						.datum(benchdata)
						.transition().duration(1000)
						.call(chart);

					return chart;
				});
			});
		}
		
		
		
		
		
		
		
        // Controller method for Investments table
        $scope.createInvestmentTable = function () {
            var investments = Investment.query();
			var invests = [];
					
            investments.$promise.then(function (populateData) {
				if ($.isEmptyObject($routeParams)){
					$.each(investments, function (key, val) {
						invests.push({"Name" : val.Name, "Description" : val.Description, "Type" : val.Type, "PrimarySA" : val.PrimarySA, "SecondarySA" : val.SecondarySA});
                    });
                }
                else {
                    var invtype = '';
					var filteredinv =[];
                    invtype = $routeParams.investmentId;
                    $.each(investments, function (key, val) {
                        if ([val.Type] == invtype) {
                            filteredinv.push({"Name" : val.Name, "Description" : val.Description, "Type" : val.Type, "PrimarySA" : val.PrimarySA, "SecondarySA" : val.SecondarySA});
                        }
						else if ([val.Type] == "") {
							if (invtype == "Unknown"){
								filteredinv.push({"Name" : val.Name, "Description" : val.Description, "Type" : val.Type, "PrimarySA" : val.PrimarySA, "SecondarySA" : val.SecondarySA});
							}
                        }
                    });
                    invests = filteredinv;
                }
                 $('#investmenttable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Investment Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    },{
                        field: 'Type',
                        title: 'Type',
						sortable: true
                    }, {
                        field: 'PrimarySA',
                        title: 'Primary Service Area',
						sortable: true
                    }, {
                        field: 'SecondarySA',
                        title: 'Secondary Service Area',
						sortable: true
                    }],
                    data: invests
                });
            });
        }
        $scope.createInvestmentBar = function(){
             // Use the Investment 'query' method to send an appropriate GET request   
            var invests = Investment.query();
			$('#investmentbody').html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
            invests.$promise.then(function (populateData) {
				$('#investmentbody').html('<svg id="investmentchart" class="dashboard" data-ng-init="updateAttributes()"></svg>');
                var count = [];
                $.each(invests, function (key, val) {
                 //   if([val.BY] == 'BY16'){
                    var item = [val.Type];
                        count[item] = count[item] + 1 || 1;
              //      }
                });
                var result = [];
                for (var i in count) {
                    if (i == '') {
                        result.push({"label" : 'Unknown', "value" : count[i]});
                    }
                    else {
                        result.push({"label" : i, "value" : count[i]});
                    }
                }
                result.sort();
                var investdata = [];
                investdata.push({"key" : "Cumulative Return", "values" : result})
                nv.addGraph(function() {
                    var chart = nv.models.discreteBarChart()
                        .x(function(d) { return d.label })
                        .y(function(d) { return d.value })
                        .staggerLabels(true)
                        .showValues(true)
                        .duration(250)
						.valueFormat(d3.format('d'))
					chart.yAxis.tickFormat(d3.format(',.0d'))
					chart.discretebar.dispatch.on("elementClick", function(e) {
                        $location.path('/investments/' + e.point.label);
                        $scope.$apply();
                        $('.nvtooltip').empty()
                    });
					chart.noData("There is no Data to display")
                    d3.select('#investmentchart')
                        .datum(investdata)
                        .call(chart);
                    nv.utils.windowResize(chart.update);
                    return chart;
                });
            })
			.catch(function error(msg) {
				console.error(msg);
				$('#investmentbody').html('<p>System Architect services are not available at this time</p>');
			});
        }

    }
]);