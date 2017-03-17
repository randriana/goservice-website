new Vue({
    el: '#calculator-section',
    data: {
        totalPrice: 0,
        numberOfKvm: 0,
        serviceType: '',
        periodicService: '',
        activeQuestion: 'servicesQuestion',
        windowSide: {
            inside: false,
            outside: false
        },
        gulvbehandling: {
            boning: false,
            skuring: false
        },
        byggEkstra: {
            silicon: false,
            paint: false
        },
        winter: {
            broyting: false,
            salting: false
        }
    },
    methods: {
        setServiceType: function(e) {
            var serviceType = e.target.textContent;
            this.serviceType = serviceType;

            if(serviceType == "Periodisk vask") {
                this.activeQuestion = 'periodicQuestion';
            } else if(serviceType == "Gulvbehandling"){
                this.activeQuestion = 'floorQuestion';
            } else {
                this.activeQuestion = 'kvmQuestion';
            }
        },
        setKvm: function() {
            this.activeQuestion = 'kvmQuestion';
        },
        setPeriodicService: function(e) {
            var periodicType = e.target.textContent;
            this.periodicService = periodicType;

            if(periodicType == 'Vindusvask') {
                this.activeQuestion = 'windowQuestion';
            } else if(periodicType == 'Byggvask') {
                this.activeQuestion = 'byggQuestion';
            } else {
                this.activeQuestion = 'kvmQuestion';
            }
        },
        setExtraService: function(e) {
            var extraType = e.target.textContent;

            this.activeQuestion = 'winterQuestion';
        },
        finish: function() {
            this.activeQuestion = 'finish';
        }
    }
});