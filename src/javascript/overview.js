function transitionToOverview(){
    var overview = document.getElementById("overview");
    var settings = document.getElementById("settings");
    var season = document.getElementById("season");
    var match = document.getElementById("match");

    overview.setAttribute("class", "active");
    settings.setAttribute("class", "");
    season.setAttribute("class", "");
    match.setAttribute("class", "");
}

function transitionToSettings(){
    // get the needed elements from the document
    var overview = document.getElementById("overview");
    var settings = document.getElementById("settings");
    var season = document.getElementById("season");
    var match = document.getElementById("match");
    var contentContainer = document.getElementById("content-container");

    // set the new header attributes
    overview.setAttribute("class", "");
    settings.setAttribute("class", "active");
    season.setAttribute("class", "");
    match.setAttribute("class", "");


    // add new body element
    var newElement = document.createElement("div");
    newElement.setAttribute("class", "body-element");
}



function transitionToSeason(){
    var overview = document.getElementById("overview");
    var settings = document.getElementById("settings");
    var season = document.getElementById("season");
    var match = document.getElementById("match");

    overview.setAttribute("class", "");
    settings.setAttribute("class", "");
    season.setAttribute("class", "active");
    match.setAttribute("class", "");
}

function transitionToMatch(){
    var overview = document.getElementById("overview");
    var settings = document.getElementById("settings");
    var season = document.getElementById("season");
    var match = document.getElementById("match");

    overview.setAttribute("class", "");
    settings.setAttribute("class", "");
    season.setAttribute("class", "");
    match.setAttribute("class", "active");
}