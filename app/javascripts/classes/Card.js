var app = app || {};

app.Card = class {
    constructor() {
    }

    loadFromPerson(person) {
        this.name = person.name;
        this.position = person.position;
        this.titleBefore = person.titleBefore || '';
        this.titleAfter = person.titleAfter || '';
        //Add a sample image for people without images
        //http://www.clipartkid.com/images/649/blank-face-outline-cliparts-co-W4GNfR-clipart.jpg
        this.image = person.image || 'images/faculty/blank-face.jpg';
        this.pageLink = person.pageLink;
    }
}