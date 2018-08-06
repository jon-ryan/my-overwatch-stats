
var app = angular.module('overwatch-stats-app', []);

app.controller('content-controller', function($scope) {
    //
    $scope.showOverview = true;
    $scope.showSettings = false;

    $scope.showSettingsContainer = function(){
        // modify the content
        $scope.showOverview = false;
        $scope.showSettings = true;

        // modify the nav bar
        var overviewLink = document.getElementById("overview");
        var settingsLink = document.getElementById("settings");

        overviewLink.setAttribute("class", "");
        settingsLink.setAttribute("class", "active");


    }

    $scope.showOverviewContainer = function(){
        // modify the content
        $scope.showOverview = true;
        $scope.showSettings = false;

        // modify the nav bar
        var overviewLink = document.getElementById("overview");
        var settingsLink = document.getElementById("settings");

        overviewLink.setAttribute("class", "active");
        settingsLink.setAttribute("class", "");
    }
});