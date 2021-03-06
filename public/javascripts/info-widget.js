(function widget(){
    var activeButton = 0;

    $('.widget-button').click(function(e) {

        var buttonId = e.target.dataset.id;
        
        e.preventDefault();

        toggleActiveButton(this);

        toggleSection(e.target.hash);

        moveLine(e.target, buttonId);
    });

    function toggleSection(id) {
        var el = $('.active-section');

        if(el.length > 0) {
            el[0].classList.remove("active-section");
        }

        $(id).addClass('active-section');
    }

    function toggleActiveButton(self) {
        var el = $('.widget-button');


        el[activeButton].classList.remove("active");

        activeButton = $('.widget-button').index(self);
        $(self).addClass('active');
    }

    function moveLine(el, buttonId) {
        var newPos = el.offsetLeft +  el.offsetWidth/2;
        var currentLineClass = '.widget-first-line-' + buttonId;

        $(currentLineClass).css({
            '-webkit-transform': 'translateX(' + newPos + 'px)',
            '-moz-transform': 'translateX(' + newPos + 'px)',
            '-ms-transform': 'translateX(' + newPos + 'px)',
            '-o-transform': 'translateX(' + newPos + 'px)',
            'transform': 'translateX(' + newPos + 'px)'
        });
    }


    /* carousel */
    var current = 0;
    var slides = $('.carousel-slide');

    $('.next').click(function() {
        nextSlide();
    })

    $('.prev').click(function() {
        prevSlide();
    })

    function nextSlide(){
        $(slides[current]).removeClass('active');

        current++;
        current = current % slides.length;

        $(slides[current]).addClass('active');
    }

    function prevSlide(){
        $(slides[current]).removeClass('active');

        if(current === 0) {
            current = 4;
        }

        current--;
        $(slides[current]).addClass('active');
    }
})();