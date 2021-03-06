var calc = new Vue({
    el: '#calculator-section',
    data: {
        numberOfKvm: '',
        serviceType: '',
        numberOfKgSalt: '',
        numberOfWinterHours: '',
        activeQuestion: '',
        extra: '',
        editKvmText: 'Endre',
        startActive: true,
        widgetActive: false,
        widgetContentActive: false,
        welcomeScreen: false,
        nextQuestion: '',
        error: false,

        dagligVask: { active: false, pricePerKvm: 10 },
        flytteVask: { active: false, pricePerKvm: 43 },
        vindusvask: { inside: false, outside: false, pricePerSide: 12,  },
        byggvask: { active: false, silicon: false, maling: false, pricePerKvm: 19, priceSilicon: 10, priceMaling: 10 },
        nedvask: { active: false, pricePerKvm: 43 },
        tepperens: { active: false, pricePerKvm: 25 },
        gulvbehandling: { boning: false, skuring: false, priceBoning: 20, priceSkuring: 20 },
        winter: { broyting: false, salting: false, broytingPerHour: 500, saltingPerHour: 250, saltPerKg: 2 },
        contact: { name: '', email: '', message: ''},
    },
    methods: {
        groupBeforeEnter: function(el) {
            $(el).addClass('fade-transform-enter-before');
        },
        groupEnter: function(el, done) {
            var index = el.dataset.index;
            var delay = index * 300;
            
            setTimeout(function() {
                $(el).addClass('fade-transform-enter-to');
            }, delay);

            /* call done after the last is finished element */
            $('.last').one("webkitTransitionEnd transitionend oTransitionEnd otransitionend", function() {
                done();
            })
        },
        groupLeave: function(el, done) {
            var index = el.dataset.index;
            var delay = index * 300;
            setTimeout(function() {
                $(el).removeClass('fade-transform-enter-to fade-transform-enter-before');
                $(el).addClass('fade-transform-leave-before').addClass('fade-transform-leave-to');
            }, delay);

            /* call done after the last is finished element */
            $('.last').one("webkitTransitionEnd transitionend oTransitionEnd otransitionend", function() {
                done();
            })
        },
        next: function(nextQuestion) {
            this.nextQuestion = nextQuestion;
            this.activeQuestion = '';
        },
        setServiceType: function(e) {
            var serviceType = e.target.textContent;
            this.serviceType = serviceType;
            this.activeQuestion = '';

            if(serviceType == "Periodisk vask") {
                this.nextQuestion = 'periodicQuestion';
            } else if(serviceType == "Gulvbehandling"){
                this.nextQuestion = 'floorQuestion';
            } else if(serviceType == "Tilleggstjenester"){
                this.nextQuestion = 'extraQuestion';
            } else if(serviceType == "Daglig vask"){
                this.dagligVask.active = true;
                this.nextQuestion = 'kvmQuestion';
            } else if(serviceType == "Flyttevask") {
                this.flytteVask.active = true;
                this.nextQuestion = 'kvmQuestion';
            }
        },
        checkRequired: function() {
            if(this.vindusvask.inside || this.vindusvask.outside || this.gulvbehandling.boning || this.gulvbehandling.skuring) {
                this.error = false;
                this.next('kvmQuestion');
            } else {
                this.error = true
            } 
        },
        ifSalt: function() {
            if(this.winter.salting) {
                this.nextQuestion = 'kgSaltQuestion'
            } else {
                this.nextQuestion = 'winterHoursQuestion';
            }
            this.activeQuestion = '';
        },
        setPeriodicService: function(e) {
            var periodicType = e.target.textContent;
            this.serviceType = periodicType;
            this.activeQuestion = '';

            if(periodicType == 'Vindusvask') {
                this.vindusvask.active = true;
                this.nextQuestion = 'windowQuestion';
            } else if(periodicType == 'Byggvask') {
                this.byggvask.active = true;
                this.nextQuestion = 'byggQuestion';
            } else if(periodicType == 'Tepperens') {
                this.tepperens.active = true;
                this.nextQuestion = 'kvmQuestion';
            } else if(periodicType == 'Nedvask') {
                this.nedvask.active = true;
                this.nextQuestion = 'kvmQuestion';
            }
        },
        setExtraService: function(e) {
            var extraType = e.target.textContent;
            this.nextQuestion = 'winterQuestion';
            this.activeQuestion = '';
        },
        finish: function() {
            this.addExtraToArray();
            this.nextQuestion = 'finish';
            this.activeQuestion = '';
        },
        resetData: function() {
            this.dagligVask.active = false;
            this.flytteVask.active = false;
            this.vindusvask.inside = false;
            this.vindusvask.outside = false;
            this.byggvask.active = false;
            this.byggvask.silicon = false;
            this.byggvask.maling = false;
            this.nedvask.active = false;
            this.tepperens.active = false;
            this.gulvbehandling.boning = false;
            this.gulvbehandling.skuring = false;
            this.winter.broyting = false;
            this.winter.salting = false;
            this.numberOfKvm = '';
            this.serviceType = '';
            this.numberOfKgSalt = '';
            this.numberOfWinterHours = '';
            this.extra = '';
            this.error = false;
        },
        addExtraToArray: function() {
            var self = this;
            new Map([ ['Innvendig',this.vindusvask.inside], ['Utvendig',this.vindusvask.outside], ['Silikon',this.byggvask.silicon], ['Maling',this.byggvask.maling], 
            ['Boning',this.gulvbehandling.boning], ['Skuring',this.gulvbehandling.skuring], ['Brøyting',this.winter.broyting], ['Salting',this.winter.salting] ])
            .forEach(function(value, key) {
                if(value) {
                    self.extra += key + ', ';
                }
            })
            self.extra = self.extra.slice(0, -2);
        },
    },

    computed: {
        totalPrice: function() {
            var total = 0;

            if(this.vindusvask.inside) {
                total += this.vindusvask.pricePerSide*this.numberOfKvm;
            } 
            if(this.vindusvask.outside) {
                total += this.vindusvask.pricePerSide*this.numberOfKvm;
            }
            if(this.dagligVask.active) {
                total += this.dagligVask.pricePerKvm*this.numberOfKvm;
            }
            if(this.byggvask.active) {
                total += this.byggvask.pricePerKvm*this.numberOfKvm;
            }
            if(this.byggvask.silicon) {
                total += this.byggvask.priceSilicon*this.numberOfKvm;
            }
            if(this.byggvask.maling) {
                total += this.byggvask.priceMaling*this.numberOfKvm;
            }
            if(this.nedvask.active) {
                total += this.nedvask.pricePerKvm*this.numberOfKvm;
            }
            if(this.tepperens.active) {
                total += this.tepperens.pricePerKvm*this.numberOfKvm;
            }
            if(this.gulvbehandling.boning) {
                total += this.gulvbehandling.priceBoning*this.numberOfKvm;
            }
            if(this.gulvbehandling.skuring) {
                total += this.gulvbehandling.priceSkuring*this.numberOfKvm;
            }
            if(this.flytteVask.active) {
                total += this.flytteVask.pricePerKvm*this.numberOfKvm;
            }
            if(this.winter.broyting) {
                total += this.winter.broytingPerHour*this.numberOfWinterHours;
            }
            if(this.winter.salting) {
                total += this.winter.saltingPerHour*this.numberOfWinterHours + this.numberOfKgSalt*this.winter.saltPerKg;
            }
            return total;
        }
    }
});