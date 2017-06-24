var app = app || {};

app.SetSelectScreen = class {

    load() {
        let self = this;
        console.log('Loaded set-select screen');
        //Fill in available sets
        app.setsDisplayed = false;
        self.displaySets();
        //Fill in checked state
        self.updateSetsState();
    }

    updateSetsState() {
        //Update checked/unchecked state
        let setsContainer = document.getElementById('sets');
        //check or uncheck depending if its loaded
        app.activeSets.forEach(function (activeSet) {
            console.log(activeSet.name);
            [].forEach.call(setsContainer.querySelectorAll('[data-shortname="' + activeSet.shortName + '"]'), function (div) {
                [].slice.call(div.getElementsByClassName('setCheckbox')).forEach(function (checkbox) {
                   checkbox.checked=true;
                });
            });
        });

    }

    displaySets() {
        //Display available sets to screen
        if (!app.setsDisplayed) {
            let setsContainer = document.getElementById('sets');
            app.sets.forEach(function (set) {
                setsContainer.innerHTML += set.getDisplay();
            });
            app.setsDisplayed = true;
        }
    }

    addSet(set) {
        //Add set to playable
    }

    removeSet(set) {
        //remove set from playable
    }

}