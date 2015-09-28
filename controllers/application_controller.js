// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('ApplicationController', ['$scope', '$http', '$routeParams', '$filter', '$location', '$sce', /*'ngTableParams',*/ 'Application', 'System', 'TIME', 'AppTechMap', 'ITStandard', 'FuncAppMap', 'BusFunction', 'Interface',
    function ($scope, $http, $routeParams, $filter, $location, $sce, /*ngTableParams,*/ Application, System, TIME, AppTechMap, ITStandard, FuncAppMap, BusFunction, Interface) {
        // Controller method for Applications table
        $scope.createAppTable = function () {
            // Use the Organization 'query' method to send an appropriate GET request           
            var applications = Application.query();
			var apps = [];
            applications.$promise.then(function (populateData) {
                if ($.isEmptyObject($routeParams)){
					$.each(applications, function (key, val) {
                        if ([val.Status] != "Retired") {
                            apps.push({"Name" : val.Name, "Description" : val.Description, "SSO" : val.SSO, "Owner" : val.Owner, "System" : val.System, "BusinessPOC" : val.BusinessPOC, "Cloud" : val.Cloud, "TechnicalPOC" : val.TechnicalPOC, "Cloud" : val.Cloud, "TechnologyPlatform" : val.TechnologyPlatform, "Status" : val.Status, "Alias" : val.Alias, "RegionClassification" : val.RegionClassification});
                        }
                    });
                }
                else {
                    var appsso = '';
					var filteredapps =[];
                    appsso = $routeParams.applicationSSO;
                    $.each(applications, function (key, val) {
                        if ([val.SSO] == appsso && [val.Status] != "Retired") {
                            filteredapps.push({"Name" : val.Name, "Description" : val.Description, "SSO" : val.SSO, "Owner" : val.Owner, "System" : val.System, "BusinessPOC" : val.BusinessPOC, "Cloud" : val.Cloud, "TechnicalPOC" : val.TechnicalPOC, "Cloud" : val.Cloud, "TechnologyPlatform" : val.TechnologyPlatform, "Status" : val.Status, "Alias" : val.Alias, "RegionClassification" : val.RegionClassification});
                        }
                    });
                    apps = filteredapps;
                }
                $('#appstable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Application Name',
						sortable: true
                    }, {
                        field: 'Alias',
                        title: 'Alias',
						sortable: true,
						visible: false
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'SSO',
                        title: 'SSO',
						sortable: true
                    }, {
                        field: 'Owner',
                        title: '2 Letter Office',
						sortable: true
                    }, {
                        field: 'System',
                        title: 'Parent System',
						sortable: true,
						visible: false
                    }, {
                        field: 'RegionClassification',
                        title: 'Region Classification',
						sortable: true,
						visible: false
                    }, {
                        field: 'BusinessPOC',
                        title: 'Business POC',
						sortable: true,
						visible: false
                    }, {
                        field: 'TechnicalPOC',
                        title: 'Technical POC',
						sortable: true,
						visible: false
                    }, {
                        field: 'Cloud',
                        title: 'Cloud',
						sortable: true,
						visible: false
                    },{
                        field: 'TechnologyPlatform',
                        title: 'Platform',
						sortable: true
                    }, {
                        field: 'Status',
                        title: 'Status',
						sortable: true
                    }],
                    data: apps,
                });		
            });
        }

	$('#appstable').on('click-row.bs.table', function (e, row, $element) {
		var apppath = row.Name
		apppath = apppath.replace(/\//g , "-%")
		$location.path('/applications/' + apppath);
		$scope.$apply();
	});
	
	$scope.appselection = function(applications) {
            $location.path('/applications/' + applications.Name);
	}

        // Controller method for Applications table
        $scope.createRetAppTable = function () {
            // Use the Organization 'query' method to send an appropriate GET request           
            var apps = Application.query();
            apps.$promise.then(function (populateData) {
                var retapps = [];
                $.each(apps, function (key, val) {
                    if ([val.Status] == "Retired") {
                        retapps.push({"Name" : val.Name, "Description" : val.Description, "SSO" : val.SSO, "Status" : val.Status});
                    }
                });
                $('#retiredtable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Application Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'SSO',
                        title: 'SSO',
						sortable: true
                    }, {
                        field: 'Status',
                        title: 'Status',
						sortable: true
                    }],
                    data: retapps
                });
            });
        }

		// Controller method for Applications table
        $scope.createTIMETable = function () {
            // Use the TIME 'query' method to send an appropriate GET request           
            var appstime = TIME.query();
			var time = [];
			var appname = '';
			var owner = '';
			var fy14 = '';
			var fy15 = '';
			var fy16 = '';
			var fy17 = '';
			var fy18 = '';
			var fy19 = '';
			var status = '';
            appstime.$promise.then(function (populateTIME) {
				// Use the Application 'query' method to send an appropriate GET request 
				var apps = Application.query();
				apps.$promise.then(function (populateApps) {
					$.each(appstime, function (key, val) {
						appname = val.Name;
						owner = val.Owner;
						fy14 = val.FY14;
						fy15 = val.FY15;
						fy16 = val.FY16;
						fy17 = val.FY17;
						fy18 = val.FY18;
						fy19 = val.FY19;
						$.each(apps, function (key, val) {
							if (val.Name == appname){
								status = val.Status;
							}
						});
						time.push({"Owner" : owner, "Name" : appname, "Status" : status, "FY14" : fy14, "FY15" : fy15, "FY16" : fy16, "FY17" : fy17, "FY18" : fy18, "FY19" : fy19,});
					});
					$('#timetable').bootstrapTable({
						columns: [{
							field: 'Owner',
							title: '2 Letter Office',
							sortable: true
						}, {
							field: 'Name',
							title: 'Application Name',
							sortable: true
						}, {
							field: 'Status',
							title: 'Status',
							sortable: true
						}, {
							field: 'FY14',
							title: 'FY14',
							visible: false
						}, {
							field: 'FY15',
							title: 'FY15'
						}, {
							field: 'FY16',
							title: 'FY16'
						}, {
							field: 'FY17',
							title: 'FY17'
						}, {
							field: 'FY18',
							title: 'FY18'
						}, {
							field: 'FY19',
							title: 'FY19'
						}],
						data: time
					});
				});
            });
        }

        // Controller method for Systems table
        $scope.createSystemsTable = function () {
            // Use the System 'query' method to send an appropriate GET request        
            var systems = System.query();
            systems.$promise.then(function (populateData) {
                $('#systemtable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'System Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'SSO',
                        title: 'SSO',
						sortable: true
                    }],
                    data: systems
                });
            });
        }
		
				
        // Create a new controller method for retrieving a single application's details
        $scope.createAppDetail = function() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			});
            var app = $routeParams.applicationName;
			app = app.replace(/-%/g , "/");
            // Use the Application 'get' method to send an appropriate GET request
            var application = Application.query();
			var appid = '';
			var interfaces = Interface.query();
            application.$promise.then(function (populateData) {
                $.each(application, function (key, val) {
					if ([val.Name] == app) {
						$scope.appId = val.Id;
						appid = val.Id;
						$scope.appName = val.Name;
						$scope.appDescription = val.Description;
						$scope.appCloud = val.Cloud;
						$scope.appBusPOC = val.BusinessPOC;
						$scope.appOwner = val.Owner;
						$scope.appInvestment = val.Investment;
						$scope.appSSO = val.SSO;
						$scope.appStatus = val.Status;
						$scope.appStatusChangeDate = val.StatusChangeDate;
						$scope.appPlatform = val.TechnologyPlatform;
						$scope.appSystem = val.System;
						$scope.appTechPOC = val.TechnicalPOC;
					}
					
				});
				interfaces.$promise.then(function (populateData) {
					$.each(interfaces, function (key, val) {
						if (val.Appid == appid || val.RefAppid == appid) {
							d3.select("#interfacetab").style("display", "block");
						}
					});
				});
			});
        }

                // Create a new controller method for retrieving a single application's details
        $scope.getRelatedTech = function(appId) {
            // Use the Application 'get' method to send an appropriate GET request
            var appmap = AppTechMap.query();
            var techlist = [];
            appmap.$promise.then(function (populateData) {
                $.each(appmap, function (key, val) {
                    if ([val.Appid] == appId) {
                        techlist.push(val.Techid);
                    }
                });
                var tech = ITStandard.query();
                tech.$promise.then(function (populateData) {
                    var apptechnames = [];
                    for (var i = 0; i < tech.length; i++) {
                        var tmptechid = techlist[i];
                        for (var ind = 0; ind < tech.length; ind++) {
                            var tmpstandid = tech[ind].Id;
                            if (tmptechid === tmpstandid) {
                                apptechnames.push({"Name" : tech[ind].Name, "Category" : tech[ind].Category});
                            }
                            else {
                                continue
                            }
                        }
                    }
                    $scope.apptech = apptechnames;
                });
            });
        }

            // Create a new controller method for retrieving a single application's details
        $scope.getRelatedFuncs = function(appId) {
            // Use the FuncAppMap 'get' method to send an appropriate GET request
            var funcmap = FuncAppMap.query();
            var funclist = [];
			var appfuncnames = [];
            funcmap.$promise.then(function (populateData) {
                $.each(funcmap, function (key, val) {
                    if ([val.Appid] == appId) {
                        funclist.push(val.Funcid);
                    }
                });
				if (funclist.length == 0){
					$scope.appfuncs = [];
				}
				else {
					var func = BusFunction.query();
					func.$promise.then(function (populateData) {
						
						for (var i = 0; i < func.length; i++) {
							var tmpfuncid = funclist[i];
							for (var ind = 0; ind < func.length; ind++) {
								var tmpfuncsid = func[ind].Id;
								if (tmpfuncid === tmpfuncsid) {
									appfuncnames.push({"Name" : func[ind].Name, "Description" : func[ind].Description});
								}
								else {
									continue
								}
							}
						}
						$scope.appfuncs = appfuncnames;
					});
				}
            });
        }
		
				
		// Controller method for Application Interface Chart
        $scope.createInterfaceChart = function () {
			var apps = Application.query();
			var ssolist = [];
			var interfacelist = [];
			var providerid = '';
			var consumerid = '';
			var finallist = [];
			apps.$promise.then(function (findApplications) {
			var interfaces = Interface.query();
				interfaces.$promise.then(function (populateData) {
					var count = [];
					var interfacelist = [];
					var ownerlist = [];
					$.each(interfaces, function (key, val) {
						providerid = val.Appid;
						consumerid = val.RefAppid;
						$.each(apps, function (key, val){
							if (providerid == val.Id){
								var owner = val.Owner;
								ownerlist.push({'owner' : owner});
							}
						});
					});
					var count = [];
					$.each(ownerlist, function (key, val) {
						var item = [val.owner];
						count[item] = count[item] + 1 || 1;
					});
					var orglist = [];
					for (var i in count) {
						if (i == '') {
							orglist.push({"sso" : "Unknown", "size" : count[i]});
						}
						else {
							orglist.push({"sso" : i, "size" : count[i]});
						}
					}
					var sso = '';
					var size = '';
					var finterfacelist = [];
					var name = '';
					var appname = '';
					var appowner = '';
					var appownerlist = [];
					$.each(orglist, function (key, val){
						finterfacelist = [];
						name = val.sso;
						size = val.size;
						$.each(interfaces, function (key, val){
							var providerid = val.Appid;
							var consumerid = val.RefAppid;
							$.each(apps, function (key, val){
								if (providerid == val.Id && name == val.Owner){
									$.each(apps, function (key, val){
										if (consumerid == val.Id){
											appowner = val.Owner;
										}
									});
									finterfacelist.push({'appowner' : appowner});
								}
							
							});
						});
						//just get unique orgs from interface list
						var count = [];
						$.each(finterfacelist, function (key, val) {
							var item = [val.appowner];
							count[item] = count[item] + 1 || 1;
						});
						
						for (var i in count) {
							appownerlist.push(i);
							
						}
						finallist.push({'sso' : name, 'size' : size, 'imports' : appownerlist});
						appownerlist = [];
					});
					
					//************************************************************************
					// END OF DATA FORMATTING
					//************************************************************************
					
					var mpr = chordMpr(finallist);
					_.each(finallist, function (elem) {
						mpr.addToMap(elem.sso)
					})
					mpr.setFilter(function (row, a, b) {
						return (row.sso === a.name)
					})
					.setAccessor(function (recs, a, b) {
						if (!recs[0]) return 0;
						var n = 0;
						_.each(recs, function (r) {
						  _.each(r.imports, function (i) {
							if (i === b.name) n++;
						  });
						});
						return n;
					  });
					  drawChords(mpr.getMatrix(), mpr.getMap());
					  //*******************************************************************
					  //  DRAW THE CHORD DIAGRAM
					  //*******************************************************************
					  function drawChords (matrix, mmap) {
						var w = 700, h = 600, r1 = h / 2, r0 = r1 - 100;
						var fill = d3.scale.ordinal()
							.range(['#c7b570','#c6cdc7','#335c64','#768935','#507282','#5c4a56','#aa7455','#574109','#837722','#73342d','#0a5564','#9c8f57','#7895a4','#4a5456','#b0a690','#0a3542',]);

						var chord = d3.layout.chord()
							.padding(.04)
							.sortSubgroups(d3.descending)
							.sortChords(d3.descending);

						var arc = d3.svg.arc()
							.innerRadius(r0)
							.outerRadius(r0 + 20);

						var svg = d3.select("#interfacechart").append("svg:svg")
							.attr("width", w)
							.attr("height", h)
						  .append("svg:g")
							.attr("id", "circle")
							.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

							svg.append("circle")
								.attr("r", r0 + 20);

						var rdr = chordRdr(matrix, mmap);
						chord.matrix(matrix);

						var g = svg.selectAll("g.group")
							.data(chord.groups())
						    .enter().append("svg:g")
							.attr("class", "group")
							.on("mouseover", mouseover)
							.on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") })
							.on("click", function (d) { 
								$location.path('/application_interfaces_BySSO/' + this.textContent);
								$scope.$apply();
							});

						g.append("svg:path")
							.style("stroke", "black")
							.style("fill", function(d) { return fill(rdr(d).gname); })
							.attr("d", arc);

						g.append("svg:text")
							.each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
							.attr("dy", ".35em")
							.style("font-family", "helvetica, arial, sans-serif")
							.style("font-size", "10px")
							.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
							.attr("transform", function(d) {
							  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
								  + "translate(" + (r0 + 26) + ")"
								  + (d.angle > Math.PI ? "rotate(180)" : "");
							})
							.text(function(d) { return rdr(d).gname; });

						  var chordPaths = svg.selectAll("path.chord")
								.data(chord.chords())
							  .enter().append("svg:path")
								.attr("class", "chord")
								.style("stroke", function(d) { return d3.rgb(fill(rdr(d).sname)).darker(); })
								.style("fill", function(d) { return fill(rdr(d).sname); })
								.attr("d", d3.svg.chord().radius(r0))
								.on("mouseover", function (d) {
								  d3.select("#tooltip")
									.style("visibility", "visible")
									.html(chordTip(rdr(d)))
									.style("top", function () { return (d3.event.pageY - 170)+"px"})
									.style("left", function () { return (d3.event.pageX - 100)+"px";})
								})
								.on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

						  function chordTip (d) {
							var p = d3.format(".1%"), q = d3.format(",.2r")
							return "Interface Details:<br/>"
							  +  d.sname + " → " + d.tname
							  + ": " + q(d.svalue) + "<br/>"
							  + p(d.svalue/d.stotal) + " of " + d.sname + "'s Total (" + q(d.stotal) + ")<br/>"
							  + p(d.svalue/d.mtotal) + " of Total Interfaces (" + q(d.mtotal) + ")<br/>"
							  + "<br/>"
							  + d.tname + " → " + d.sname
							  + ": " + q(d.tvalue) + "<br/>"
							  + p(d.tvalue/d.ttotal) + " of " + d.tname + "'s Total (" + q(d.ttotal) + ")<br/>"
							  + p(d.tvalue/d.mtotal) + " of Total Interfaces (" + q(d.mtotal) + ")";
						  }

						  function groupTip (d) {
							var p = d3.format(".1%"), q = d3.format(",.2r")
							return "System Owner:<br/>"
								+ d.gname + " : " + q(d.gvalue) + "<br/>"
								+ p(d.gvalue/d.mtotal) + " of Total Interfaces (" + q(d.mtotal) + ")"
						  }

						  function mouseover(d, i) {
							d3.select("#tooltip")
							  .style("visibility", "visible")
							  .html(groupTip(rdr(d)))
							  .style("top", function () { return (d3.event.pageY - 80)+"px"})
							  .style("left", function () { return (d3.event.pageX - 130)+"px";})

							chordPaths.classed("fade", function(p) {
							  return p.source.index != i
								  && p.target.index != i;
							});
						  }
					  }
					  
					//*******************************************************************
					//  CHORD MAPPER 
					//*******************************************************************
					
					function chordMpr (finallist) {
					  var mpr = {}, mmap = {}, n = 0,
						  matrix = [], filter, accessor;

					  mpr.setFilter = function (fun) {
						filter = fun;
						return this;
					  },
					  mpr.setAccessor = function (fun) {
						accessor = fun;
						return this;
					  },
					  mpr.getMatrix = function () {
						matrix = [];
						_.each(mmap, function (a) {
						  if (!matrix[a.id]) matrix[a.id] = [];
						  _.each(mmap, function (b) {
						   var recs = _.filter(finallist, function (row) {
							  return filter(row, a, b);
							})
							matrix[a.id][b.id] = accessor(recs, a, b);
						  });
						});
						return matrix;
					  },
					  mpr.getMap = function () {
						return mmap;
					  },
					  mpr.printMatrix = function () {
						_.each(matrix, function (elem) {
						  console.log(elem);
						})
					  },
					  mpr.addToMap = function (value, info) {
						if (!mmap[value]) {
						  mmap[value] = { name: value, id: n++, data: info }
						}
					  },
					  mpr.addValuesToMap = function (varName, info) {
						var values = _.uniq(_.pluck(data, varName));
						_.map(values, function (v) {
						  if (!mmap[v]) {
							mmap[v] = { name: v, id: n++, data: info }
						  }
						});
						return this;
					  }
					  return mpr;
					}
					
					//*******************************************************************
					//  CHORD READER
					//*******************************************************************
					
					function chordRdr (matrix, mmap) {
					  return function (d) {
						var i,j,s,t,g,m = {};
						if (d.source) {
						  i = d.source.index; j = d.target.index;
						  s = _.where(mmap, {id: i });
						  t = _.where(mmap, {id: j });
						  m.sname = s[0].name;
						  m.sdata = d.source.value;
						  m.svalue = +d.source.value;
						  m.stotal = _.reduce(matrix[i], function (k, n) { return k + n }, 0);
						  m.tname = t[0].name;
						  m.tdata = d.target.value;
						  m.tvalue = +d.target.value;
						  m.ttotal = _.reduce(matrix[j], function (k, n) { return k + n }, 0);
						} else {
						  g = _.where(mmap, {id: d.index });
						  m.gname = g[0].name;
						  m.gdata = g[0].data;
						  m.gvalue = d.value;
						}
						m.mtotal = _.reduce(matrix, function (m1, n1) { 
						  return m1 + _.reduce(n1, function (m2, n2) { return m2 + n2}, 0);
						}, 0);
						return m;
					  }
					}	  
				});
			});
        }
		
		// Controller method for Interfaces by SSO chart
        $scope.createInterfaceSSOChart = function (appId, orgId) {
			var appid = appId;
			var orgid = orgId;
			var apps = Application.query();
			var interfacelist = [];
			var providerid = '';
			var consumerid = '';
			var finallist = {};
			var uniquelist = [];
			apps.$promise.then(function (findApplications) {
			var interfaces = Interface.query();
				interfaces.$promise.then(function (populateData) {
					var count = [];
					var applist = [];
					var app = '';
					var appowner = '';
					var source = '';
					var target = '';
					$.each(interfaces, function (key, val) {
						if (val.Appid == appId || val.RefAppid == appId || appId == 'all') {
							providerid = val.Appid;
							consumerid = val.RefAppid;
							$.each(apps, function (key, val){
								if (providerid == val.Id && (orgid == 'all' || orgid == val.Owner)){
									app = val.Name;
									appowner = val.Owner;
									source = app;
									applist.push({'name' : app, 'group' : appowner})
									$.each(apps, function (key, val){
										if (consumerid == val.Id){
											app = val.Name;
											appowner = val.Owner;
											target = app;
											applist.push({'name' : app, 'group' : appowner});
										}
									});
								}
								else if (consumerid == val.Id && (orgid =='all' || orgid == val.Owner)){
									app = val.Name;
									appowner = val.Owner;
									target = app;
									applist.push({'name' : app, 'group' : appowner})
									$.each(apps, function (key, val){
										if (providerid == val.Id){
											app = val.Name;
											appowner = val.Owner;
											source = app;
											applist.push({'name' : app, 'group' : appowner});
										}
									});
								}
								
							});
							uniquelist = _.uniq(applist, function(item, key, name) { 
								return item.name;
							});
							var sourceindex = $.map(uniquelist, function(obj, index) {
								if(obj.name == source) {
									return index;
								}
							})
							sourceindex = sourceindex[0];
							var targetindex = $.map(uniquelist, function(obj, index) {
								if(obj.name == target) {
									return index;
								}
							})
							targetindex = targetindex[0];
							if (sourceindex != undefined && targetindex != undefined){
								interfacelist.push({'source' : sourceindex, 'target' : targetindex});
							}
						}
					});

					
				finallist = {"nodes" : uniquelist, "links" : interfacelist};
					
					//Constants for the SVG
					var width = 700,
					height = 500;

					//Set up the colour scale
					var color = d3.scale.category20();

					//Set up the force layout
					var force = d3.layout.force()
						.charge(-120)
						.linkDistance(30)
						.size([width, height]);
						
						
					var node_drag = d3.behavior.drag()
						.on("dragstart", dragstart)
						.on("drag", dragmove)
						.on("dragend", dragend);
					function dragstart(d, i) {
						force.stop() // stops the force auto positioning before you start dragging
					}
					function dragmove(d, i) {
						d.px += d3.event.dx;
						d.py += d3.event.dy;
						d.x += d3.event.dx;
						d.y += d3.event.dy;
					}
					function dragend(d, i) {
						d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
						force.resume();
					}
					function releasenode(d) {
						d.fixed = false; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
						//force.resume();
					}	
						
						

					//Append a SVG to the body of the html page. Assign this SVG as an object to svg
					var svg = d3.select("#interfacessochart").append("svg")
						.attr("width", width)
						.attr("height", height)
						.attr("id", "interfacesvg");
					//Read the data from the finallist element 
					var graph = finallist;

			
					var padding = 10, // separation between circles
						radius=8;
					function collide(alpha) {
					  var quadtree = d3.geom.quadtree(graph.nodes);
					  return function(d) {
						var rb = 2*radius + padding,
							nx1 = d.x - rb,
							nx2 = d.x + rb,
							ny1 = d.y - rb,
							ny2 = d.y + rb;
						quadtree.visit(function(quad, x1, y1, x2, y2) {
						  if (quad.point && (quad.point !== d)) {
							var x = d.x - quad.point.x,
								y = d.y - quad.point.y,
								l = Math.sqrt(x * x + y * y);
							  if (l < rb) {
							  l = (l - rb) / l * alpha;
							  d.x -= x *= l;
							  d.y -= y *= l;
							  quad.point.x += x;
							  quad.point.y += y;
							}
						  }
						  return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
						});
					  };
					}
	
					  force
						  .nodes(graph.nodes)
						  .links(graph.links)
						  .start();

					  var link = svg.selectAll(".link")
						  .data(graph.links)
						  .enter().append("line")
						  .attr("class", "link")
						  .style("stroke-width", function(d) { return Math.sqrt(d.value); });

						var node = svg.selectAll(".node")
								.data(graph.nodes)
								.enter().append("g")
								.attr("class", "node")
								.on('dblclick', releasenode)
								.call(node_drag) //Added 
							    .on('click', connectedNodes); //Added code 
						node.append("circle")
							.attr("r", 8)
							.style("fill", function (d) {
							return color(d.group);
						})		
								
					  node.append("text")
							  .attr("dx", 10)
							  .attr("dy", ".35em")
							  .text(function(d) { return d.name });
					
				  force.on("tick", function() {
						   link.attr("x1", function (d) {
								return d.source.x;
							})
								.attr("y1", function (d) {
								return d.source.y;
							})
								.attr("x2", function (d) {
								return d.target.x;
							})
								.attr("y2", function (d) {
								return d.target.y;
							});
							d3.selectAll("circle").attr("cx", function (d) {
								return d.x;
							})
								.attr("cy", function (d) {
								return d.y;
							});
							d3.selectAll("text").attr("x", function (d) {
								return d.x;
							})
								.attr("y", function (d) {
								return d.y;
							});	
							node.each(collide(0.5)); //Added 
					  });      
					   
					  
					  //---Insert-------

					//Toggle stores whether the highlighting is on
					var toggle = 0;

					//Create an array logging what is connected to what
					var linkedByIndex = {};
					for (var i = 0; i < graph.nodes.length; i++) {
						linkedByIndex[i + "," + i] = 1;
					};
					graph.links.forEach(function (d) {
						linkedByIndex[d.source.index + "," + d.target.index] = 1;
					});

					//This function looks up whether a pair are neighbours  
					function neighboring(a, b) {
						return linkedByIndex[a.index + "," + b.index];
					}

					function connectedNodes() {
						if (toggle == 0) {
							//Reduce the opacity of all but the neighbouring nodes
							var d = d3.select(this).node().__data__;
							node.style("opacity", function (o) {
								return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
							});
							
							link.style("opacity", function (o) {
								return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
							});
							
							//Reduce the op
							toggle = 1;
						} else {
							//Put them back to opacity=1
							node.style("opacity", 1);
							link.style("opacity", 1);
							toggle = 0;
						}
					}
				});	
							
			});
		}
			
	
        // Controller method for Application by SSO pie chart on dashboard
        $scope.createAppBySSOChart = function () {
             // Use the Application 'query' method to send an appropriate GET request   
            var apps = Application.query();
			$('#appssobody').html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
            apps.$promise.then(function (populateData) {
				$('#appssobody').html('<svg id="appssochart" class="dashboard"></svg>');
                var count = [];
                $.each(apps, function (key, val) {
                    if ([val.Status] != 'Retired') {
                        var item = [val.SSO];
                        count[item] = count[item] + 1 || 1;
                    }
                });
                var result = [];
                for (var i in count) {
                    if (i == '') {
                        result.push({"key" : "Unknown", "y" : count[i]});
                    }
                    else {
                        result.push({"key" : i, "y" : count[i]});
                    }
                }
                result.sort();
                nv.addGraph(function() {
                    var chart = nv.models.pieChart()
                        .x(function(d) { return d.key })
                        .y(function(d) { return d.y })
                        .showLabels(false)
						.valueFormat(d3.format('d'))
                    d3.select("#appssochart")
                        .datum(result)
                        .transition().duration(1200)
                        .call(chart)
                    chart.pie.dispatch.on("elementClick", function(e) {
                        $location.path('/applications_BySSO/' + e.label);
                        $scope.$apply();
                        $('.nvtooltip').empty()
                    });
                    chart.legend.dispatch.on("legendClick", function(t) {
                        $location.path('/applications_BySSO/' + t.key);
						$scope.$apply();
                    });
                    return chart;
                });  
            })
			.catch(function error(msg) {
				console.error(msg);
				$('#appssobody').html('<p>System Architect services are not available at this time</p>');
			});
        }
	}	
]);