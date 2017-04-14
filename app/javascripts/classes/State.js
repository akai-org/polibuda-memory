var app = app || {};

app.states = ['welcome', 'set-select', 'game', 'score'];

app.State = class {
    constructor() {
        let $this = this;
        window.addEventListener('hashchange', function(){
            //TODO: Add protection for wrong hashes?
            $this.set(window.location.hash);
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
                break;
            case 'score':
                console.log('Loaded score screen');
                break;
        }
    }
};