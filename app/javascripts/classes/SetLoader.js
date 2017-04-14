var app = app || {};

app.SetLoader = class {

    constructor(){
        //TODO: This could maybe be moved to an external file,
        //but the set list is generally static, so an array will do.
        let setsToLoad = [
            'json/faculty-wa.json',
            'json/faculty-wbiis.json',
            'json/faculty-wbmiz.json',
            'json/faculty-we.json',
            'json/faculty-weit.json',
            'json/faculty-wft.json',
            'json/faculty-wi.json',
            'json/faculty-wiz.json',
            'json/faculty-wmrit.json',
            'json/faculty-wtch.json'
        ];

        this.loadSetsFromFileArray(setsToLoad);
    }

    loadSetsFromFileArray(fileArray) {
        let returnSetArray = [];
        fileArray.forEach(function (file) {
            console.log(file);
            app.sets.push(new app.Set(file));
        });
    }
}