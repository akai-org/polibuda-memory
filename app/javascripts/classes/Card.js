var app = app || {};

app.Card = class {
    constructor() {
    }

    loadFromPerson(person) {
        this.type = 'person';
        this.name = person.name;
        this.position = person.position;
        this.titleBefore = person.titleBefore || '';
        this.titleAfter = person.titleAfter || '';
        //Add a sample image for people without images
        //http://www.clipartkid.com/images/649/blank-face-outline-cliparts-co-W4GNfR-clipart.jpg
        this.image =  person.image  || 'images/faculty/blank-face.jpg';
        this.pageLink = person.pageLink;
    }

    getDisplay() {
        let ret = '';
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
}