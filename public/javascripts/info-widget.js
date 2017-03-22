(function widget(){
    var activeButton = 0;

    $('.widget-button').click(function(e) {

        var buttonId = e.target.dataset.id;
        var currentLineClass = '.widget-first-line-' + buttonId;

        e.preventDefault();

        toggleActiveButton();

        toggleSection(e.target.hash);

        moveLine();

        runAnimation();
    });

    function toggleSection(id) {
        var el = $('.active-section');

        setTimeout(function() {
            if(el.length > 0) {
                el[0].classList.remove("active-section");
            }
            $(id).addClass('active-section');
        }, 1000);
    }

    function toggleActiveButton() {
        $('.widget-button')[activeButton].classList.remove("active");

        activeButton = $('.widget-button').index(this);

        $(this).addClass('active');
    }

    function moveLine() {
        var newPos = e.target.offsetLeft +  e.target.offsetWidth/2;

        $(currentLineClass).addClass('short').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend', function(){
            $(currentLineClass).css({
                '-webkit-transform': 'translateX(' + newPos + 'px)',
                '-moz-transform': 'translateX(' + newPos + 'px)',
                '-ms-transform': 'translateX(' + newPos + 'px)',
                '-o-transform': 'translateX(' + newPos + 'px)',
                'transform': 'translateX(' + newPos + 'px)'
            });
            $(currentLineClass).removeClass('short');
        })
    }

    function runAnimation() {
        if($('.widget-container').hasClass("active") === false){
            /* add middle-out-anim for in the beginning */
            $('.widget-content-container').addClass('middle-out middle-out-anim').on('animationend animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(){
                $('.widget-content-container').removeClass('middle-out-anim')
            });

            $('.widget-container').addClass('active');
        } else {
            $('.widget-content-container').addClass('short-anim')
            .on('animationend animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(){
                $('.widget-content-container').removeClass('short-anim')
            })
        }
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