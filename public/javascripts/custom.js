(function() {
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

/* autoscroll when click on anchor-tags */
$(document).on('click', '.scroll-on-click', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});

/* scrollreveal */
window.sr = ScrollReveal({ viewOffset: { top: 60 }, duration: 1500 });
sr.reveal('.reveal', { delay: 1000, duration: 2000});
sr.reveal('.icon-container', { viewFactor: 0.8 },100);
sr.reveal('.reveal-list', { viewFactor: 1 }, 100);
sr.reveal('.reveal-input', { viewFactor: 1 }, 100);
sr.reveal('.reveal-img', { 
    scale: 1, 
    distance: '100px', 
    duration: 2000,
    easing: 'ease',
    viewFactor: 0.5
 });



})();