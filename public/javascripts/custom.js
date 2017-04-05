(function() {

/* rellax instance */
var rellax = new Rellax('.rellax');


/* navbar-anim */
$(window).scroll(function() {
    var scrollPos = $(this).scrollTop();
    var heroHeight = $('.video-container').height();
    var navHeight = $('nav').height();
    var variable = heroHeight/100;
    var opacity = scrollPos/variable/100;
    var offset = 150;

    if(scrollPos > offset) {
        $('.video-overlay').addClass('less-opacity');

        $('.video-overlay-gradient').css({
            'background':'linear-gradient(rgba(255, 255, 255,' + opacity + ') 20%, rgba(255, 255, 255, ' + (opacity + 0.3) + ') 100%)',
            'visibility': 'visible'
        });
    } else {
        $('.video-overlay-gradient').css('visibility', 'hidden')
        $('.video-overlay').removeClass('less-opacity');
    }

    if(scrollPos >  heroHeight - navHeight) {
        $('nav').addClass('no-transparent');
    } else {
        $('nav').removeClass('no-transparent');
    }
})



})();