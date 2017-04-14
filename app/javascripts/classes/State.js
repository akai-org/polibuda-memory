var app = app || {};

app.states = ['welcome', 'set-select', 'game', 'score'];

app.State = class {
    constructor() {
        let self = this;
        window.addEventListener('hashchange', function(){
            //TODO: Add protection for wrong hashes?
            self.set(window.location.hash);
        });
    }

    set(target) {
        target = target.replace('#', '');

        for(let i in app.states) {
            let state = app.states[i];
            document.getElementById(state).classList.add('hidden');
        }
        document.getElementById(target).classList.remove('hidden');

        switch (target) {
            case 'welcome':
                console.log('Loaded welcome screen');
                break;
            case 'set-select':
                console.log('Loaded set-select screen');
                break;
            case 'game':
                console.log('Loaded game screen');
                //Display cards
                if (!app.cardsDisplayed) {
                    let cardsContainer = document.getElementById('cards');
                    for(let set in app.activeSets) {
                        console.log('set: '+set);
                        app.sets[set].cards.forEach(function (card) {
                            cardsContainer.innerHTML += card.getDisplay();
                        })
                    }
                    app.cardsDisplayed = true;
                }
                break;
            case 'score':
                console.log('Loaded score screen');
                break;
        }
    }
};