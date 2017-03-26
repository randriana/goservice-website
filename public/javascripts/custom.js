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



})();