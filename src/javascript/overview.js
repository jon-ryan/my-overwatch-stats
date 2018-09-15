//
// initialize var to get reference on the the angular app
var app = angular.module('overwatch-stats-app', []);

// initialize 
var PouchDB = require('pouchdb-browser');
var db = new PouchDB('ow_database');



// define array to store the entries
dbEntries = [];
var dbIndex = 0;

function setupDatabase(){

    // fill the array with the entries
    db.allDocs({include_docs: true}).then(function(result){
        //
        for(i = 0; i < result.rows.length; i++){
            dbEntries.push(result.rows[i].doc);
        }
    }).catch(function (err){
        console.log(err);
    })

    console.log(dbEntries);

    // the highest db index will be retrieved in the "updateView" function

    setTimeout(function(){
        angular.element(document.getElementById('controllerBody')).scope().updateView();
    }, 500);


}


window.onload = setupDatabase;






// define the heroes
heroes = [{name: 'Ana'}, {name: 'Bastion'}, {name: 'Brigitte'}, {name: 'D.VA'}, {name: 'Doomfist'}, {name: 'Genji'}, {name: 'Hanzo'}, {name: 'Junkrat'},
    {name: 'Lúcio'}, {name: 'McCree'}, {name: 'Mei'}, {name: 'Mercy'}, {name: 'Moira'}, {name:"Orisa"}, {name:"Pharah"}, {name: "Reaper"}, {name:"Reinhardt"}, {name:"Zenyatta"},
    {name: 'Roadhog'}, {name: 'Soldier: 76'}, {name: 'Sombra'}, {name: 'Symmetra'}, {name: 'Torbjörn'}, {name: 'Tracer'}, {name: 'Wnameowmaker'}, {name: 'Winston'}, {name: 'Zarya'},
    {name: 'Wreckingball'}
    ];


// define the maps
maps = [{name: 'Hanamura'}, {name: 'Horizon Lunar Colony'}, {name: 'Temple of Anubis'}, {name: 'Volskaya Industries'}, {name: 'Dorado'},
        {name: 'Junkertown'}, {name: 'Rialto'}, {name: 'Route 66'}, {name: 'Watchpoint: Gibralta'}, {name: 'Blizzard World'},
        {name: 'Eichenwalde'}, {name: 'Hollywood'}, {name: 'King\'s Row'}, {name: 'Numbani'}, {name: 'Ilios'}, {name: 'Lijiang Tower'},
        {name: 'Nepal'}, {name: 'Oasis'}
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
    // get reference to dbEntries
    $scope.dbArray = dbEntries;

    $scope.showLoading = true;


    // get length of db array
    var length = dbEntries.length;

    // create true false array with according length
    $scope.showContentDelete = new Array(length);
    // initialize
    for(i = 0; i < length; i++){
        $scope.showContentDelete[i] = false;
    }

    // test
    $scope.showDB = function(){
        console.log("DB Entries");
        console.log(dbEntries);
        console.log("DB Index (internal)");
        console.log(dbIndex);
    }


    $scope.toggleShowContentDelete = function(index){
        //
        $scope.showContentDelete[index] = !$scope.showContentDelete[index];
    }

    $scope.removeItem = function(index){
        // store the element which is to be removed
        var deletedElement = dbEntries[index];

        // remove the element from the array
        dbEntries.splice(index, 1);
        // close the contentDelete dialog
        $scope.showContentDelete[index] = false;
        
        // remove the entry from the database
        // get the id of the element
        var varIndex = deletedElement._id;
        db.get(varIndex.toString()).then(function(doc) {
            return db.remove(doc);
          }).then(function (result) {
            // handle result
          }).catch(function (err) {
            console.log(err);
          });

        // update the delta
        updateDelta(index);

    }

    function updateDelta(index){
        // update delta in array
        // update the delta of the entry after deleting one

        // there are 4 cases
        // 1. the element is the last one in the array. after deleting it, the array is empty
        // 2. the element is the first in the array. after deleting it, all other elements will have index-1
        // 3. the element is somewhere in the array, but not first or last.
        // 4. the element is last in the array. the current index will be invalid for the array.

        // handle case 1: the element was the last one in the array
        if(dbEntries.length == 0){
            // update the dbIndex when the db is empty
            dbIndex = 0;
            return;
        }

        // handle case 2: the element is the first in the array
        else if(index == 0 && dbEntries.length != 0){
            // the element has been removed in the previous function. The only delta to be updated is from element[index] -> set to 0
            dbEntries[index].delta = 0;

            // get the id from the element and manipulate the database
            var tempID = dbEntries[index]._id;

            // get the element from the database
            db.get(tempID.toString()).then(function(doc) {
                // manipulate the delta
                doc.delta = 0;
                // write back to database
                return db.put(doc);
              }).then(function(response) {
                // handle response
              }).catch(function (err) {
                console.log(err);
              });
        }

        // handle case 3: the element is somewhere in the array. The index is greater than 0 but smaller than the length of the array
        else if(index > 0 && index < dbEntries.length){
            // the element has been removed in the previous function.
            // the delta to be updated is the one at position [index].
            // update by newDelta = [index].sr - [index-1].sr

            // update the array
            dbEntries[index].delta = dbEntries[index].sr - dbEntries[index-1].sr

            // update the database
            // get the id of the element at position [index]
            var tempID = dbEntries[index]._id;

            // load the element at position [index]
            // and write the new delta
            db.get(tempID.toString()).then(function(doc) {
                // manipulate the delta
                doc.delta = dbEntries[index].delta;
                // write back to database
                return db.put(doc);
              }).then(function(response) {
                // handle response
              }).catch(function (err) {
                console.log(err);
              });
        }

        // handle case 4: the element was the last in the array. the index is equal to the array length
        else if(index == dbEntries.length){
            // nothing left to do.
        }

        // if this is reached, undefined behavior occured
        else{
            console.log("undefined behavior reached while trying to remove an entry from the database");
        }
        
    }

    $scope.updateView = function(){
        // initialize the "showLoading" variable to false
        $scope.showLoading = false;
        
        // get the highes index of the db
        // if the array is 0, the index is 0
        if(dbEntries.length == 0){
            dbIndex = 0;
        }
        // else its the id of the last element
        else{
            dbIndex = dbEntries[dbEntries.length-1]._id;
        }
        
        // rerender the view
        $scope.$apply();
    }
    

});


