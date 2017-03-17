(function widget(){


    var activeButton = 0;

    $('.widget-button').click(function(e) {

        $('.widget-button')[activeButton].classList.remove("active");

        activeButton = $('.widget-button').index(this);

        $(this).addClass('active');

        e.preventDefault();

        var self = this;

        setTimeout(function(){
            window.location.href = self.href;
        }, 1000);

        var newPos = e.target.offsetLeft +  e.target.offsetWidth/2;

        $('.widget-first-line').addClass('short').on('webkitTransitionEnd oTransitionEnd otransitionend transitionend', function(){

            $('.widget-first-line').css({
                '-webkit-transform': 'translateX(' + newPos + 'px)',
                '-moz-transform': 'translateX(' + newPos + 'px)',
                '-ms-transform': 'translateX(' + newPos + 'px)',
                '-o-transform': 'translateX(' + newPos + 'px)',
                'transform': 'translateX(' + newPos + 'px)'
            });

            $('.widget-first-line').removeClass('short');
        })

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
    });


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