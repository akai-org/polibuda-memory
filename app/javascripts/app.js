var app = app || {};

document.addEventListener("DOMContentLoaded", function() {
    if(app.started) return;
    app.started = true;

    app.state = new app.State();
    app.state.set('welcome');

    app.wbiisSet = new app.Set('json/faculty-wbiis.json');

});