app.controller('FormController', function($scope){

    // get reference to the hero array
    $scope.heroes = heroes;

    // get reference to the map array
    $scope.maps = maps;


    // function to add a match to the DB
    $scope.addMatch = function(){

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
        else if($scope.startingside == -1){
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

        // making minutes two digits (leading 0)
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

        var dateIdentifier = currentDate + "_" + currentTime;




        // specify the map
        var specMap = null;

        if($scope.map != null){
            specMap = $scope.map.name;
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
            hero1 = $scope.selectedHero1.name;
        }
        else{
            hero1 = "Unknown";
        }
        if($scope.selectedHero2 != null){
            hero2 = $scope.selectedHero2.name;
        }
        else{
            hero2 = "Unknown";
        }
        if($scope.selectedHero3 != null){
            hero3 = $scope.selectedHero3.name;
        }
        else{
            hero3 = "Unknown";
        }
        if($scope.selectedHero4 != null){
            hero4 = $scope.selectedHero4.name;
        }
        else{
            hero4 = "Unknown";
        }

        // calculate the delta
        if(dbEntries.length > 0){
            var delta = $scope.newsr - dbEntries[dbEntries.length-1].sr;
        }
        else{
            var delta = 0;
        }

        // check if sr = null and if so set it to 0
        if($scope.newsr == null){
            $scope.newsr = 0;
        }

        // increment id
        dbIndex++;
        // turn the id into a string
        idString = dbIndex.toString();

        

        // create a new object containing all the information needed for an entry
        newEntry = {_id: idString, sr: $scope.newsr, matchEnd: wl, matchDuration: $scope.matchDuration,
        scoreBlue: $scope.scoreBlue, scoreRed: $scope.scoreRed, map: specMap, startingSide: side, delta: delta,
        // heroes
        hero1: hero1, hero2: hero2, hero3: hero3, hero4: hero4,
        // friends
        groupSize: groupsize, friend1: $scope.friend1, friend2: $scope.friend2, friend3: $scope.friend3, friend4: $scope.friend4, friend5: $scope.friend5,
        // general match statistics
        eliminations: $scope.eliminations, objectiveKills: $scope.objectiveKills, objectiveTime: $scope.objectiveTime,
        heroDamageDone: $scope.heroDamageDone, healingDone: $scope.healingDone, deaths: $scope.deaths,
        // date and time
        date: dateIdentifier};


        // add the entry to the array
        //dbEntries.push(newEntry);

        db.put(newEntry).then(function (response) {
            // handle response
          }).catch(function (err) {
            console.log(err);
        });

        
        db.get(idString).then(function (doc) {
            dbEntries.push(doc);    // handle doc
          }).catch(function (err) {
            console.log(err);
          });



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

        // disable save button for one second

    }
});


app.controller('SettingsController', function($scope){

});


