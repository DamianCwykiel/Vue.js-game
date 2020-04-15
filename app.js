new Vue({
    el:'#app',
    data: {
        kaskaHealth: 100,
        damianHealth: 100,
        gameStarted: false,
        turns: []
    },
    methods: {
        startGameNow: function() {
            this.gameStarted = true;
            this.kaskaHealth= 100;
            this.damianHealth = 100;
            this.turns = [];
        },
        attack: function() {
            //damian
            damage = this.calculateDamage(5, 20);
            this.damianHealth -= damage;
           
            this.damianAttack();

            if (this.winner()) {
                return;
            }

            //Kaska
            // damage = this.calculateDamage(1, 10)
            // this.kaskaHealth -= damage;

            this.turns.unshift({
                isKaska: true,
                text: 'Kaśka hurts poor damian:' + ' ' + damage + ' times. '+ 'maybe he has a family, don`t you think?!'
            });

            this.winner();

        },
        hardAttack: function() {
            let damage = this.calculateDamage(5, 25)
            this.damianHealth -= damage;
            this.turns.unshift({
                isKaska: true,
                text: 'Kaśka hurts damian badly:' + ' ' + damage + ' times.' + ' Sad...'
            })
            if (this.winner()) {
                return;
            }
            this.damianAttack();

        },
        heal: function () {
            if( this.kaskaHealth <= 85) {
                this.kaskaHealth += 15;
            } else {
                this.kaskaHealth = 100;
            }
            this.damianAttack();
            this.turns.unshift({
                isKaska: true,
                text: 'Kaśka`s repaired 15 times.'
            })
            
        },
        giveUp: function() {
            if (this.damianHealth < this.kaskaHealth || this.damianHealth == 100) {
                if(confirm('Kaśka are you sure you want to quit this game? you still can win!'))
                return this.gameStarted = false;
            } else {
                if(confirm(`Kaśka you're losing, better to quit?`))
                return this.gameStarted = false;
            }
        },
        damianAttack: function () {
            let damage = this.calculateDamage(1, 10);
            this.kaskaHealth -= damage;
            this.winner();

            this.turns.unshift({
                isKaska: false,
                text: 'Damian laughs at Kaśka:' + ' ' + damage + ' times.' + 'Ha ha ha :)'
            });
        },
        calculateDamage: function(minVal, maxVal) {
            return Math.max(Math.floor(Math.random() * maxVal) +1, minVal);
        },
        winner: function() {
            if(this.damianHealth <= 5) {
                if(confirm('Kaśka You won! New game?')) {
                    this.startGameNow(); 
                } else {
                    this.startGameNow();
                }
                return true;
            } else if (this.kaskaHealth <= 0) {
                if(confirm('Kaśka You lost! New game?')) {
                    this.startGameNow(); 
                } else {
                    this.startGameNow();
                }
                return true;
            }
            return false;
         }
    }
});
