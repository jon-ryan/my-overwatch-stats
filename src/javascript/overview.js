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
var mapDBIndex = 100;
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
            mapDBIndex = 100;
        }
        // else its the id of the last element
        else{
            mapDBIndex = maps[maps.length-1]._id;
            mapDBSize = maps.length;
        }

        // return the herdbSize
        return mapDBSize;
    }).then(function(mapdbSize){
        if(mapdbSize == 0){

            // create object (Hanamura)
            var tempMap = {_id: mapDBIndex.toString(), name: 'Hanamura'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Hanamura'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Horizon Lunar Colony)
            tempMap = {_id: mapDBIndex.toString(), name: 'Horizon Lunar Colony'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Horizon Lunar Colony'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Temple of Anubis)
            tempMap = {_id: mapDBIndex.toString(), name: 'Temple of Anubis'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Temple of Anubis'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;


            // create object (Volskaya Industries)
            tempMap = {_id: mapDBIndex.toString(), name: 'Volskaya Industries'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Volskaya Industries'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Dorado)
            tempMap = {_id: mapDBIndex.toString(), name: 'Dorado'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Dorado'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Junkertown)
            tempMap = {_id: mapDBIndex.toString(), name: 'Junkertown'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Junkertown'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;


            // create object (Rialto)
            tempMap = {_id: mapDBIndex.toString(), name: 'Rialto'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Rialto'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Route 66)
            tempMap = {_id: mapDBIndex.toString(), name: 'Route 66'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Route 66'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Watchpoint: Gibralta)
            tempMap = {_id: mapDBIndex.toString(), name: 'Watchpoint: Gibralta'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Watchpoint: Gibralta'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Blizzard World)
            tempMap = {_id: mapDBIndex.toString(), name: 'Blizzard World'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Blizzard World'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Eichenwalde)
            tempMap = {_id: mapDBIndex.toString(), name: 'Eichenwalde'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Eichenwalde'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Hollywood)
            tempMap = {_id: mapDBIndex.toString(), name: 'Hollywood'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Hollywood'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (King's Row)
            tempMap = {_id: mapDBIndex.toString(), name: 'King\'s Row'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'King\'s Row'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Numbani)
            tempMap = {_id: mapDBIndex.toString(), name: 'Numbani'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Numbani'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Ilios)
            tempMap = {_id: mapDBIndex.toString(), name: 'Ilios'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Ilios'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;


            // create object (Lijiang Tower)
            tempMap = {_id: mapDBIndex.toString(), name: 'Lijiang Tower'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Lijiang Tower'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;

            // create object (Nepal)
            tempMap = {_id: mapDBIndex.toString(), name: 'Nepal'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Nepal'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;
            
            // create object (Oasis)
            tempMap = {_id: mapDBIndex.toString(), name: 'Oasis'};
            // push to database
            mapDB.put(tempMap).then(function(response){
                // response
                maps.push({_id: mapDBIndex.toString(), name: 'Oasis'});
            }).catch(function (err){
                console.log(err);
            }) 
            // increment mapDBIndex
            mapDBIndex++;
        }
        
    }).then(function(){
        angular.element(document.getElementById('container-settings')).scope().updateView();
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

    $scope.gamesplayed = 0;
    $scope.wins = 0;
    $scope.losses = 0;
    $scope.draws = 0;
    $scope.avgdelta = 0;
    $scope.unknownWinLoss = 0;


    // setup new chart for SR-Rating
    var srRatingCanvas = document.getElementById('srrating-canvas').getContext('2d');
    var winlossCanvas = document.getElementById('winloss-canvas');

    var srRatingChartData = [];
    var srRatingChartLabel = [];

    var winlossChartData = [];

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

    


    // -----------
    // charts END
    //  ----------

    // test
    $scope.showDB = function(){

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
        var matchID = deletedElement._id;
        var matchHero1 = deletedElement.hero1;
        var matchHero2 = deletedElement.hero2;
        var matchHero3 = deletedElement.hero3;
        var matchHero4 = deletedElement.hero4;
        var matchWinLoss = deletedElement.matchEnd;

        // remove the entry from the match db
        matchDB.get(matchID.toString()).then(function(doc) {
            return matchDB.remove(doc);
          }).then(function (result) {
            // handle result
          }).catch(function (err) {
            console.log(err);
          });

        // update the heroDB
        if(matchHero1 != "Unknown"){
            heroDB.get(matchHero1).then(function(doc){
                console.log("MatchWinLoss");
                console.log(matchWinLoss);
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
                    if(heroes[i].name == matchHero1){
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
                    if(heroes[i].name == matchHero2){
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
                    if(heroes[i].name == matchHero3){
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
                    if(heroes[i].name == matchHero4){
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
            }).catch(function(err){
                console.log("Error while deleting hero");
                console.log(err);
            })
        }



        // update the delta
        updateDelta(index);
        angular.element(document.getElementById('controllerBody')).scope().updateView();
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
        
        // update the charts

        // update the srRating chart
        // get the needed data from dbEntries
        srRatingChartData = new Array();
        srRatingChartLabel = new Array();
        // fill the arrays
        for(i = 0; i < dbEntries.length; i++){
            srRatingChartData.push(dbEntries[i].sr);
            srRatingChartLabel.push("Match " + (i+1).toString());
        }
        srRatingChart.data.labels = srRatingChartLabel;
        srRatingChart.data.datasets[0].data = srRatingChartData;
        srRatingChart.update({
            duration: 800,
            easing: 'easeOutBounce'
        });

        // get games played
        $scope.gamesplayed = dbEntries.length;

        // reset wins, losses and draws
        $scope.wins = $scope.losses = $scope.draws = $scope.unknownWinLoss = $scope.avgdelta = 0;
        // get wins
        // get losses
        // get draws
        for(i = 0; i < dbEntries.length; i++){
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
        }

        $scope.avgdelta = ($scope.avgdelta / dbEntries.length).toFixed(2);

        winlossChart.data.datasets[0].data = [$scope.wins, $scope.losses, $scope.draws, $scope.unknownWinLoss];
        winlossChart.update({
            duration: 800,
            easing: 'easeOutBounce'
        })


        
        $scope.dbArray = dbEntries;

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

        var dateIdentifier = parseInt(currentDate + currentTime, 10);




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

        // check if a hero is selected twice or more times
        if($scope.selectedHero1 == $scope.selectedHero2 || $scope.selectedHero1 == $scope.selectedHero3 || $scope.selectedHero1 == $scope.selectedHero4 ||
            $scope.selectedHero2 == $scope.selectedHero3 || $scope.selectedHero2 == $scope.selectedHero4 ||
            $scope.selectedHero3 == $scope.selectedHero4){
                // hero was specified in slot 1, rest are duplicates
                if($scope.selectedHero1 == $scope.selectedHero2){
                    $scope.selectedHero2 = null;
                }
                if($scope.selectedHero1 == $scope.selectedHero3){
                    $scope.selectedHero3 = null;
                }
                if($scope.selectedHero1 == $scope.selectedHero4){
                    $scope.selectedHero4 = null;
                }

                // hero was specified in slot 2, rest are duplicates
                if($scope.selectedHero2 == $scope.selectedHero3){
                    $scope.selectedHero3 = null;
                }
                if($scope.selectedHero2 == $scope.selectedHero4){
                    $scope.selectedHero4 = null;
                }

                // hero was specified in slot 3, rest are duplicates
                if($scope.selectedHero3 == $scope.selectedHero4){
                    $scope.selectedHero4 = null;
                }
            }


        
        if($scope.selectedHero1 != null){
            hero1 = $scope.selectedHero1.name;
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
                    if(heroes[i].name == hero1){
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
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

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
            hero2 = $scope.selectedHero2.name;
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
                    if(heroes[i].name == hero2){
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
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

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
            hero3 = $scope.selectedHero3.name;
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
                    if(heroes[i].name == hero3){
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
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

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
            hero4 = $scope.selectedHero4.name;
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
                    if(heroes[i].name == hero4){
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
            }).then(function(doc){
                heroDB.put(doc).then(function(res){

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

        // increment id
        dbIndex++;
        // turn the id into a string
        idString = dbIndex.toString();


        // convert match duration to seconds
        // if seconds is greater than 59, make it to 59
        if($scope.matchDurationSeconds > 59){
            $scope.matchDurationSeconds = 59;
        }
        var matchDuration = $scope.matchDurationMinutes * 60 + $scope.matchDurationSeconds;

        // convert the objective time to seconds
        // if seconds is greater than 59, make it to 59
        if($scope.objectiveTimeSeconds > 59){
            $scope.objectiveTimeSeconds = 59;
        }
        var objectiveTime = $scope.objectiveTimeMinutes * 60 + $scope.objectiveTimeSeconds;


        

        // create a new object containing all the information needed for an entry
        newEntry = {_id: idString, sr: $scope.newsr, matchEnd: wl, matchDuration: matchDuration,
        scoreBlue: $scope.scoreBlue, scoreRed: $scope.scoreRed, map: specMap, startingSide: side, delta: delta,
        // heroes
        hero1: hero1, hero2: hero2, hero3: hero3, hero4: hero4,
        // friends
        groupSize: groupsize, friend1: $scope.friend1, friend2: $scope.friend2, friend3: $scope.friend3, friend4: $scope.friend4, friend5: $scope.friend5,
        // general match statistics
        eliminations: $scope.eliminations, objectiveKills: $scope.objectiveKills, objectiveTime: objectiveTime,
        heroDamageDone: $scope.heroDamageDone, healingDone: $scope.healingDone, deaths: $scope.deaths,
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
        $scope.scoreBlue = null;
        $scope.scoreRed = null;
        $scope.winLoss = null;
        $scope.matchDurationMinutes = null;
        $scope.matchDurationSeconds = null;
        $scope.eliminations = null;
        $scope.objectiveKills = null;
        $scope.objectiveTimeMinutes = null;
        $scope.objectiveTimeSeconds = null;
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
        $scope.showContentDeleteMap[index] = !$scope.showContentDeleteHeroes[index];
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

        heroDB.get(varIndex.toString()).then(function(doc) {
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

        mapDB.get(varIndex.toString()).then(function(doc) {
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
        // increment index
        mapDBIndex++;
        
        // setup new object
        newMapElement = {_id: mapDBIndex.toString(), name: $scope.newMap}

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

        var current = dbEntries[dbEntries.length-1].sr;

        // clear the matchDB and the dbEntries array
        
        dbEntries = [];
        // destroy and create a new db
        destroyMatchDB();

        



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
    console.log(matchDB);
    matchDB.destroy().then(function (response) {
        // success
      }).then(function(){
        // create a new mach db
        matchDB = new PouchDB('match_database');
      }).catch(function (err) {
        console.log(err);
      });
}

