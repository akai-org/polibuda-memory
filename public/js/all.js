"use strict";

var app = app || {};

document.addEventListener("DOMContentLoaded", function () {
    if (app.started) return;
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
    app.sets.forEach(function (set, key) {
        app.activeSets.push(set);
    });

    //New set select screen class
    app.setselectscreen = new app.SetSelectScreen();
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.Card = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'loadFromPerson',
        value: function loadFromPerson(person) {
            this.type = 'person';
            this.name = person.name;
            this.position = person.position;
            this.titleBefore = person.titleBefore || '';
            this.titleAfter = person.titleAfter || '';
            //Add a sample image for people without images
            //http://www.clipartkid.com/images/649/blank-face-outline-cliparts-co-W4GNfR-clipart.jpg
            this.image = person.image || 'images/faculty/blank-face.jpg';
            this.pageLink = person.pageLink;
        }
    }, {
        key: 'getDisplay',
        value: function getDisplay() {
            var ret = '';
            ret += '<div class="card" id="">';
            ret += '<img src="' + this.image + '">';
            ret += '<div class="displayName">';
            ret += '<span class="titleBefore">' + this.titleBefore + '</span>';
            ret += '<span class="name">' + this.name + '</span>';
            ret += '<span class="titleAfter">' + this.titleAfter + '</span>';
            ret += '</div>';
            ret += '<span class="position">' + this.position + '</span>';
            ret += '</div>';

            return ret;
        }
    }]);

    return _class;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.Set = function () {

    //class fields
    //name = '';
    //image = '';
    //shortName = '';
    //cards = [];

    function _class(file) {
        _classCallCheck(this, _class);

        //Load set from specified file
        this.loadFromFile(file);
    }

    _createClass(_class, [{
        key: "loadFromFile",
        value: function loadFromFile(file) {
            var self = this;
            fetch(file).then(function (response) {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json) {
                        var setType = json.memorySet.type;
                        if (setType == 'faculty') {
                            //Loading a faculty
                            self.loadFaculty(json);
                        } else if (setType == 'place') {
                            //Loading a place
                            self.loadPlace(json);
                        } else {
                            console.log('Unknown set type');
                            console.log(json);
                        }
                    });
                } else {
                    console.log('Oops, we haven\'t got JSON! File: ' + file);
                }
            });
        }
    }, {
        key: "loadFaculty",
        value: function loadFaculty(json) {
            var self = this;
            var set = json.memorySet;
            //Set data from JSON file
            this.name = set.name;
            this.image = set.image;
            this.shortName = set.shortName;
            this.cards = [];
            //Create cards from people
            set.people.forEach(function (person) {
                var card = new app.Card();
                card.loadFromPerson(person);
                self.cards.push(card);
            });
        }
    }, {
        key: "getDisplay",
        value: function getDisplay() {
            var self = this;
            var html = '';
            html += '<div class="set" data-name="' + self.name + '"' + 'data-shortName="' + self.shortName + '"' + '>' + '<p>Set:' + self.name + '</p>' + '<input class="setCheckbox" type="checkbox">' + '</div>';
            return html;
        }
    }, {
        key: "loadPlace",
        value: function loadPlace(json) {
            //TODO: fill this in
            console.log('Loaded place');
        }
    }]);

    return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.SetLoader = function () {
    function _class() {
        _classCallCheck(this, _class);

        //TODO: This could maybe be moved to an external file,
        //but the set list is generally static, so an array will do.
        var setsToLoad = ['json/faculty-wa.json', 'json/faculty-wbiis.json', 'json/faculty-wbmiz.json', 'json/faculty-we.json', 'json/faculty-weit.json', 'json/faculty-wft.json', 'json/faculty-wi.json', 'json/faculty-wiz.json', 'json/faculty-wmrit.json', 'json/faculty-wtch.json'];

        this.loadSetsFromFileArray(setsToLoad);
    }

    _createClass(_class, [{
        key: 'loadSetsFromFileArray',
        value: function loadSetsFromFileArray(fileArray) {
            var returnSetArray = [];
            fileArray.forEach(function (file) {
                console.log(file);
                app.sets.push(new app.Set(file));
            });
        }
    }]);

    return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

app.SetSelectScreen = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: 'load',
        value: function load() {
            var self = this;
            console.log('Loaded set-select screen');
            //Fill in available sets
            app.setsDisplayed = false;
            self.displaySets();
            //Fill in checked state
            self.updateSetsState();
        }
    }, {
        key: 'updateSetsState',
        value: function updateSetsState() {
            //Update checked/unchecked state
            var setsContainer = document.getElementById('sets');
            //check or uncheck depending if its loaded
            app.activeSets.forEach(function (activeSet) {
                console.log(activeSet.name);
                [].forEach.call(setsContainer.querySelectorAll('[data-shortname="' + activeSet.shortName + '"]'), function (div) {
                    [].slice.call(div.getElementsByClassName('setCheckbox')).forEach(function (checkbox) {
                        checkbox.checked = true;
                    });
                });
            });
        }
    }, {
        key: 'displaySets',
        value: function displaySets() {
            //Display available sets to screen
            if (!app.setsDisplayed) {
                var setsContainer = document.getElementById('sets');
                app.sets.forEach(function (set) {
                    setsContainer.innerHTML += set.getDisplay();
                });
                app.setsDisplayed = true;
            }
        }
    }, {
        key: 'addSet',
        value: function addSet(set) {
            //Add set to playable
        }
    }, {
        key: 'removeSet',
        value: function removeSet(set) {
            //remove set from playable
        }
    }]);

    return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = app || {};

//Screens in the app
app.states = ['welcome', 'set-select', 'game', 'score'];

app.State = function () {
    function _class() {
        _classCallCheck(this, _class);

        var self = this;
        window.addEventListener('hashchange', function () {
            //TODO: Add protection for wrong hashes?
            self.set(window.location.hash);
        });
    }

    _createClass(_class, [{
        key: 'set',
        value: function set(target) {
            target = target.replace('#', '');

            for (var i in app.states) {
                var state = app.states[i];
                document.getElementById(state).classList.add('hidden');
            }
            document.getElementById(target).classList.remove('hidden');

            switch (target) {
                case 'welcome':
                    console.log('Loaded welcome screen');
                    break;
                case 'set-select':
                    app.setselectscreen.load();
                    break;
                case 'game':
                    console.log('Loaded game screen');
                    //Display cards
                    if (!app.cardsDisplayed) {
                        (function () {
                            var cardsContainer = document.getElementById('cards');
                            for (var set in app.activeSets) {
                                console.log('set: ' + set);
                                app.sets[set].cards.forEach(function (card) {
                                    cardsContainer.innerHTML += card.getDisplay();
                                });
                            }
                            app.cardsDisplayed = true;
                        })();
                    }
                    break;
                case 'score':
                    console.log('Loaded score screen');
                    break;
            }
        }
    }]);

    return _class;
}();
//# sourceMappingURL=all.js.map
