let app = app || {};

document.addEventListener("DOMContentLoaded", function() {
    if(app.started) return;
    app.started = true;

    app.state = new app.State();
    //TODO: check state from hash?
    app.state.set('welcome');

    //All loaded sets (array of Set objects)
    app.sets = [];
    //Load sets
    app.setloader = new app.SetLoader();
    //Currently active sets (array of integer keys of app.sets)
    app.activeSets = [];
    //Activate all sets by default
    app.sets.forEach(function(set, key) {
        app.activeSets.push(set);
    });

});