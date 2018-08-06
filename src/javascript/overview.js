
var app = angular.module('overwatch-stats-app', []);

app.controller('content-controller', function($scope) {
    //
    $scope.showOverview = true;
    $scope.showSettings = false;
    $scope.showForm = false;

    $scope.showSettingsContainer = function(){
        // modify the content
        $scope.showOverview = false;
        $scope.showSettings = true;
        $scope.showForm = false;

        // modify the nav bar
        var overviewLink = document.getElementById("overview");
        var settingsLink = document.getElementById("settings");
        var matchLink = document.getElementById("match");

        overviewLink.setAttribute("class", "");
        settingsLink.setAttribute("class", "active");
        matchLink.setAttribute("class", "");


    }

    $scope.showOverviewContainer = function(){
        // modify the content
        $scope.showOverview = true;
        $scope.showSettings = false;
        $scope.showForm = false;

        // modify the nav bar
        var overviewLink = document.getElementById("overview");
        var settingsLink = document.getElementById("settings");
        var matchLink = document.getElementById("match");

        overviewLink.setAttribute("class", "active");
        settingsLink.setAttribute("class", "");
        matchLink.setAttribute("class", "");
    }

    $scope.showAddMatch = function(){
        // modify the content
        $scope.showOverview = false;
        $scope.showSettings = false;
        $scope.showForm = true;

        // modify the nav bar
        var overviewLink = document.getElementById("overview");
        var settingsLink = document.getElementById("settings");
        var matchLink = document.getElementById("match");

        overviewLink.setAttribute("class", "");
        settingsLink.setAttribute("class", "");
        matchLink.setAttribute("class", "active");
    }
});

app.controller('form-controller', function($scope){
    // define the heroes
    $scope.heroes = [{id: 'Ana'}, {id: 'Bastion'}, {id: 'Brigitte'}, {id: 'D.VA'}, {id: 'Doomfist'}, {id: 'Genji'}, {id: 'Hanzo'}, {id: 'Junkrat'},
    {id: 'Lúcio'}, {id: 'McCree'}, {id: 'Mei'}, {id: 'Mercy'}, {id: 'Moira'}, {id:"Orisa"}, {id:"Pharah"}, {id: "Reaper"}, {id:"Reinhardt"}, {id:"Zenyatta"},
    {id: 'Roadhog'}, {id: 'Soldier: 76'}, {id: 'Sombra'}, {id: 'Symmetra'}, {id: 'Torbjörn'}, {id: 'Tracer'}, {id: 'Widowmaker'}, {id: 'Winston'}, {id: 'Zarya'}];
});