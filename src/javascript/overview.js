//
// initialize var to get reference on the the angular app
var app = angular.module('overwatch-stats-app', []);

// initialize 
var PouchDB = require('pouchdb-browser');
var matchDB = new PouchDB('match_database');
var heroDB = new PouchDB('hero_database');
var mapDB = new PouchDB('map_database');
var seasonDB = new PouchDB('season_database');
const Store = require('electron-store');
const store = new Store();

store.name = 'settings';





// charts
var Chart = require('chart.js');




// define array to store the entries
var dbEntries = [];
var heroes = [];
var maps = [];
var dbIndex = 100;
var mapDBSize = 0;
var heroDBSize = 0;
var dbSeason = [];
var dbSeasonIndex = 100;

var globalNightmode = false;

// get reference to body-element-css
var bodyElementCss = document.getElementById('body-element-style');
// get reference to html element
var html = document.getElementById('html');

async function setupDatabase() {


    // get the value for nightmode
    globalNightmode = store.get('nightmode');
    // update the settings
    angular.element(document.getElementById('container-settings')).scope().updateNightmode();

    // setup the matchDB array

    // fill the array with the entries
    matchDB.allDocs({include_docs: true}).then(function(result){
        // fill array with for loop
        for(i = 0; i < result.rows.length; i++){
            dbEntries.push(result.rows[i].doc);
        }
    }).catch(function(err){
        console.log("Error whie filling the matchDBArray: " + err);
    }).then(function (){
        // get the highes index of the db
        // if the array is empty, the index is 0
        if(dbEntries.length == 0){
            dbIndex = 100;
        }
        // else its the id of the last element
        else{
            dbIndex = dbEntries[dbEntries.length-1]._id;
        }
    }).catch(function(err){
        console.log("Error while getting the length of the dbEntries array: " + err);
    }).then(function (){
        // update the view
        angular.element(document.getElementById('controllerBody')).scope().updateView();
    }).catch(function (err){
        // log error
        console.log("Error while updating the view: " + err);
    });

    
    // fill the seasons array
    seasonDB.allDocs({include_docs: true}).then(function(result){
        // fill the array with for loop
        for(i = 0; i < result.rows.length; i++){
            dbSeason.push(result.rows[i].doc)
        }
    }).then(function(){
        // get the highes index of season db
        if(dbSeason.length == 0){
            dbSeasonIndex = 100;
        }
        else{
            dbSeasonIndex = dbSeason[dbSeason.length-1]._id;
        }

    }).then(function(){
        angular.element(document.getElementById('container-season')).scope().updateView();
    }).catch(function(err){
        console.log(err);
    })




    // setup the the heroDB
    // set up the heroes array
    heroDB.allDocs({include_docs: true}).then(function(result){
        // fill the hero array
        for(i = 0; i < result.rows.length; i++){
            heroes.push(result.rows[i].doc);
        }
    }).catch(function (err){
        console.log(err);
    }).then(function(){
        // get the highes index of the heroDB
        // if the array is empty, the index = 0
        if(heroes.length == 0){
            heroDBSize = 0;
        }
        // else its the id of the last element
        else{
            heroDBSize = heroes.length;
        }

        // return the herdbSize
        return heroDBSize;
    }).then(function (herodbSize){
        // if the hero db is empty, create a new one
    if(herodbSize == 0){

        // create object (Ana)
        var tempHero = {_id: 'Ana', name: 'Ana', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Ana', name: 'Ana', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Bastion)
        tempHero = {_id: 'Bastion', name: 'Bastion', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Bastion', name: 'Bastion', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Brigitte)
        tempHero = {_id: 'Brigitte', name: 'Brigitte', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Brigitte', name: 'Brigitte', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (D.VA)
        tempHero = {_id: 'D.VA', name: 'D.VA', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'D.VA', name: 'D.VA', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Doomfist)
        tempHero = {_id: 'Doomfist', name: 'Doomfist', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Doomfist', name: 'Doomfist', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Genji)
        tempHero = {_id: 'Genji', name: 'Genji', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroes.push({_id: 'Genji', name: 'Genji', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        heroDB.put(tempHero).then(function(response){
            // response
        }).catch(function (err){
            console.log(err);
        })

        // create object (Hanzo)
        tempHero = {_id: 'Hanzo', name: 'Hanzo', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroes.push({_id: 'Hanzo', name: 'Hanzo', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        heroDB.put(tempHero).then(function(response){
            // response
        }).catch(function (err){
            console.log(err);
        })

        // create object (Junkrat)
        tempHero = {_id: 'Junkrat', name: 'Junkrat', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Junkrat', name: 'Junkrat', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Lúcio)
        tempHero = {_id: 'Lúcio', name: 'Lúcio', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Lúcio', name: 'Lúcio', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

        // create object (McCree)
        tempHero = {_id: 'McCree', name: 'McCree', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'McCree', name: 'McCree', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Mei)
        tempHero = {_id: 'Mei', name: 'Mei', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroes.push({_id: 'Mei', name: 'Mei', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        heroDB.put(tempHero).then(function(response){
            // response
        }).catch(function (err){
            console.log(err);
        })

        // create object (Mercy)
        tempHero = {_id: 'Mercy', name: 'Mercy', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Mercy', name: 'Mercy', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

        // create object (Moira)
        tempHero = {_id: 'Moira', name: 'Moira', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Moira', name: 'Moira', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Orisa)
        tempHero = {_id: 'Orisa', name: 'Orisa', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Orisa', name: 'Orisa', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Pharah)
        tempHero = {_id: 'Pharah', name: 'Pharah', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Pharah', name: 'Pharah', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Reaper)
        tempHero = {_id: 'Reaper', name: 'Reaper', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Reaper', name: 'Reaper', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

        // create object (Reinhardt)
        tempHero = {_id: 'Reinhardt', name: 'Reinhardt', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Reinhardt', name: 'Reinhardt', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })



        // create object Zenyatta
        tempHero = {_id: 'Zenyatta', name: 'Zenyatta', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Zenyatta', name: 'Zenyatta', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Roadhog)
        tempHero = {_id: 'Roadhog', name: 'Roadhog', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Roadhog', name: 'Roadhog', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

        // create object (Soldier 76)
        tempHero = {_id: 'Soldier: 76', name: 'Soldier: 76', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Soldier: 76', name: 'Soldier: 76', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object Sombra
        tempHero = {_id: 'Sombra', name: 'Sombra', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Sombra', name: 'Sombra', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

        // create object Symmetra
        tempHero = {_id: 'Symmetra', name: 'Symmetra', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Symmetra', name: 'Symmetra', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

        // create object (Torbjörn)
        tempHero = {_id: 'Torbjörn', name: 'Torbjörn', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Torbjörn', name: 'Torbjörn', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

        // create object (Tracer)
        tempHero = {_id: 'Tracer', name: 'Tracer', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Tracer', name: 'Tracer', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })



        // create object (Widowmaker)
        tempHero = {_id: 'Widowmaker', name: 'Widowmaker', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Widowmaker', name: 'Widowmaker', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object Winston
        tempHero = {_id: 'Winston', name: 'Winston', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Winston', name: 'Winston', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Zarya)
        tempHero = {_id: 'Zarya', name: 'Zarya', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Zarya', name: 'Zarya', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })


        // create object (Wreckingball)
        tempHero = {_id: 'Wreckingball', name: 'Wreckingball', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0};
        // push to database
        heroDB.put(tempHero).then(function(response){
            // response
            heroes.push({_id: 'Wreckingball', name: 'Wreckingball', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0});
        }).catch(function (err){
            console.log(err);
        })

    } // incase the hero db wasn't set up yet, the db is now fully setup.

    }).then(function(){
        // update the view
        angular.element(document.getElementById('controllerBody')).scope().$apply();
        angular.element(document.getElementById('controllerBody')).scope().updateView();
    }).catch(function(err){
        console.log(err);
    })


    // setup the the mapDB
    // set up the maps array
    mapDB.allDocs({include_docs: true}).then(function(result){
        // fill the hero array
        for(i = 0; i < result.rows.length; i++){
            maps.push(result.rows[i].doc);
        }
    }).catch(function (err){
        console.log(err);
    }).then(function(){
        // get the highes index of the heroDB
        // if the array is empty, the index = 0
        if(maps.length == 0){
            mapDBSize = 0;
        }
        // else its the id of the last element
        else{
            mapDBSize = maps.length;
        }

        // return the herdbSize
        return mapDBSize;
    }).then(function(mapdbSize){
        if(mapdbSize == 0){

            // create object (Hanamura)
            var tempMap = {_id: 'Hanamura', name: 'Hanamura', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Hanamura', name: 'Hanamura', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Horizon Lunar Colony)
            tempMap = {_id: 'Horizon Lunar Colony', name: 'Horizon Lunar Colony', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Horizon Lunar Colony', name: 'Horizon Lunar Colony', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Temple of Anubis)
            tempMap = {_id: 'Temple of Anubis', name: 'Temple of Anubis', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Temple of Anubis', name: 'Temple of Anubis', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'});
            }).catch(function (err){
                console.log(err);
            }) 



            // create object (Volskaya Industries)
            tempMap = {_id: 'Volskaya Industries', name: 'Volskaya Industries', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Volskaya Industries', name: 'Volskaya Industries', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Assault'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Dorado)
            tempMap = {_id: 'Dorado', name: 'Dorado', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Dorado', name: 'Dorado', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Junkertown)
            tempMap = {_id: 'Junkertown', name: 'Junkertown', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Junkertown', name: 'Junkertown', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Rialto)
            tempMap = {_id: 'Rialto', name: 'Rialto', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Rialto', name: 'Rialto', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Route 66)
            tempMap = {_id: 'Route 66', name: 'Route 66', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Route 66', name: 'Route 66', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Watchpoint: Gibralta)
            tempMap = {_id: 'Watchpoint: Gibralta', name: 'Watchpoint: Gibralta', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Watchpoint: Gibralta', name: 'Watchpoint: Gibralta', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Escort'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Blizzard World)
            tempMap = {_id: 'Blizzard World', name: 'Blizzard World', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Blizzard World', name: 'Blizzard World', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Eichenwalde)
            tempMap = {_id: 'Eichenwalde', name: 'Eichenwalde', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Eichenwalde', name: 'Eichenwalde', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Hollywood)
            tempMap = {_id: 'Hollywood', name: 'Hollywood', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Hollywood', name: 'Hollywood', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'});
            }).catch(function (err){
                console.log(err);
            }) 

            // create object (King's Row)
            tempMap = {_id: 'King\'s Row', name: 'King\'s Row', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'King\'s Row', name: 'King\'s Row', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Numbani)
            tempMap = {_id: 'Numbani', name: 'Numbani', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Numbani', name: 'Numbani', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Hybrid'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Ilios)
            tempMap = {_id: 'Ilios', name: 'Ilios', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Ilios', name: 'Ilios', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'});
            }).catch(function (err){
                console.log(err);
            }) 

            // create object (Lijiang Tower)
            tempMap = {_id: 'Lijiang Tower', name: 'Lijiang Tower', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Lijiang Tower', name: 'Lijiang Tower', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'});
            }).catch(function (err){
                console.log(err);
            }) 


            // create object (Nepal)
            tempMap = {_id: 'Nepal', name: 'Nepal', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Nepal', name: 'Nepal', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'});
            }).catch(function (err){
                console.log(err);
            }) 

            
            // create object (Oasis)
            tempMap = {_id: 'Oasis', name: 'Oasis', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: 'Oasis', name: 'Oasis', gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: 'Control'});
            }).catch(function (err){
                console.log(err);
            }) 

        }
        
    }).then(function(){
        angular.element(document.getElementById('container-settings')).scope().updateView();
        angular.element(document.getElementById('controllerBody')).scope().$apply();
        angular.element(document.getElementById('controllerBody')).scope().updateView();
    }).catch(function(err){
        console.log(err);
    });
    


// ##########################################################################


}


window.onload = setupDatabase;




// -----------------------------------------------------
// Tab Controller
// -----------------------------------------------------

//
// controller manages the tabs
app.controller('TabController', function($scope){
//
$scope.showOverview = true;
$scope.showSettings = false;
$scope.showForm = false;
$scope.showSeason = false;


// get reference to the nav bar
var overviewLink = document.getElementById("overview");
var settingsLink = document.getElementById("settings");
var seasonLink = document.getElementById("season");
var matchLink = document.getElementById("match");


$scope.showSettingsContainer = function(){
    // modify the content
    $scope.showOverview = false;
    $scope.showSettings = true;
    $scope.showSeason = false;
    $scope.showForm = false;

    overviewLink.setAttribute("class", "");
    settingsLink.setAttribute("class", "active");
    seasonLink.setAttribute("class", "");
    matchLink.setAttribute("class", "");

}


$scope.showOverviewContainer = function(){
    // modify the content
    $scope.showOverview = true;
    $scope.showSettings = false;
    $scope.showSeason = false;
    $scope.showForm = false;

    overviewLink.setAttribute("class", "active");
    settingsLink.setAttribute("class", "");
    seasonLink.setAttribute("class", "");
    matchLink.setAttribute("class", "");
}

$scope.showAddMatch = function(){
    // modify the content
    $scope.showOverview = false;
    $scope.showSettings = false;
    $scope.showSeason = false;
    $scope.showForm = true;

    overviewLink.setAttribute("class", "");
    settingsLink.setAttribute("class", "");
    seasonLink.setAttribute("class", "");
    matchLink.setAttribute("class", "active");
    }

    $scope.showSeasons = function(){
         // modify the content
        $scope.showOverview = false;
        $scope.showSettings = false;
        $scope.showSeason = true;
        $scope.showForm = false;

        overviewLink.setAttribute("class", "");
        settingsLink.setAttribute("class", "");
        seasonLink.setAttribute("class", "active");
        matchLink.setAttribute("class", "");
    }


});



// -----------------------------------------------------
// Content Controller
// -----------------------------------------------------



//
// ContentController behavior
app.controller('ContentController', function($scope) {
    // get reference to dbEntries
    $scope.dbArray = dbEntries;

    $scope.heroBreakdownArray = [];
    $scope.mapBreakdownArray = [];

    $scope.gamesplayed = 0;
    $scope.wins = 0;
    $scope.losses = 0;
    $scope.draws = 0;
    $scope.avgdelta = 0;
    $scope.unknownWinLoss = 0;

    // var for hero breakdown table
    $scope.showHeroBreakdown = false;
    $scope.heroBreakdownProperty = "name";
    $scope.heroBreakdownReverse = false;
    var heroBreakdownArrow = document.getElementById('img-heroBreakdown');

    // var for map breakdown table
    $scope.showMapBreakdown = false;
    $scope.mapBreakdownProperty = "name";
    $scope.mapBreakdownReverse = false;
    var mapBreakdownArrow = document.getElementById('img-mapBreakdown');


    // setup charts
    var srRatingCanvas = document.getElementById('srrating-canvas').getContext('2d');
    var winlossCanvas = document.getElementById('winloss-canvas');
    var groupsizeBreakdownCanvas = document.getElementById('groupsize-breakdown');

    var srRatingChartData = [];
    var srRatingChartLabel = [];

    var groupsizeBreakdownLabel = ["Solo-Queue (1)", "Dual-Queue (2)", "Tripple-Queue (3)", "Quad-Queue (4)", "Quintuple-Queue (5)", "Hexa-Queue (6)"];
    var groupsizeBreakdownData = [];

        // vars specifically for groupsize
        var groupsizeOneTotalGames = 0;
        var groupsizeOneWins = 0;

        var groupsizeTwoTotalGames = 0;
        var groupsizeTwoWins = 0;

        var groupsizeThreeTotalGames = 0;
        var groupsizeThreeWins = 0;

        var groupsizeFourTotalGames = 0;
        var groupsizeFourWins = 0;

        var groupsizeFiveTotalGames = 0;
        var groupsizeFiveWins = 0;

        var groupsizeSixTotalGames = 0;
        var groupsizeSixWins = 0;


    var timeOfDayBreakdownLabel = ["Morning (06:00 - 12:00)", "Afternoon (12:00 - 18:00)", "Evening (18:00 - 00:00)", "Night (00:00 - 06:00)"];

    // get length of db array
    var length = dbEntries.length;

    // create true false array with according length
    $scope.showContentDelete = new Array(length);
    // initialize
    for(i = 0; i < length; i++){
        $scope.showContentDelete[i] = false;
    }



    // -----------
    // charts
    //  ----------
    // chart for srrating
    var srRatingChart = new Chart(srRatingCanvas, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: [""],
            datasets: [{
                label: "Skill Rating",
                backgroundColor: 'rgb(33,143,254)',
                borderColor: 'rgb(26, 120, 216)',
                data: [],
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var winlossChart = new Chart(winlossCanvas, {
        type: 'doughnut',
        data: {
            labels: ["Win", "Loss", "Draw", "Unknown"],
            datasets: [{
                data: [],
                backgroundColor: ['rgb(33,143,254)', 'rgb(249,158,26)', 'rgb(235,235,235)', 'rgb(150,150,150)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var groupSizeBreakdownChart = new Chart(groupsizeBreakdownCanvas, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: groupsizeBreakdownLabel,
            datasets: [{
                label: "Win-Loss / Groupsize",
                backgroundColor: 'rgb(33,143,254)',
                borderColor: 'rgb(26, 120, 216)',
                data: [],
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    


    // -----------
    // charts END
    //  ----------

    // debug
    $scope.showDB = function(){
        // currently empty
    }

    $scope.toggleShowHeroBreakdown = function(){
        if($scope.showHeroBreakdown == true){
            $scope.showHeroBreakdown = false;
            heroBreakdownArrow.setAttribute('src', "../../img/baseline-keyboard_arrow_down-24px.svg")
        }
        else{
            $scope.showHeroBreakdown = true;
            heroBreakdownArrow.setAttribute('src', "../../img/baseline-keyboard_arrow_up-24px.svg")
        }
    }

    $scope.toggleShowMapBreakdown = function(){
        if($scope.showMapBreakdown == true){
            $scope.showMapBreakdown = false;
            mapBreakdownArrow.setAttribute('src', "../../img/baseline-keyboard_arrow_down-24px.svg")
        }
        else{
            $scope.showMapBreakdown = true;
            mapBreakdownArrow.setAttribute('src', "../../img/baseline-keyboard_arrow_up-24px.svg")
        }
    }

    $scope.toggleShowContentDelete = function(index){
        //
        $scope.showContentDelete[index] = !$scope.showContentDelete[index];
    }

    // Herobreakdown: order by name
    $scope.setHeroBreakdownNameActive = function(){
        var name = document.getElementById('heroBreakdownName');
        var usage = document.getElementById('heroBreakdownUsage');
        var winrate = document.getElementById('heroBreakdownWinrate');

        name.setAttribute("class", "table-header-wide table-header-style-active");
        usage.setAttribute("class", "table-header-wide table-header-style");
        winrate.setAttribute("class", "table-header-wide table-header-style");

        $scope.heroBreakdownProperty = "name";
        $scope.heroBreakdownReverse = false;
    }

    // herobreakdown: order by usage
    $scope.setHeroBreakdownUsageActive = function(){
        var name = document.getElementById('heroBreakdownName');
        var usage = document.getElementById('heroBreakdownUsage');
        var winrate = document.getElementById('heroBreakdownWinrate');

        name.setAttribute("class", "table-header-wide table-header-style");
        usage.setAttribute("class", "table-header-wide table-header-style-active");
        winrate.setAttribute("class", "table-header-wide table-header-style");

        $scope.heroBreakdownProperty = "usage";
        $scope.heroBreakdownReverse = true;
    }

    // herobreakdown: order by winrate
    $scope.setHeroBreakdownWinrateActive = function(){
        var name = document.getElementById('heroBreakdownName');
        var usage = document.getElementById('heroBreakdownUsage');
        var winrate = document.getElementById('heroBreakdownWinrate');

        name.setAttribute("class", "table-header-wide table-header-style");
        usage.setAttribute("class", "table-header-wide table-header-style");
        winrate.setAttribute("class", "table-header-wide table-header-style-active");

        $scope.heroBreakdownProperty = "winrate";
        $scope.heroBreakdownReverse = true;
    }

    // map breakdown order by name
    $scope.setMapBreakdownNameActive = function(){
        var name = document.getElementById('mapBreakdownName');
        var usage = document.getElementById('mapBreakdownUsage');
        var winrate = document.getElementById('mapBreakdownWinrate');

        name.setAttribute("class", "table-header-wide table-header-style-active");
        usage.setAttribute("class", "table-header-wide table-header-style");
        winrate.setAttribute("class", "table-header-wide table-header-style");

        $scope.mapBreakdownProperty = "name";
        $scope.mapBreakdownReverse = false;
    }

    // map breakdown order by usage
    $scope.setMapBreakdownUsageActive = function(){
        var name = document.getElementById('mapBreakdownName');
        var usage = document.getElementById('mapBreakdownUsage');
        var winrate = document.getElementById('mapBreakdownWinrate');

        name.setAttribute("class", "table-header-wide table-header-style");
        usage.setAttribute("class", "table-header-wide table-header-style-active");
        winrate.setAttribute("class", "table-header-wide table-header-style");

        $scope.mapBreakdownProperty = "usage";
        $scope.mapBreakdownReverse = true;
    }

    // map breakdown: order by winrate
    $scope.setMapBreakdownWinrateActive = function(){
        var name = document.getElementById('mapBreakdownName');
        var usage = document.getElementById('mapBreakdownUsage');
        var winrate = document.getElementById('mapBreakdownWinrate');

        name.setAttribute("class", "table-header-wide table-header-style");
        usage.setAttribute("class", "table-header-wide table-header-style");
        winrate.setAttribute("class", "table-header-wide table-header-style-active");

        $scope.mapBreakdownProperty = "winrate";
        $scope.mapBreakdownReverse = true;
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
        var matchID = deletedElement._id;
        var matchHero1 = deletedElement.hero1;
        var matchHero2 = deletedElement.hero2;
        var matchHero3 = deletedElement.hero3;
        var matchHero4 = deletedElement.hero4;
        var matchWinLoss = deletedElement.matchEnd;
        var matchMap = deletedElement.map;

        // remove the entry from the match db
        matchDB.get(matchID.toString()).then(function(doc) {
            return matchDB.remove(doc);
          }).then(function (result) {
            // handle result
          }).catch(function (err) {
            console.log(err);
          });

        // update the MapDB
        if(matchMap != "Unknown"){
            mapDB.get(matchMap).then(function(doc){
                // update the docs
                if(matchWinLoss == "Victory"){
                    doc.wins--;
                }
                else if(matchWinLoss == "Defeat"){
                    doc.losses--;
                }
                else if(matchWinLoss == "Draw"){
                    doc.draws--;
                }
                else{
                    doc.unknownWinLoss--;
                }

                doc.gamesPlayed--;

                // update the array
                for(i = 0; i < maps.length; i++){
                    if(maps[i]._id == matchMap){
                        if(matchWinLoss == "Victory"){
                            maps[i].wins--;
                        }
                        else if(matchWinLoss == "Defeat"){
                            maps[i].losses--;
                        }
                        else if(matchWinLoss == "Draw"){
                            maps[i].draws--;
                        }
                        else{
                            maps[i].unknownWinLoss--;
                        }
                        maps[i].gamesPlayed--;

                    }
                }

                return doc;
            }).then(function(response){
                mapDB.put(response).then(function(res){

                }).catch(function(err){
                    console.log(err);
                })
            }).catch(function(err){
                console.log(err);
            })
        }

        // update the heroDB
        if(matchHero1 != "Unknown"){
            heroDB.get(matchHero1).then(function(doc){
                // update the docs
                if(matchWinLoss == "Victory"){
                    doc.wins--;
                }
                else if(matchWinLoss == "Defeat"){
                    doc.losses--;
                }
                else if(matchWinLoss == "Draw"){
                    doc.draws--;
                }
                else{
                    doc.unknownWinLoss--;
                }

                doc.gamesPlayed--;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == matchHero1){
                        if(matchWinLoss == "Victory"){
                            heroes[i].wins--;
                            
                        }
                        else if(matchWinLoss == "Defeat"){
                            heroes[i].losses--;
                        }
                        else if(matchWinLoss == "Draw"){
                            heroes[i].draws--;
                        }
                        else{
                            heroes[i].unknownWinLoss--;
                        }
                        heroes[i].gamesPlayed--;

                    }
                }

                return doc;
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

                }).catch(function(err){
                    console.log("Error while updating hero on delete");
                    console.log(err);
                })

                // update the view
                $scope.updateView();
            }).catch(function(err){
                console.log("Error while deleting hero");
                console.log(err);
            })
        }
        if(matchHero2 != "Unknown"){
            heroDB.get(matchHero2).then(function(doc){
                // update the docs
                if(matchWinLoss == "Victory"){
                    doc.wins--;
                }
                else if(matchWinLoss == "Defeat"){
                    doc.losses--;
                }
                else if(matchWinLoss == "Draw"){
                    doc.draws--;
                }
                else{
                    doc.unknownWinLoss--;
                }

                doc.gamesPlayed--;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == matchHero2){
                        if(matchWinLoss == "Victory"){
                            heroes[i].wins--;
                        }
                        else if(matchWinLoss == "Defeat"){
                            heroes[i].losses--;
                        }
                        else if(matchWinLoss == "Draw"){
                            heroes[i].draws--;
                        }
                        else{
                            heroes[i].unknownWinLoss--;
                        }
                        heroes[i].gamesPlayed--;
                    }
                }

                return doc;
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

                }).catch(function(err){
                    console.log("Error while updating hero on delete");
                    console.log(err);
                })

                // update the view
                $scope.updateView();
            }).catch(function(err){
                console.log("Error while deleting hero");
                console.log(err);
            })
        }
        if(matchHero3 != "Unknown"){
            heroDB.get(matchHero3).then(function(doc){
                // update the docs
                if(matchWinLoss == "Victory"){
                    doc.wins--;
                }
                else if(matchWinLoss == "Defeat"){
                    doc.losses--;
                }
                else if(matchWinLoss == "Draw"){
                    doc.draws--;
                }
                else{
                    doc.unknownWinLoss--;
                }

                doc.gamesPlayed--;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == matchHero3){
                        if(matchWinLoss == "Victory"){
                            heroes[i].wins--;
                        }
                        else if(matchWinLoss == "Defeat"){
                            heroes[i].losses--;
                        }
                        else if(matchWinLoss == "Draw"){
                            heroes[i].draws--;
                        }
                        else{
                            heroes[i].unknownWinLoss--;
                        }
                        heroes[i].gamesPlayed--;
                    }
                }

                return doc;
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

                }).catch(function(err){
                    console.log("Error while updating hero on delete");
                    console.log(err);
                })

                // update the view
                $scope.updateView();
            }).catch(function(err){
                console.log("Error while deleting hero");
                console.log(err);
            })
        }
        if(matchHero4 != "Unknown"){
            heroDB.get(matchHero4).then(function(doc){
                // update the docs
                if(matchWinLoss == "Victory"){
                    doc.wins--;
                }
                else if(matchWinLoss == "Defeat"){
                    doc.losses--;
                }
                else if(matchWinLoss == "Draw"){
                    doc.draws--;
                }
                else{
                    doc.unknownWinLoss--;
                }

                doc.gamesPlayed--;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == matchHero4){
                        if(matchWinLoss == "Victory"){
                            heroes[i].wins--;
                        }
                        else if(matchWinLoss == "Defeat"){
                            heroes[i].losses--;
                        }
                        else if(matchWinLoss == "Draw"){
                            heroes[i].draws--;
                        }
                        else{
                            heroes[i].unknownWinLoss--;
                        }
                        heroes[i].gamesPlayed--;
                    }
                }

                return doc;
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

                }).catch(function(err){
                    console.log("Error while updating hero on delete");
                    console.log(err);
                })

                // update the view
                $scope.updateView();
            }).catch(function(err){
                console.log("Error while deleting hero");
                console.log(err);
            })
        }



        // update the delta
        updateDelta(index);
        // update the view
        $scope.updateView();
        // update the settings
        angular.element(document.getElementById('container-settings')).scope().updateView();

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
            matchDB.get(tempID.toString()).then(function(doc) {
                // manipulate the delta
                doc.delta = 0;
                // write back to database
                return matchDB.put(doc);
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
            matchDB.get(tempID.toString()).then(function(doc) {
                // manipulate the delta
                doc.delta = dbEntries[index].delta;
                // write back to database
                return matchDB.put(doc);
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
                
        // reset temp values
        srRatingChartData = new Array();
        srRatingChartLabel = new Array();

        groupsizeBreakdownData = new Array();

        groupsizeOneTotalGames = groupsizeOneWins = groupsizeTwoTotalGames = groupsizeTwoWins = groupsizeThreeTotalGames = groupsizeThreeWins = 0;
        groupsizeFourTotalGames = groupsizeFourWins = groupsizeFiveTotalGames = groupsizeFiveWins = groupsizeSixTotalGames = groupsizeSixWins = 0;

        // reset wins, losses and draws
        $scope.wins = $scope.losses = $scope.draws = $scope.unknownWinLoss = $scope.avgdelta = 0;


        // get the needed data from dbEntries
        for(i = 0; i < dbEntries.length; i++){
            // get the sr rating per element
            srRatingChartData.push(dbEntries[i].sr);
            srRatingChartLabel.push("Match " + (i+1).toString());


            // get the main statistics
            // get wins
            // get losses
            // get draws
            if(dbEntries[i].matchEnd == "Victory"){
                $scope.wins++;
            }
            else if(dbEntries[i].matchEnd == "Draw"){
                $scope.draws++;
            }
            else if(dbEntries[i].matchEnd == "Defeat"){
                $scope.losses++;
            }
            else if(dbEntries[i].matchEnd == "Unknown"){
                $scope.unknownWinLoss++;
            }
            $scope.avgdelta = $scope.avgdelta + dbEntries[i].delta;



            // groupsize unknown
            if(dbEntries[i].groupsize == 0){

            }
            // groupsize 1
            else if(dbEntries[i].groupsize == 1){
                groupsizeOneTotalGames++;
                if(dbEntries[i].matchEnd == "Victory"){
                    groupsizeOneWins++;
                }
            }
            // groupsize 2
            else if(dbEntries[i].groupsize == 2){
                groupsizeTwoTotalGames++;
                if(dbEntries[i].matchEnd == "Victory"){
                    groupsizeTwoWins++;
                }
            }
            // groupsize 3
            else if(dbEntries[i].groupsize == 3){
                groupsizeThreeTotalGames++;
                if(dbEntries[i].matchEnd == "Victory"){
                    groupsizeThreeWins++;
                }
            }
            // groupsize 4
            else if(dbEntries[i].groupsize == 4){
                groupsizeFourTotalGames++;
                if(dbEntries[i].matchEnd == "Victory"){
                    groupsizeFourWins++;
                }
            }
            // groupsize 5
            else if(dbEntries[i].groupsize == 5){
                groupsizeFiveTotalGames++;
                if(dbEntries[i].matchEnd == "Victory"){
                    groupsizeFiveWins++;
                } 
            }
            // groupsize 6
            else{
                groupsizeSixTotalGames++;
                if(dbEntries[i].matchEnd == "Victory"){
                    groupsizeSixWins++;
                } 
            }


        }


        // update the sr rating chart
        srRatingChart.data.labels = srRatingChartLabel;
        srRatingChart.data.datasets[0].data = srRatingChartData;
        srRatingChart.update({
            duration: 800,
            easing: 'easeOutBounce'
        });

        // get games played
        $scope.gamesplayed = dbEntries.length;

        
        // calculate the avg delta
        if(dbEntries.length == 0){
            $scope.avgdelta = 0;
        }
        else{
            $scope.avgdelta = ($scope.avgdelta / dbEntries.length).toFixed(2);
        }
        

        // update the win/loss chart
        winlossChart.data.datasets[0].data = [$scope.wins, $scope.losses, $scope.draws, $scope.unknownWinLoss];
        winlossChart.update({
            duration: 800,
            easing: 'easeOutBounce'
        })

        // update the groupsize chart
        // calculate the win/loss rates
        var gsOneWL = 0;
        if(groupsizeOneTotalGames != 0){
            gsOneWL = (groupsizeOneWins / groupsizeOneTotalGames).toFixed(2);
        }

        var gsTwoWL = 0;
        if(groupsizeTwoTotalGames != 0){
            gsTwoWL = (groupsizeTwoWins / groupsizeTwoTotalGames).toFixed(2);
        }

        var gsThreeWL = 0;
        if(groupsizeThreeTotalGames != 0){
            gsThreeWL = (groupsizeThreeWins / groupsizeThreeTotalGames).toFixed(2);
        }

        var gsFourWL = 0;
        if(groupsizeFiveTotalGames != 0){
            gsFourWL = (groupsizeFourWins / groupsizeFourTotalGames).toFixed(2);
        }

        var gsFiveWL = 0;
        if(groupsizeFiveTotalGames != 0){
            gsFiveWL = (groupsizeFiveWins / groupsizeFiveTotalGames).toFixed(2);
        }

        var gsSixWL = 0;
        if(groupsizeSixTotalGames != 0){
            gsSixWL = (groupsizeSixWins / groupsizeSixTotalGames).toFixed(2);
        }

        groupsizeBreakdownData = [gsOneWL, gsTwoWL, gsThreeWL, gsFourWL, gsFiveWL, gsSixWL];

        // update the chart data
        groupSizeBreakdownChart.data.datasets[0].data = groupsizeBreakdownData;
        groupSizeBreakdownChart.update({
            duration: 800,
            easing: 'easeOutBounce'
        })




        // update the heroBreakdownArray
        //
        // reset the heroBreakdownArray
        $scope.heroBreakdownArray = [];
        $scope.mapBreakdownArray = [];

        var tempUsage = 0;
        var tempWinrate = 0;



        for(var index in heroes){
            // get the name, the usage and the winrate
            if(heroes[index].gamesPlayed != 0){

                tempUsage = (heroes[index].gamesPlayed / $scope.gamesplayed).toFixed(2);
                if(tempUsage == 0){
                    tempUsage = 0; // get rid of unneded decimal digits
                }

                tempWinrate = (heroes[index].wins / heroes[index].gamesPlayed).toFixed(2);
                if(tempWinrate == 0){
                    tempWinrate = 0; // get rid of unneeded decimal digits
                }
            }
            else{
                tempUsage = 0;
                tempWinrate = 0;
            }

            // push to array
            $scope.heroBreakdownArray.push({name: heroes[index].name, usage: tempUsage, winrate: tempWinrate});
        }


        for(var i in maps){
            // get the name the usage and the winrate
            if(maps[i].gamesPlayed != 0){
                tempUsage = (maps[i].gamesPlayed / $scope.gamesplayed).toFixed(2);
                if(tempUsage == 0){
                    tempUsage = 0; // get rid of unneded decimal digits
                }

                tempWinrate = (maps[i].wins / maps[i].gamesPlayed).toFixed(2);
                if(tempWinrate == 0){
                    tempWinrate = 0; // get rid of unneded decimal digits
                }
            }
            else{
                tempUsage = 0;
                tempWinrate = 0;
            }

            // push to array
            $scope.mapBreakdownArray.push({name: maps[i].name, usage: tempUsage, winrate: tempWinrate});
        }

        
        $scope.dbArray = dbEntries;

    }


    $scope.updateHeroBreakdown = function(){
        // update the heroBreakdownArray
        //
        // reset the heroBreakdownArray
        $scope.heroBreakdownArray = [];

        var tempUsage = 0;
        var tempWinrate = 0;



        for(var index in heroes){

            // get the name, the usage and the winrate
            if(heroes[index].gamesPlayed != 0){
                tempUsage = (heroes[index].gamesPlayed / $scope.gamesplayed).toFixed(2);
                if(tempUsage == 0){
                    tempUsage = 0; // get rid of unneded decimal digits
                }
            }
            else{
                tempUsage = 0;
            }


            if(heroes[index].gamesPlayed != 0){
                tempWinrate = (heroes[index].wins / heroes[index].gamesPlayed).toFixed(2);
                if(tempWinrate == 0){
                    tempWinrate = 0; // get rid of unneeded decimal digits
                }
            }
            else{
                tempWinrate = 0;
            }
            
            // push to array
            $scope.heroBreakdownArray.push({name: heroes[index].name, usage: tempUsage, winrate: tempWinrate});
        }
    }
    

});


// -----------------------------------------------------
// Form Controller
// -----------------------------------------------------

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

        var dateIdentifier = parseInt(currentDate + currentTime, 10);




        // specify the map
        var specMap = null;
        var specMapSearchDB = null;

        if($scope.map != null){
            specMap = $scope.map.name;
            specMapSearchDB = $scope.map._id;
        }
        else{
            specMap = "Unknown";
            specMapSearchDB = null;
        }

        if(specMapSearchDB != null){
            // get the map and modify the values
            mapDB.get(specMapSearchDB).then(function(doc){
                // modify the values
                if(wl == "Victory"){
                    doc.wins++;
                }
                else if(wl == "Defeat"){
                    doc.losses++;
                }
                else if(wl == "Draw"){
                    doc.draws++;
                }
                else{
                    doc.unknownWinLoss++;
                }

                doc.gamesPlayed++;

                // update the array
                for(i = 0; i < maps.length; i++){
                    if(maps[i]._id == specMapSearchDB){
                        if(wl == "Victory"){
                            maps[i].wins++;
                        }
                        else if(wl == "Defeat"){
                            maps[i].losses++;
                        }
                        else if(wl == "Draw"){
                            maps[i].draws++;
                        }
                        else{
                            maps[i].unknownWinLoss++;
                        }
                        maps[i].gamesPlayed++;
                    }
                }

                return doc;
            }).then(function(response){
                mapDB.put(response).then(function(res){

                }).catch(function(err){
                    console.log(err);
                })
            }).catch(function(err){
                console.log(err);
            })
        }



        // get the heroes
        var hero1 = null;
        var hero2 = null;
        var hero3 = null;
        var hero4 = null;


        // check if a hero is selected twice or more times

        // hero was specified in slot 1, rest are duplicates
        if($scope.selectedHero1 != null && $scope.selectedHero2 != null){
            if($scope.selectedHero1._id == $scope.selectedHero2._id){

                $scope.selectedHero2 = null;
            }  
        }

        if($scope.selectedHero1 != null && $scope.selectedHero3 != null){
            if($scope.selectedHero1._id == $scope.selectedHero3._id){
                $scope.selectedHero3 = null;
            }
        }
        
        if($scope.selectedHero1 != null && $scope.selectedHero4 != null){
            if($scope.selectedHero1._id == $scope.selectedHero4._id){
                $scope.selectedHero4 = null;
            }
        }
        
        
        
        // hero was specified in slot 2, rest are duplicates
        if($scope.selectedHero2 != null && $scope.selectedHero3 != null){
            if($scope.selectedHero2._id == $scope.selectedHero3._id){
                $scope.selectedHero3 = null;
            }    
        }

        if($scope.selectedHero2 != null && $scope.selectedHero4 != null){
            if($scope.selectedHero2._id == $scope.selectedHero4._id){
                $scope.selectedHero4 = null;
            } 
        }
        
        
        
        // hero was specified in slot 3, rest are duplicates
        if($scope.selectedHero3 != null && $scope.selectedHero4 != null){
            if($scope.selectedHero3._id == $scope.selectedHero4._id){
                $scope.selectedHero4 = null;
            } 
        }
        



        
        if($scope.selectedHero1 != null){
            hero1 = $scope.selectedHero1._id;
            // update the hero db
            heroDB.get(hero1).then(function(doc){
                // get win/loss/draw and increment value
                if(wl == "Victory"){
                    doc.wins++;
                }
                else if(wl == "Defeat"){
                    doc.losses++;
                }
                else if(wl == "Draw"){
                    doc.draws++;
                }
                else{
                    doc.unknownWinLoss++;
                }
                doc.gamesPlayed++;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == hero1){
                        if(wl == "Victory"){
                            heroes[i].wins++;
                        }
                        else if(wl == "Defeat"){
                            heroes[i].losses++;
                        }
                        else if(wl == "Draw"){
                            heroes[i].draws++;
                        }
                        else{
                            heroes[i].unknownWinLoss++;
                        }
                        heroes[i].gamesPlayed++;
                    }
                }
                return doc;
            }).then(function(h1){
                heroDB.put(h1).then(function(res){

                }).catch(function(err){
                    console.log("Error while puting hero 1");
                    console.log(err);
                })
            }).catch(function(err){
                console.log("Error while updating hero 1");
                console.log(err);
            })
        }
        else{
            hero1 = "Unknown";
        }
        if($scope.selectedHero2 != null){
            hero2 = $scope.selectedHero2._id;
            // update the hero db
            heroDB.get(hero2).then(function(doc){
                // get win/loss/draw and increment value
                if(wl == "Victory"){
                    doc.wins++;
                }
                else if(wl == "Defeat"){
                    doc.losses++;
                }
                else if(wl == "Draw"){
                    doc.draws++;
                }
                else{
                    doc.unknownWinLoss++;
                }
                doc.gamesPlayed++;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == hero2){
                        if(wl == "Victory"){
                            heroes[i].wins++;
                        }
                        else if(wl == "Defeat"){
                            heroes[i].losses++;
                        }
                        else if(wl == "Draw"){
                            heroes[i].draws++;
                        }
                        else{
                            heroes[i].unknownWinLoss++;
                        }
                        heroes[i].gamesPlayed++;
                    }
                }
                return doc;
            }).then(function(h2){
                heroDB.put(h2).then(function(res){

                }).catch(function(err){
                    console.log("Error while puting hero 2");
                    console.log(err);
                })
            }).catch(function(err){
                console.log("Error while updating hero 2");
                console.log(err);
            })
        }
        else{
            hero2 = "Unknown";
        }
        if($scope.selectedHero3 != null){
            hero3 = $scope.selectedHero3._id;
            // update the hero db
            heroDB.get(hero3).then(function(doc){
                // get win/loss/draw and increment value
                if(wl == "Victory"){
                    doc.wins++;
                }
                else if(wl == "Defeat"){
                    doc.losses++;
                }
                else if(wl == "Draw"){
                    doc.draws++;
                }
                else{
                    doc.unknownWinLoss++;
                }
                doc.gamesPlayed++;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == hero3){
                        if(wl == "Victory"){
                            heroes[i].wins++;
                        }
                        else if(wl == "Defeat"){
                            heroes[i].losses++;
                        }
                        else if(wl == "Draw"){
                            heroes[i].draws++;
                        }
                        else{
                            heroes[i].unknownWinLoss++;
                        }
                        heroes[i].gamesPlayed++;
                    }
                }
                return doc;
            }).then(function(h3){
                heroDB.put(h3).then(function(res){

                }).catch(function(err){
                    console.log("Error while puting hero 3");
                    console.log(err);
                })
            }).catch(function(err){
                console.log("Error while updating hero 3");
                console.log(err);
            })
        }
        else{
            hero3 = "Unknown";
        }
        if($scope.selectedHero4 != null){
            hero4 = $scope.selectedHero4._id;
            // update the hero db
            heroDB.get(hero4).then(function(doc){
                // get win/loss/draw and increment value
                if(wl == "Victory"){
                    doc.wins++;
                }
                else if(wl == "Defeat"){
                    doc.losses++;
                }
                else if(wl == "Draw"){
                    doc.draws++;
                }
                else{
                    doc.unknownWinLoss++;
                }
                doc.gamesPlayed++;

                // update the array
                for(i = 0; i < heroes.length; i++){
                    if(heroes[i]._id == hero4){
                        if(wl == "Victory"){
                            heroes[i].wins++;
                        }
                        else if(wl == "Defeat"){
                            heroes[i].losses++;
                        }
                        else if(wl == "Draw"){
                            heroes[i].draws++;
                        }
                        else{
                            heroes[i].unknownWinLoss++;
                        }
                        heroes[i].gamesPlayed++;
                    }
                }
                return doc;
            }).then(function(h4){
                heroDB.put(h4).then(function(res){

                }).catch(function(err){
                    console.log("Error while puting hero 4");
                    console.log(err);
                })
            }).catch(function(err){
                console.log("Error while updating hero 4");
                console.log(err);
            })
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


        // groupsize
        var group = 0;
        if($scope.groupsize == null){
            group = 0;
        }
        else{
            group = $scope.groupsize;
        }

        // increment id
        dbIndex++;
        // turn the id into a string
        idString = dbIndex.toString();


        // create a new object containing all the information needed for an entry
        newEntry = {_id: idString, sr: $scope.newsr, matchEnd: wl,
         map: specMap, delta: delta,
        // heroes
        hero1: hero1, hero2: hero2, hero3: hero3, hero4: hero4,
        // friends
        groupsize: group,
        // date and time
        date: dateIdentifier};


        // add the entry to the array
        //dbEntries.push(newEntry);

        matchDB.put(newEntry).then(function (response) {
            // handle response
          }).catch(function (err) {
            console.log(err);
        });

        
        matchDB.get(idString).then(function (doc) {
            dbEntries.push(doc);    // handle doc
          }).catch(function (err) {
            console.log(err);
          }).then(function(){
            angular.element(document.getElementById('controllerBody')).scope().updateView();
          }).catch(function(err){
              console.log(err);
          });



        // set the values in the form to null
        $scope.newsr = null;
        $scope.winLoss = null;
        $scope.map = null;
        $scope.selectedHero1 = null;
        $scope.selectedHero2 = null;
        $scope.selectedHero3 = null;
        $scope.selectedHero4 = null;
        $scope.groupsize = null;

        // update the settings
        angular.element(document.getElementById('container-settings')).scope().updateView();

    }
});


// -----------------------------------------------------
// Settings Controller
// -----------------------------------------------------

app.controller('SettingsController', function($scope){

    $scope.heroDBSettingsController = heroes;

    $scope.mapDBSettingsController = maps;

    $scope.nightmode = false;

    $scope.showAddHeroError = false;
    $scope.showAddMapError = false;

    // get length of heroes array
    var heroesLength = heroes.length;
    // get length of maps array
    var mapLength = maps.length;

    $scope.showHeroDropDown = false;
    $scope.showMapDropDown = false;

    // create true false array with according length
    $scope.showContentDeleteHeroes = new Array(heroesLength);
    $scope.showContentDeleteMap = new Array(mapLength);
    
    // initialize
    for(i = 0; i < heroesLength; i++){
        $scope.showContentDeleteHeroes[i] = false;
    }

    for(i = 0; i < mapLength; i++){
        $scope.showContentDeleteMap[i] = false;
    }

    // toggle show content delete
    $scope.toggleShowContentDeleteHeroes = function(index){
        //
        $scope.showContentDeleteHeroes[index] = !$scope.showContentDeleteHeroes[index];
    }

    // toggle show content delete 
    $scope.toggleShowContentDeleteMap = function(index){
        //
        $scope.showContentDeleteMap[index] = !$scope.showContentDeleteMap[index];
    }

    $scope.toggleHeroDropDown = function(){
        var element = document.getElementById('heroDropDown');

        if($scope.showHeroDropDown == false){
            $scope.showHeroDropDown = true;
            element.setAttribute('src', '../../img/baseline-keyboard_arrow_up-24px.svg')
        }else{
            $scope.showHeroDropDown = false;
            element.setAttribute('src', '../../img/baseline-keyboard_arrow_down-24px.svg')


        }
    }

    $scope.toggleMapDropDown = function(){
        var element = document.getElementById('mapDropDown');

        if($scope.showMapDropDown == false){
            $scope.showMapDropDown = true;
            element.setAttribute('src', '../../img/baseline-keyboard_arrow_up-24px.svg')
        }else{
            $scope.showMapDropDown = false;
            element.setAttribute('src', '../../img/baseline-keyboard_arrow_down-24px.svg')


        }
    }

    $scope.removeHero = function(index, x){
        // x is the element to be deleted

        // remove the element from the array
        var arrayIndex = heroes.indexOf(x);
        if(arrayIndex !== -1){
            heroes.splice(arrayIndex, 1);
        }
        // close the contentDelete dialog
        $scope.showContentDeleteHeroes[index] = false;
        
        // remove the entry from the database
        // get the id of the element
        var varIndex = x._id;

        heroDB.get(varIndex).then(function(doc) {
            return heroDB.remove(doc);
          }).then(function (result) {
            // handle result
          }).catch(function (err) {
            console.log(err);
          });
    }

    // remove map
    $scope.removeMap = function(index, x){
        // x is the element to be deleted

        // remove the element from the array
        var arrayIndex = maps.indexOf(x);
        if(arrayIndex !== -1){
            maps.splice(arrayIndex, 1);
        }
        // close the contentDelete dialog
        $scope.showContentDeleteMap[index] = false;
        
        // remove the entry from the database
        // get the id of the element
        var varIndex = x._id;

        mapDB.get(varIndex).then(function(doc) {
            return mapDB.remove(doc);
          }).then(function (result) {
            // handle result
          }).catch(function (err) {
            console.log(err);
          });
    }


    $scope.updateView = function(){
        $scope.heroDBSettingsController = heroes;
        $scope.mapDBSettingsController = maps;
    }

    $scope.addHero = function (){
        // add a new hero

        // check if it already exists
        for(i = 0; i < heroes.length; i++){
            if(heroes[i].name == $scope.newHero){
                $scope.newHero = null;
                $scope.showAddHeroError = true;
                return;
            }
        }

        // setup new object
        newHeroElement = {_id: $scope.newHero, name: $scope.newHero, gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0}

        // add the hero to the data base
        heroDB.put(newHeroElement).then(function (response) {
            // handle response
          }).catch(function (err) {
            console.log(err);
        });

        // add it to the array
        heroes.push(newHeroElement);

        // clear the input field
        $scope.newHero = null;
        $scope.showAddHeroError = false;
    }

    // add map
    $scope.addMap = function (){
        // add a new hero


        if($scope.mapMode == null || $scope.newMap == null){
            $scope.showAddMapError = true;
            $scope.mapMode = null;
            $scope.newMap = null;
            return;
        }

        for(i = 0; i < maps.length; i++){
            if(maps[i].name == $scope.newMap){
                $scope.showAddMapError = true;
                $scope.mapMode = null;
                $scope.newMap = null;
                return;
            }
        }

        $scope.showAddMapError = false;

        var mode;

        if($scope.mapMode == 1){
            mode = "Assault";
        }
        else if($scope.mapMode == 2){
            mode = "Escort";
        }
        else if($scope.mapMode == 3){
            mode = "Hybrid";
        }
        else{
            mode = "Control";
        }


        
        // setup new object
        newMapElement = {_id: $scope.newMap, name: $scope.newMap, gamesPlayed: 0, wins: 0, losses: 0, draws: 0, unknownWinLoss: 0, type: mode};

        // add the hero to the data base
        mapDB.put(newMapElement).then(function (response) {
            // handle response
          }).catch(function (err) {
            console.log(err);
        });

        // add it to the array
        maps.push(newMapElement);

        // clear the input field
        $scope.newMap = null;
        $scope.mapMode = null;
        
    }

    $scope.toggleNightmode = function(){
        // this function is called from index.html
        if($scope.nightmode == true){
            turnNightmodeOn();
            globalNightmode = $scope.nightmode;
            // store new value
            store.set('nightmode', globalNightmode);
        }
        else{
            turnNightmodeOff();
            globalNightmode = $scope.nightmode;
            // store new value
            store.set('nightmode', globalNightmode);
        }
    }

    function turnNightmodeOff(){
        bodyElementCss.setAttribute('href', '../css/light-body-elements.css');
        html.setAttribute('style', 'background: url(../../img/eichenwalde_1_blur_1080p.png) no-repeat center fixed; background-size: cover;');
        
    }

    function turnNightmodeOn(){
        bodyElementCss.setAttribute('href', '../css/dark-body-elements.css');
        html.setAttribute('style', 'background: url(../../img/dorado_1_blur_1080p.png) no-repeat center fixed; background-size: cover;');
    }

    $scope.updateNightmode = function(){
        if(globalNightmode == true){
            $scope.nightmode = true;
            // change css
            bodyElementCss.setAttribute('href', '../css/dark-body-elements.css');
            html.setAttribute('style', 'background: url(../../img/dorado_1_blur_1080p.png) no-repeat center fixed; background-size: cover;');
        }
        else{
            $scope.nightmode = false;
            // change css
            bodyElementCss.setAttribute('href', '../css/light-body-elements.css');
            html.setAttribute('style', 'background: url(../../img/eichenwalde_1_blur_1080p.png) no-repeat center fixed; background-size: cover;');
        }
    }
    

});


// -----------------------------------------------------
// Season Controller
// -----------------------------------------------------

app.controller('SeasonController', function($scope){

    $scope.seasonArray = dbSeason;

    // get length of db array
    var length = dbSeason.length;
    // create true false array with according length
    $scope.showContentDelete = new Array(length);
    // initialize
    for(i = 0; i < length; i++){
        $scope.showContentDelete[i] = false;
    }
    

    $scope.toggleShowContentDelete = function(index){
        //
        $scope.showContentDelete[index] = !$scope.showContentDelete[index];
    }

    $scope.removeItem = function(index){
        // store the element which is to be removed
        var deletedElement = dbSeason[index];

        // remove the element from the array
        dbSeason.splice(index, 1);
        // close the contentDelete dialog
        $scope.showContentDelete[index] = false;
        
        // remove the entry from the database
        // get the id of the element
        var varIndex = deletedElement._id;
        seasonDB.get(varIndex.toString()).then(function(doc) {
            return seasonDB.remove(doc);
          }).then(function (result) {
            // handle result
          }).catch(function (err) {
            console.log(err);
          });


        angular.element(document.getElementById('container-season')).scope().updateView();
        angular.element(document.getElementById('controllerBody')).scope().updateView();

    }

    $scope.addSeason = function(){
        // first get the season high, low and current
        // iterate through array and get high and low
        var high = 0;
        var low = 10000000;
        for(i = 0; i < dbEntries.length; i++){
            // determine the high
            if(dbEntries[i].sr > high){
                high = dbEntries[i].sr;
            }
            // determine the low
            if(dbEntries[i].sr < low){
                low = dbEntries[i].sr;
            }
        }

        var current;

        if(dbEntries.length != 0){
            current = dbEntries[dbEntries.length-1].sr;
        }
        else{
            current = 0;
        }
        

        // clear the matchDB and the dbEntries array
        
        dbEntries = [];
        // destroy and create a new db
        destroyMatchDB();


        // reset heroDB and mapDB
        resetHeroDB();
        



        // create a new object in seasonDB
        dbSeasonIndex++;

        var seasonEntry = {
            _id: dbSeasonIndex.toString(),
            name: $scope.seasonName,
            seasonHigh: high,
            seasonLow: low,
            seasonEnd: current
        }

        seasonDB.put(seasonEntry).then(function(response){
        }).then(function(){
            // update the views
            angular.element(document.getElementById('controllerBody')).scope().updateView();
        }).catch(function(err){
            console.log(err);
        })

        // push it into the array
        dbSeason.push(seasonEntry);

        // set the $scope values to null
        $scope.seasonName = null;

        angular.element(document.getElementById('controllerBody')).scope().updateView(); 

    }




    $scope.updateView = function(){
        seasonArray = dbSeason;
    }
    

})


// destroy match db
function destroyMatchDB(){
    matchDB.destroy().then(function (response) {
        // success
      }).then(function(){
        // create a new mach db
        matchDB = new PouchDB('match_database');
      }).catch(function (err) {
        console.log(err);
      });
}


function resetHeroDB(){
    // reset the heroes array
    heroes = [];

    // reset the heroDB
    heroDB.allDocs({include_docs: true}).then(function(result){
        // get all entries
        // and iterate through them and rest them to their default value
        var tempId;

        for(i = 0; i < result.rows.length; i++){
            // get the id of the current entry
            tempId = result.rows[i].doc._id;

            // get the dataset from the database
            heroDB.get(tempId).then(function(hero){
                // reset the values of the hero
                hero.gamesPlayed = 0;
                hero.wins = 0;
                hero.losses = 0;
                hero.draws = 0;
                hero.unknownWinLoss = 0;

                // return hero
                return hero;

            }).then(function(hero){
                // put the hero back in
                heroDB.put(hero).then(function(result){
                    // anser from db
                }).catch(function(err){
                    console.log(err);
                })

                return hero;
            }).then(function(hero){
                // put it back in the array
                heroes.push(hero);
            }).catch(function(err){
                console.log(err);
            })
  
        }
    }).then(function(){
        // update settings
        angular.element(document.getElementById('container-settings')).scope().updateView();
        angular.element(document.getElementById('controllerBody')).scope().updateView();
        //angular.element(document.getElementById('controllerBody')).scope().$apply();
    }).catch(function (err){
        console.log(err);
    })
}

// group by filter
app.filter("groupBy",["$parse","$filter",function($parse,$filter){
    return function(array,groupByField){
      var result	= [];
              var prev_item = null;
              var groupKey = false;
              var filteredData = $filter('orderBy')(array,groupByField);
              for(var i=0;i<filteredData.length;i++){
                groupKey = false;
                if(prev_item !== null){
                  if(prev_item[groupByField] !== filteredData[i][groupByField]){
                    groupKey = true;
                  }
                } else {
                  groupKey = true;  
                }
                if(groupKey){
                  filteredData[i]['group_by_key'] =true;  
                } else {
                  filteredData[i]['group_by_key'] =false;  
                }
                result.push(filteredData[i]);
                prev_item = filteredData[i];
              }
              return result;
    }
  }])