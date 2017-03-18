new Vue({
    el: '#calculator-section',
    data: {
        numberOfKvm: 0,
        serviceType: '',
        periodicService: '',
        numberOfKgSalt: '',
        numberOfWinterHours: '',
        activeQuestion: 'servicesQuestion',

        dagligVask: { active: false, pricePerKvm: 10 },
        flytteVask: { active: false, pricePerKvm: 43 },
        vindusvask: { inside: false, outside: false, pricePerSide: 12 },
        byggvask: { active: false, silicon: false, maling: false, pricePerKvm: 19, priceSilicon: 10, priceMaling: 10 },
        nedvask: { active: false, pricePerKvm: 43 },
        tepperens: { active: false, pricePerKvm: 25 },
        gulvbehandling: { boning: false, skuring: false, priceBoning: 25, priceSkuring: 20 },
        winter: { broyting: false, salting: false, broytingPerHour: 500, saltingPerHour: 250, saltPerKg: 2 },
    },
    methods: {
        setServiceType: function(e) {
            var serviceType = e.target.textContent;
            this.serviceType = serviceType;

            if(serviceType == "Periodisk vask") {
                this.activeQuestion = 'periodicQuestion';
            } else if(serviceType == "Gulvbehandling"){
                this.activeQuestion = 'floorQuestion';
            } else if(serviceType == "Tilleggstjenester"){
                this.activeQuestion = 'extraQuestion';
            } else if(serviceType == "Daglig vask"){
                this.dagligVask.active = true;
                this.activeQuestion = 'kvmQuestion';
            } else if(serviceType == "Flyttevask") {
                this.flytteVask.active = true;
                this.activeQuestion = 'kvmQuestion';
            }
        },
        setKvm: function() {
            this.activeQuestion = 'kvmQuestion';
        },
        setKgSalt: function() {
            this.activeQuestion = 'kgSaltQuestion';
        },
        setWinterHours: function() {
            this.activeQuestion = 'winterHoursQuestion';
        },
        setPeriodicService: function(e) {
            var periodicType = e.target.textContent;
            this.periodicService = periodicType;

            if(periodicType == 'Vindusvask') {
                this.vindusvask.active = true;
                this.activeQuestion = 'windowQuestion';
            } else if(periodicType == 'Byggvask') {
                this.byggvask.active = true;
                this.activeQuestion = 'byggQuestion';
            } else if(periodicType == 'Tepperens') {
                this.tepperens.active = true;
                this.activeQuestion = 'kvmQuestion';
            } else if(periodicType == 'Nedvask') {
                this.nedvask.active = true;
                this.activeQuestion = 'kvmQuestion';
            }
        },
        setExtraService: function(e) {
            var extraType = e.target.textContent;

            this.activeQuestion = 'winterQuestion';
        },
        finish: function() {
            this.activeQuestion = 'finish';
        },
        restart: function() {
            this.resetData();
            this.activeQuestion = 'servicesQuestion';
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
            this.numberOfKvm = 0;
            this.serviceType = '';
            this.periodicService = '';
            this.numberOfKgSalt = 0;
            this.numberOfWinterHours = 0;
        }
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