//
// initialize var to get reference on the the angular app
var app = angular.module('overwatch-stats-app', []);

// define array to store the entries
dbEntries = [];


//
// controller manages the tabs
app.controller('TabController', function($scope){
//
$scope.showOverview = true;
$scope.showSettings = false;
$scope.showForm = false;

// get reference to the nav bar
var overviewLink = document.getElementById("overview");
var settingsLink = document.getElementById("settings");
var matchLink = document.getElementById("match");


$scope.showSettingsContainer = function(){
    // modify the content
    $scope.showOverview = false;
    $scope.showSettings = true;
    $scope.showForm = false;

    overviewLink.setAttribute("class", "");
    settingsLink.setAttribute("class", "active");
    matchLink.setAttribute("class", "");

}



$scope.showOverviewContainer = function(){
    // modify the content
    $scope.showOverview = true;
    $scope.showSettings = false;
    $scope.showForm = false;

    overviewLink.setAttribute("class", "active");
    settingsLink.setAttribute("class", "");
    matchLink.setAttribute("class", "");
}

$scope.showAddMatch = function(){
    // modify the content
    $scope.showOverview = false;
    $scope.showSettings = false;
    $scope.showForm = true;

    overviewLink.setAttribute("class", "");
    settingsLink.setAttribute("class", "");
    matchLink.setAttribute("class", "active");
}
});

//
// ContentController behavior
app.controller('ContentController', function($scope) {
    
    $scope.showContentDelete = false;
    $scope.dbArray = dbEntries;

    $scope.toggleShowContentDelete = function(){
        $scope.showContentDelete = !$scope.showContentDelete;
    }

    $scope.removeItem = function(x){
        dbEntries.splice(x, 1);
    }

});


app.controller('FormController', function($scope){

    // define the heroes
    $scope.heroes = [{id: 'Ana'}, {id: 'Bastion'}, {id: 'Brigitte'}, {id: 'D.VA'}, {id: 'Doomfist'}, {id: 'Genji'}, {id: 'Hanzo'}, {id: 'Junkrat'},
    {id: 'Lúcio'}, {id: 'McCree'}, {id: 'Mei'}, {id: 'Mercy'}, {id: 'Moira'}, {id:"Orisa"}, {id:"Pharah"}, {id: "Reaper"}, {id:"Reinhardt"}, {id:"Zenyatta"},
    {id: 'Roadhog'}, {id: 'Soldier: 76'}, {id: 'Sombra'}, {id: 'Symmetra'}, {id: 'Torbjörn'}, {id: 'Tracer'}, {id: 'Widowmaker'}, {id: 'Winston'}, {id: 'Zarya'},
    {id: 'Wreckingball'}];

    $scope.id = 0;

    $scope.addMatch = function(){
        $scope.id++;
        var wl;
        if($scope.winLoss == -1){
            wl = "Defeat";
        }
        else if($scope.winLoss == 1){
            wl = "Victory";
        }
        else if($scope.winLoss == 0){
            wl = "Draw";
        }
        else{
            wl = "Unknown";
        }

        newEntry = {id: $scope.id, sr: $scope.newsr, matchEnd: wl, scoreBlue: $scope.scoreBlue};
        dbEntries.push(newEntry);
        $scope.newsr = null;
        $scope.scoreBlue = null;
        $scope.winLoss = null;
    }
});


app.controller('SettingsController', function($scope){

});