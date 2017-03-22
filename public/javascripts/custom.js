(function() {

    var animActive = false;

    $(window).scroll(runAnim);

    function runAnim() {
        var pos = $(window).scrollTop();

        if(pos > 2000 && !animActive) {
            $('.first-services-Button').get(0).click();
            animActive = true;          
        }
    }



})();