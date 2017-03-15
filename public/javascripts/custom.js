(function(){



    /* move line when clicking button */
    $('.widget-button').click(function(e) {
        var newPos = e.target.offsetLeft +  e.target.offsetWidth/2;

        $('.widget-first-line').css({
            '-webkit-transform': 'translateX(' + newPos + 'px)',
            '-moz-transform': 'translateX(' + newPos + 'px)',
            '-ms-transform': 'translateX(' + newPos + 'px)',
            '-o-transform': 'translateX(' + newPos + 'px)',
            'transform': 'translateX(' + newPos + 'px)'
        });

        $('.widget-content-container').addClass('middle-out');
    });

    /* move line when clicking button 
    $('.widget-button').click(function(e) {
        var newPos = e.target.offsetLeft +  e.target.offsetWidth/2;

        $('.widget-first-line').css({
            '-webkit-transform': 'translateX(' + newPos + 'px)',
            '-moz-transform': 'translateX(' + newPos + 'px)',
            '-ms-transform': 'translateX(' + newPos + 'px)',
            '-o-transform': 'translateX(' + newPos + 'px)',
            'transform': 'translateX(' + newPos + 'px)'
        });

        $('.widget-middle-line').addClass('middle-out');
    });*/

})();