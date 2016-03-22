//MODULE , app inicializálása
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTING
weatherApp.config(function($routeProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
    })
        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
    })
      .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
    })
    
});

//SERVICES

weatherApp.service('searchCity', function() {
    
    var self = this;
    
    self.city = '';
    
    
});

//CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'searchCity', '$location',function($scope, searchCity, $location) {
    
    $scope.city = searchCity.city;
    
    $scope.$watch('city', function() {
       
        searchCity.city = $scope.city;
        
    });
    
    $scope.submit = function() {
        
        if($scope.city == 0) {
            
            return false;
            
        } else {
            
            $location.path("/forecast");
            
        };
        
        
    };
    
    
}]);

weatherApp.controller('forecastController', ['$scope','$resource', 'searchCity', '$routeParams', function($scope, $resource, searchCity, $routeParams) {
    
    $scope.city = searchCity.city;
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=14344b24da22072d3bd6a9cb069116b0", {callback: "JSON_CALLBACK"}, { get: { method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    $scope.convertToCelsius = function(degK) {
        return Math.round(degK - 272.15);
    };
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);  
    };
    
    $scope.description = function(desc) {
        return desc;
    };
    
}]);

//DIRECTIVES

weatherApp.directive('forecastPanel', function() {
    
    return {
      
        restrict: 'AECM',
        templateUrl: 'directives/forecastPanel.htm',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@",
            description: "&"
        }
        
    };

});
