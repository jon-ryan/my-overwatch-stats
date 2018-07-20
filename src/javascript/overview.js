function transitionToOverview(){
    // remove old elements
    var contentContainer = document.getElementById("content-container");
    contentContainer.removeChild(document.getElementById("container-dummy"));

    // get the nneded elements from the document
    var overview = document.getElementById("overview");
    var settings = document.getElementById("settings");
    var season = document.getElementById("season");
    var match = document.getElementById("match");
    var containerDummy = document.createElement("div");
    containerDummy.setAttribute("id", "container-dummy");

    // set the new header attributes
    overview.setAttribute("class", "active");
    settings.setAttribute("class", "");
    season.setAttribute("class", "");
    match.setAttribute("class", "");

    // add the new content
    var srBodyElement = document.createElement("div");
    // set the attribute to body element
    srBodyElement.setAttribute("class", "body-element");
    // add a heading
    var srHeading = document.createElement("h1");
    // append "SR-Rating"
    srHeading.appendChild(document.createTextNode("SR-Rating"));
    // append heading to body element
    srBodyElement.appendChild(srHeading);

    // add body element to the dummy
    containerDummy.appendChild(srBodyElement);
    


    // add the dummy to the content container
    contentContainer.appendChild(containerDummy);
}

function transitionToSettings(){
    // remove old elements
    var contentContainer = document.getElementById("content-container");
    document.getElementById("content-container").removeChild(document.getElementById("container-dummy"));
    
    // get the needed elements from the document
    var overview = document.getElementById("overview");
    var settings = document.getElementById("settings");
    var season = document.getElementById("season");
    var match = document.getElementById("match");
    var containerDummy = document.createElement("div");
    containerDummy.setAttribute("id", "container-dummy");

    // set the new header attributes
    overview.setAttribute("class", "");
    settings.setAttribute("class", "active");
    season.setAttribute("class", "");
    match.setAttribute("class", "");


    // add new body element
    var bodyElement = document.createElement("div");
    // set the class to body element and id to maximizeOnStartUp
    bodyElement.setAttribute("class", "body-element");
    bodyElement.setAttribute("id", "settingsBody");
    // add new label element
    var labelMaximize = document.createElement("label");
    // set label element class to checkbox container
    labelMaximize.setAttribute("class", "checkbox-container");
    // append text 
    labelMaximize.appendChild(document.createTextNode("Maximize on Start-Up"));
    // add new input element
    var inputMaximize = document.createElement("input");
    // set input element type to checkbox
    inputMaximize.setAttribute("type", "checkbox");
    // add span for custom check box
    var spanMaximize = document.createElement("span");
    // set span element class to checkmark
    spanMaximize.setAttribute("class", "checkmark");
    // append input to label
    labelMaximize.appendChild(inputMaximize);
    // append span to label
    labelMaximize.appendChild(spanMaximize);
    // append label to body element  
    bodyElement.appendChild(labelMaximize);
    

    // add separator
    var separator = document.createElement("div");
    // set class to separator
    separator.setAttribute("class", "separator");
    // append to content container
    bodyElement.appendChild(separator);

    // add nightmode
    // label nightmode
    var labelNightMode = document.createElement("label");
    //set label elementclass to checkbox container
    labelNightMode.setAttribute("class", "checkbox-container");
    // append text
    labelNightMode.appendChild(document.createTextNode("Nightmode"));
    // add inputelement
    var inputNightMode = document.createElement("input");
    // set type to checkbox
    inputNightMode.setAttribute("type", "checkbox");
    // add span for custom checkbox
    var spanNightMode = document.createElement("span");
    // set span element class to checkmark
    spanNightMode.setAttribute("class", "checkmark");
    // append input to label
    labelNightMode.appendChild(inputNightMode);
    // append span to label
    labelNightMode.appendChild(spanNightMode);
    // append label to body element
    bodyElement.appendChild(labelNightMode);


    // append body element to containerDummy
    containerDummy.appendChild(bodyElement);
    // append body element to contentcontainer
    contentContainer.appendChild(containerDummy);
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