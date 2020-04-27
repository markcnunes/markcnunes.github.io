$(document).ready(function () {

    $('.menu__item-explore').on('click', function(){
        var layout = $(this).attr('data-layout');
        $('body').toggleClass('has-preview');
        $('[class*="grid--'+ layout +'"]').toggleClass('is-active');
    });
    $('.gridback').on('click', function(){
        $('body').toggleClass('has-preview');
        $('.grid.is-active').removeClass('is-active');
    });

    $(document).scroll(function() {
        var y = $(this).scrollTop();
        
        // Body
        if (y > 0) {
            $('body').addClass('has-scrolled');
        } else {
            $('body').removeClass('has-scrolled');
        }

        // Scroll Up
        if (y > 500) {
            $('.scrollup').fadeIn();
            $('.scrollup').addClass('is-active');
        } else {
            $('.scrollup').fadeOut();
            $('.scrollup').removeClass('is-active');
        }
    });
    
    $('.scrollup').click(function(){       
        $("html, body").animate({scrollTop: 0}, 1000);
    });
});