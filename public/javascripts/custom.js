(function() {

/* rellax instance */
var rellax = new Rellax('.rellax');

 /* run widget anim automatically */
    var animActive = false;

    $(window).scroll(runAnim);

    function runAnim() {
        var pos = $(window).scrollTop();
        if(pos > 1700 && !animActive) {
            $('.first-services-button').get(0).click();
            animActive = true;          
        }
    }

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
                'background':'linear-gradient(rgba(61, 72, 83,' + opacity + ') 20%, rgba(61, 72, 83, ' + (opacity + 0.3) + ') 100%)',
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