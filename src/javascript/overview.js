//
// initialize var to get reference on the the angular app
var app = angular.module('overwatch-stats-app', []);

// define array to store the entries
dbEntries = [];

// define the heroes
heroes = [{id: 'Ana', value: "Ana"}, {id: 'Bastion'}, {id: 'Brigitte'}, {id: 'D.VA'}, {id: 'Doomfist'}, {id: 'Genji'}, {id: 'Hanzo'}, {id: 'Junkrat'},
    {id: 'Lúcio'}, {id: 'McCree'}, {id: 'Mei'}, {id: 'Mercy'}, {id: 'Moira'}, {id:"Orisa"}, {id:"Pharah"}, {id: "Reaper"}, {id:"Reinhardt"}, {id:"Zenyatta"},
    {id: 'Roadhog'}, {id: 'Soldier: 76'}, {id: 'Sombra'}, {id: 'Symmetra'}, {id: 'Torbjörn'}, {id: 'Tracer'}, {id: 'Widowmaker'}, {id: 'Winston'}, {id: 'Zarya'},
    {id: 'Wreckingball'}];


// define the maps
maps = [{id: 'Hanamura', value: "Hanamura"}, {id: 'Horizon Lunar Colony'}, {id: 'Temple of Anubis'}, {id: 'Volskaya Industries'}, {id: 'Dorado'},
        {id: 'Junkertown'}, {id: 'Rialto'}, {id: 'Route 66'}, {id: 'Watchpoint: Gibralta'}, {id: 'Blizzard World'},
        {id: 'Eichenwalde'}, {id: 'Hollywood'}, {id: 'King\'s Row'}, {id: 'Numbani'}, {id: 'Ilios'}, {id: 'Lijiang Tower'},
        {id: 'Nepal'}, {id: 'Oasis'}
    ];


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

    // get reference to the hero array
    $scope.heroes = heroes;

    // get reference to the map array
    $scope.maps = maps;

    // setting an id
    $scope.id = 0;

    // function to add a match to the DB
    $scope.addMatch = function(){

        // increase the id
        $scope.id++;

        // var for win/loss
        var wl;

        // get if its a win, loss or draw
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


        var side;

        // get the startingside
        if($scope.startingside == 1){
            side = "Attack";
        }
        else if($scope.startingside == 1){
            side = "Defend";
        }
        else if($scope.startingside == 0){
            side = "Control";
        }
        else{
            side = "Unknown";
        }

        // get the group size
        var groupsize = 0;

        if($scope.friend1 != null){
            groupsize++;
        }
        if($scope.friend2 != null){
            groupsize++;
        }
        if($scope.friend3 != null){
            groupsize++;
        }
        if($scope.friend4 != null){
            groupsize++;
        }
        if($scope.friend5 != null){
            groupsize++;
        }



        // get the date and the current time
        var date = new Date();

        // format for date YYYYMMDD
        // making the month 2 digits (in case with leading 0)
        var month = date.getMonth()+1;
        if(month < 10){
            month = "0" + month.toString();
        }
        else{
            month = month.toString();
        }

        // making the date 2 digits (in case with leading 0)
        var day = date.getDate();
        if(day < 10){
            day = "0" + day.toString();
        }
        else{
            day = day.toString();
        }

        var currentDate = date.getFullYear().toString() + month + day;

        // format HHMMSS
        // making the hours 2 digits (leading 0)
        var hours = date.getHours();
        if(hours < 10){
            hours = "0" + hours.toString();
        }
        else{
            hours = hours.toString();
        }

        // making minues 2 digits (leading 0)
        var minutes = date.getMinutes();
        if(minutes < 10){
            minutes = "0" + minutes.toString();
        }
        else{
            minutes = minutes.toString();
        }

        // making seconds 2 digits (leading 0)
        var seconds = date.getSeconds();
        if(seconds < 10){
            seconds = "0" + seconds.toString();
        }
        else{
            seconds = seconds.toString();
        }
        var currentTime = hours + minutes + seconds;




        // specify the map
        var specMap = null;

        if($scope.map != null){
            specMap = $scope.map.id;
        }
        else{
            specMap = "Unknown";
        }


        

        // get the heroes
        var hero1 = null;
        var hero2 = null;
        var hero3 = null;
        var hero4 = null;

        
        if($scope.selectedHero1 != null){
            hero1 = $scope.selectedHero1.id;
        }
        else{
            hero1 = "Unknown";
        }
        if($scope.selectedHero2 != null){
            hero2 = $scope.selectedHero2.id;
        }
        else{
            hero2 = "Unknown";
        }
        if($scope.selectedHero3 != null){
            hero3 = $scope.selectedHero3.id;
        }
        else{
            hero3 = "Unknown";
        }
        if($scope.selectedHero4 != null){
            hero4 = $scope.selectedHero4.id;
        }
        else{
            hero4 = "Unknown";
        }

        // create a new object containing all the information needed for an entry
        newEntry = {id: $scope.id, sr: $scope.newsr, matchEnd: wl, matchDuration: $scope.matchDuration,
        scoreBlue: $scope.scoreBlue, scoreRed: $scope.scoreRed, map: specMap, startingSide: side,
        // heroes
        hero1: hero1, hero2: hero2, hero3: hero3, hero4: hero4,
        // friends
        groupSize: groupsize, friend1: $scope.friend1, friend2: $scope.friend2, friend3: $scope.friend3, friend4: $scope.friend4, friend5: $scope.friend5,
        // general match statistics
        eliminations: $scope.eliminations, objectiveKills: $scope.objectiveKills, objectiveTime: $scope.objectiveTime,
        heroDamageDone: $scope.heroDamageDone, healingDone: $scope.healingDone, deaths: $scope.deaths,
        // date and time
        date: currentDate, time: currentTime};


        // add the entry to the array
        dbEntries.push(newEntry);

        // set the values in the form to null
        $scope.newsr = null;
        $scope.scoreBlue = null;
        $scope.scoreRed = null;
        $scope.winLoss = null;
        $scope.matchDuration = null;
        $scope.eliminations = null;
        $scope.objectiveKills = null;
        $scope.objectiveTime = null;
        $scope.heroDamageDone = null;
        $scope.healingDone = null;
        $scope.deaths = null;
        $scope.startingside = null;
        $scope.map = null;
        $scope.selectedHero1 = null;
        $scope.selectedHero2 = null;
        $scope.selectedHero3 = null;
        $scope.selectedHero4 = null;
        $scope.friend1 = null;
        $scope.friend2 = null;
        $scope.friend3 = null;
        $scope.friend4 = null;
        $scope.friend5 = null;

    }
});


app.controller('SettingsController', function($scope){

});