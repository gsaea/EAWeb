// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('BusinessController', ['$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'ngTableParams', 'Organization', 'BusFunction', 'OrgAppMap', 'OrgGoalMap', 'OrgSysMap', 'System', 'Application', 'Interface',
    function ($scope, $http, $routeParams, $filter, $location, $sce, ngTableParams, Organization, BusFunction, OrgAppMap, OrgGoalMap, OrgSysMap, System, Application, Interface) {
        // Controller method for Organizations table
        $scope.createOrgTable = function () {
            var organizations = Organization.query();
            organizations.$promise.then(function (populateData) {
                $('#orgtable').bootstrapTable({
                    columns: [{
                        field: 'Name',
                        title: 'Organization Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'Parent',
                        title: 'Parent',
						sortable: true
                    }],
                    data: organizations
                });
            });
        }
		
		
		        // Create a new controller method for retrieving a single organization's details
        $scope.createOrgDetail = function() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			});
            var org = $routeParams.organizationName;
			org = org.replace(/-%/g , "/");
            // Use the ps 'get' method to send an appropriate GET request
            var organization = Organization.query();
			var application = Application.query();
			var interfaces = Interface.query();
			var orgname = '';
			var appid = '';
            organization.$promise.then(function (populateData) {
                $.each(organization, function (key, val) {
                    if ([val.Name] == org) {
                        $scope.orgId = val.Id;
                        $scope.orgName = val.Name;
						orgname = val.Name;
                        $scope.orgDescription = val.Description;
						$scope.orgParent = val.Parent;
                    }
                });
				application.$promise.then(function (populateData) {
					interfaces.$promise.then(function (populateData) {
						$.each(application, function (key, val) {
							if ([val.Owner] == orgname) {
								appid = val.Id;
								$.each(interfaces, function (key, val) {
									if (val.Appid == appid || val.RefAppid == appid) {
										d3.select("#interfacetab").style("display", "block");
									}
								});
							};
						});
					});
				});
			});
        }
		
		                // Create a new controller method for retrieving a single organization's details
        $scope.getRelatedSys = function(orgId) {
            // Use the Application 'get' method to send an appropriate GET request
            var sysmap = OrgSysMap.query();
            var syslist = [];
            sysmap.$promise.then(function (populateData) {
                $.each(sysmap, function (key, val) {
                    if ([val.Orgid] == orgId) {
                        syslist.push(val.Sysid);
                    }
                });
                var sys = System.query();
                sys.$promise.then(function (populateData) {
                    var orgsysnames = [];
                    for (var i = 0; i < sys.length; i++) {
                        var tmpsystid = syslist[i];
                        for (var ind = 0; ind < sys.length; ind++) {
                            var tmpsysid = sys[ind].Id;
                            if (tmpsystid === tmpsysid) {
                                orgsysnames.push({"Name" : sys[ind].Name, "Description" : sys[ind].Description});
                            }
                            else {
                                continue
                            }
                        }
                    }
                    $scope.orgSys = orgsysnames;
                });
            });
			// Use the Application 'get' method to send an appropriate GET request
            var appmap = OrgAppMap.query();
            var applist = [];
            appmap.$promise.then(function (populateData) {
                $.each(appmap, function (key, val) {
                    if ([val.Orgid] == orgId) {
                        applist.push(val.Appid);
                    }
                });
                var app = Application.query();
                app.$promise.then(function (populateData) {
                    var orgappnames = [];
                    for (var i = 0; i < app.length; i++) {
                        var tmpappsid = applist[i];
                        for (var ind = 0; ind < app.length; ind++) {
                            var tmpappid = app[ind].Id;
                            if (tmpappsid === tmpappid) {
                                orgappnames.push({"Name" : app[ind].Name, "Description" : app[ind].Description});
                            }
                            else {
                                continue
                            }
                        }
                    }
                    $scope.orgApps = orgappnames;
                });
            });
			
        }
		
		
		
		
		
		//Controller method for Business Functions Table
        $scope.createFuncTable = function () {
            var funcs = BusFunction.query();
            funcs.$promise.then(function (populateData) {
          	$('#capabilitytable').bootstrapTable({
                    columns: [{
                        field: 'ReferenceNum',
                        title: 'Id',
						sortable: true
                    }, {
                        field: 'Name',
                        title: 'Function Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'BRMParent',
                        title: 'Parent',
						sortable: true
                    }],
                    data: funcs
                });
            });
        }
		$scope.removePag = function(){
			$(".report").attr("data-pagination", false);
		}
		
		//Controller method for creating the Org Chart view
		$scope.createOrgChart = function () {
            var orgs = Organization.query();
            var parentorg = 'Office of the Administrator (A)';
			var twoletter = [];
			var oneletter = [];
			var orglist = [];
			var olo = '';
			var tlo = '';
			var desc = '';
			var parentdesc = '';
			orgs.$promise.then(function (populateData) {
				//create an array of one letter offices
				$.each(orgs, function (key, val) {
					if ([val.Name] == parentorg) {
						parentdesc = val.Description;
					}
				});
				$.each(orgs, function (key, val) {
                    if ([val.Parent] == parentorg) {
						olo = val.Name;
						desc = val.Description;
						$.each(orgs, function (key, val) {
							if ([val.Parent] == olo) {
								tlo = val.Name;
								twoletter.push({'name' : tlo, 'parent' : val.Parent, 'description' : val.Description});	
							}
						});
						oneletter.push({'name' : olo, 'parent' : parentorg, 'description' : desc, 'children' : twoletter});
						twoletter = [];
					}
				});
				orglist = {'name' : parentorg, 'description' : parentdesc, 'children' : oneletter};		
		
				var m = [20, 120, 20, 120],
				w = 1280 - m[1] - m[3],
				h = 700 - m[0] - m[2],
				i = 0,
				root;

				var tree = d3.layout.tree()
					.size([h, w]);

				var diagonal = d3.svg.diagonal()
					.projection(function(d) { return [d.y, d.x]; });

				var vis = d3.select("#orgchart").append("svg:svg")
					.attr("width", w + m[1] + m[3])
					.attr("height", h + m[0] + m[2])
					.attr("id", "org")
					.append("svg:g")
					.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

				
				
				
				root = orglist;
				root.x0 = h / 2;
				root.y0 = 0;

				function toggleAll(d) {
					if (d.children) {
					  d.children.forEach(toggleAll);
					  toggle(d);
					}
				}
		/*		function showDetail(d){
					var	showDet = d3.select("orgdet");
					showDet.on("mouseover", function(d){
						d3.select("#orgdetail").style("display", "none");
					});
				}  */
				// Initialize the display to show a few nodes.
				root.children.forEach(toggleAll);
				//	toggle(root.children[1]);
				//	toggle(root.children[1].children[2]);
				//	toggle(root.children[9]);
				//	toggle(root.children[9].children[0]);

				update(root);

				
				function update(source) {
					var duration = d3.event && d3.event.altKey ? 5000 : 500;
					// Compute the new tree layout.
					var nodes = tree.nodes(root).reverse();
					// Normalize for fixed-depth.
					nodes.forEach(function(d) { d.y = d.depth * 180; });
					// Update the nodes…
					var node = vis.selectAll("g.node")
						.data(nodes, function(d) { return d.id || (d.id = ++i); });

					// Enter any new nodes at the parent's previous position.
					var nodeEnter = node.enter().append("svg:g")
						
						.attr("class", "node")
						
						
						.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
						
						
						.on("click", function(d) { toggle(d); update(d); })
					
						
					
					
					
					
					
						.on("mouseover", function(d){
							d3.select("#orgdetail").style("display", "block");
							d3.select("#orgdetailheader").text = "";
							d3.select("#orgdetailbody").text = "";
							$scope.selectedapp = d.name;
							var b = d3.select("#orgdetailbody")
								.text("");
							var a = d3.select("#orgname")
								.text("");
							var info2 = b.append('text')
								.classed('info2', true)
								.text(d.description);
							var a = d3.select("#orgname");	
							var info = a.append('text')
								.classed('info', true)
								.text(d.name);
							
						});
						
				/*	    .on("mouseout", function() {
							d3.select("#orgdetailbody").select('text.info2').remove();
							d3.select("#orgdetailheader").select('text.info').remove();
							d3.select("#orgdetail").style("display", "none");
					    });	    */
					
					
					nodeEnter.append("svg:circle")
						.attr("r", 1e-6)
						
						.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
					    
						
					nodeEnter.append("svg:text")
						.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
						.attr("dy", ".35em")
						.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
						.text(function(d) { return d.name; })
						.style("fill-opacity", 1e-6);
						
						

					// Transition nodes to their new position.
					var nodeUpdate = node.transition()
						.duration(duration)
						.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

					nodeUpdate.select("circle")
						.attr("r", 4.5)
						.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

					nodeUpdate.select("text")
						.style("fill-opacity", 1);

					// Transition exiting nodes to the parent's new position.
					var nodeExit = node.exit().transition()
						.duration(duration)
						.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
						.remove();

					nodeExit.select("circle")
						.attr("r", 1e-6);

					nodeExit.select("text")
						.style("fill-opacity", 1e-6);

					// Update the links…
					var link = vis.selectAll("path.link")
						.data(tree.links(nodes), function(d) { return d.target.id; });

					// Enter any new links at the parent's previous position.
					link.enter().insert("svg:path", "g")
						.attr("class", "link")
						.attr("d", function(d) {
							var o = {x: source.x0, y: source.y0};
							return diagonal({source: o, target: o});
						})
						.transition()
						.duration(duration)
						.attr("d", diagonal);

					// Transition links to their new position.
					link.transition()
						.duration(duration)
						.attr("d", diagonal);

					// Transition exiting nodes to the parent's new position.
					link.exit().transition()
						.duration(duration)
						.attr("d", function(d) {
							var o = {x: source.x, y: source.y};
							return diagonal({source: o, target: o});
						})
						.remove();

					// Stash the old positions for transition.
					nodes.forEach(function(d) {
						d.x0 = d.x;
						d.y0 = d.y;
					});
					var orgdetail = d3.select('#orgdet');
					var orgclose = d3.select('#orgclose');

					orgdetail.on("click", function(){
						var orgpath = $scope.selectedapp;
						orgpath = orgpath.replace(/\//g , "-%")
						$location.path('/organization/' + orgpath);
						$scope.$apply();
					}); 
					
					orgclose.on("click", function(d){
						d3.select("#orgdetail").style("display", "none");
					});
					
					
				}

				


				// Toggle children.
				function toggle(d) {
					if (d.children) {
						d._children = d.children;
						d.children = null;
					} else {
						d.children = d._children;
						d._children = null;
					}
				}
				 
			});

		}
		
        $scope.createCapabilityTree = function () {
            var funcs = BusFunction.query();
            var parentfunction = '';
			var parentdesc = '';
            var l1 = [];
			var l1name = '';
			var l1desc = '';
			var l2 = [];
			var l2name = '';
			var l2desc = '';
			var l2size = 15;
			var l3 = [];
			var l3name = '';
			var l3desc = '';
			var l3size = 15;
			var l4 = [];
			var l4name = '';
			var l4desc = '';
			var l4size = 15;
			var l5 = [];
			var l5name = '';
			var l5size = 15;
            funcs.$promise.then(function (populateData) {
				//Get the name of the Parent Function and assign it to the 'parentfunction' variable
                $.each(funcs, function (key, val) {
                    if ([val.BRMParent] == "") {
                        parentfunction = val.Name;
						parentdesc = val.Description;
                    }
                });
				
				
				//Populate 'l2' array by finding the children of the 'parentfunction'
                $.each(funcs, function (key, val) {
                    if ([val.BRMParent] == parentfunction) {
                        l1name =  val.Name;
						l1desc = val.Description;
                        $.each(funcs, function (key, val){
                            if ([val.BRMParent] == l1name) {
								l2name = val.Name;
								l2desc = val.Description;
								$.each(funcs, function (key, val){
									if ([val.BRMParent] == l2name) {
										l3name = val.Name;
										l3desc = val.Description;
										$.each(funcs, function (key, val){
											if ([val.BRMParent] == l3name) {
												l4name = val.Name;
												l4desc = val.Description;
												$.each(funcs, function (key, val){
													if ([val.BRMParent] == l4name) {
														l5name = val.Name;
														l5.push({'name' : l5name, 'parent' : val.BRMParent, 'size' : l5size, 'description' : val.Description});
													}									
												});
												l4.push({'name' : l4name, 'description' : l4desc, 'size' : l4size, 'children' : l5});
												l5 = [];
											}
										});
										l3.push({'name' : l3name, 'description' : l3desc, 'size' : l3size, 'children' : l4});
										l4 = [];
									}
								});
								l2.push({'name' : l2name, 'description' : l2desc, 'size' : l2size, 'children' : l3 });
								l3 = [];
							}
						});
						l1.push({'name' : l1name, 'description' : l1desc, 'children' : l2});
						l2 = [];
					}
				});	
				var capdata = {'name' : parentfunction, 'description' : parentdesc, 'children' : l1 };



var root = capdata;
var w = 1120,
    h = 600,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]);

var vis = d3.select("#buschart").append("div")
    .attr("class", "chart")
    .style("width", w + "px")
    .style("height", h + "px")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

  var g = vis.selectAll("g")
      .data(partition.nodes(root))
    .enter().append("svg:g")
      .attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; })
      .on("click", click);

  var kx = w / root.dx,
      ky = h / 1;

  g.append("svg:rect")
      .attr("width", root.dy * kx)
      .attr("height", function(d) { return d.dx * ky; })
      .attr("class", function(d) { return d.children ? "parent" : "child"; });

  g.append("svg:text")
      .attr("transform", transform)
      .attr("dy", ".35em")
      .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; })
      .text(function(d) { return d.name; })

  d3.select(window)
      .on("click", function() { click(root); })

  function click(d) {
    if (!d.children) return;

    kx = (d.y ? w - 40 : w) / (1 - d.y);
    ky = h / d.dx;
    x.domain([d.y, 1]).range([d.y ? 40 : 0, w]);
    y.domain([d.x, d.x + d.dx]);

    var t = g.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; });

    t.select("rect")
        .attr("width", d.dy * kx)
        .attr("height", function(d) { return d.dx * ky; });

    t.select("text")
        .attr("transform", transform)
        .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; });

    d3.event.stopPropagation();
  }

  function transform(d) {
    return "translate(8," + d.dx * ky / 2 + ")";
  }





/*  var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);

var color = d3.scale.category20c();

var svg = d3.select("#buschart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  var g = svg.selectAll("g")
      .data(partition.nodes(capdata))
    .enter().append("g");

  var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
    .on("click", click);

  var text = g.append("text")
    .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
    .attr("x", function(d) { return y(d.y); })
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .text(function(d) { return d.name; });

  function click(d) {
    // fade out all text elements
    text.transition().attr("opacity", 0);

    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d))
      .each("end", function(e, i) {
          // check if the animated element's data e lies within the visible angle span given in d
          if (e.x >= d.x && e.x < (d.x + d.dx)) {
            // get a selection of the associated text element
            var arcText = d3.select(this.parentNode).select("text");
            // fade in the text element and recalculate positions
            arcText.transition().duration(750)
              .attr("opacity", 1)
              .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
              .attr("x", function(d) { return y(d.y); });
          }
      });
  }

d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}      */




        });
		 }
	}
]);