var app = app || {};

app.Set = class {


    //class fields
    //name = '';
    //image = '';
    //shortName = '';
    //cards = [];

    constructor(file) {
        //Load set from specified file
        this.loadFromFile(file);
    }

    loadFromFile(file) {
        let self = this;
        fetch(file)
            .then(function(response) {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function(json) {
                        let setType = json.memorySet.type;
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

    loadFaculty(json) {
        let self = this;
        let set = json.memorySet;
        //Set data from JSON file
        this.name = set.name;
        this.image = set.image;
        this.shortName = set.shortName;
        this.cards = [];
        //Create cards from people
        set.people.forEach( function (person) {
            let card = new app.Card();
            card.loadFromPerson(person);
            self.cards.push(card);
        });
    }

    getDisplay() {
        let self = this;
        let html = '';
        html += '<div class="set" data-name="' + self.name + '"'+ 'data-shortName="' + self.shortName + '"' +'>' +
            '<p>Set:' + self.name + '</p>' +
            '<input class="setCheckbox" type="checkbox">'+
            '</div>';
        return html;
    }

    loadPlace(json) {
        //TODO: fill this in
        console.log('Loaded place');
    }
}