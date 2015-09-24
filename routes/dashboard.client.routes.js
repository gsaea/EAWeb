// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('dashboard').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
        when('/', {
            templateUrl: 'views/dashboard.html'
        }).
		when('/overview', {
			templateUrl: 'dashboard/views/overview.client.view.html'
		}).
		when('/siteoverview', {
			templateUrl: 'views/site_overview.html'
		}).

            //Configure Business Routes
		when('/organizations', {
		    templateUrl: 'views/business_organization_report.html'
		}).
		when('/organization/:organizationName', {
			templateUrl: 'views/business_organization_detail.html'
		}).
		when('/organization_model', {
		    templateUrl: 'views/business_organization_chart.html'
		}).
		when('/capabilities', {
		    templateUrl: 'views/business_function_report.html'
		}).
		when('/capability_model', {
		    templateUrl: 'views/business_function_chart.html'
		}).

            //Configure Strategy Routes
		when('/goals', {
		    templateUrl: 'views/strategy_goal_report.html'
		}).
		when('/investments', {
		    templateUrl: 'views/strategy_investment_report.html'
		}).
		when('/investments/:investmentId', {
			templateUrl: 'views/strategy_investment_report.html'
		}).
		when('/strategic_framework', {
		    templateUrl: 'views/strategy_framework.html'
		}).
		when('/benchmarks', {
		    templateUrl: 'views/strategy_benchmark_report.html'
		}).
		when('/benchmarks/:benchmarkId', {
		    templateUrl: 'views/strategy_benchmark_detail.html'
		}).
		

            //Configure Application Routes
		when('/applications', {
		    templateUrl: 'views/application_application_report.html'
		}).
		when('/applications_retired', {
		    templateUrl: 'views/application_retiredapplication_report.html'
		}).
		when('/applications/:applicationName', {
			templateUrl: 'views/application_application_detail.html'
		}).
		when('/applications_BySSO/:applicationSSO', {
			templateUrl: 'views/application_application_report.html'
		}).
		when('/applications_TIME', {
			templateUrl: 'views/application_time_report.html'
		}).
		when('/systems', {
		    templateUrl: 'views/application_system_report.html'
		}).
		when('/application_interfaces', {
		    templateUrl: 'views/application_interface_chart.html'
		}).
		when('/application_interfaces_BySSO/:interfaceSSO', {
		    templateUrl: 'views/application_interface_sso.html'
		}).
		
		
            //Configure Datasets Routes
		when('/datasets', {
		    templateUrl: 'views/data_dataset_report.html'
		}).


		    //Configure Infrastructure Routes
		when('/itstandards', {
		    templateUrl: 'views/infrastructure_itstandards_report.html'
		}).
		when('/itstandards_ByCategory', {
			templateUrl: 'views/infrastructure_itstandardsbycat_report.html'
		}).
		when('/itstandards_ByCategory/:standardCat', {
			templateUrl: 'views/infrastructure_itstandardsbycat_report.html'
		}).

		    //Configure Security Routes
		when('/FISMA', {
		    templateUrl: 'views/security_fisma_report.html'
		}).
		when('/FISMA_POC', {
		    templateUrl: 'views/security_fismapoc_report.html'
		}).		
		when('/RISSO_POC', {
		    templateUrl: 'views/security_rissopoc_report.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);