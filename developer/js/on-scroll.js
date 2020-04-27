$(window).scroll(function() {
	$('.toAnim').each(function(){

		var pos = $(this).offset().top,
		    scroll = $(window).scrollTop(),
		    height = $(window).height();

		(scroll > pos - height * .9 ) ? $(this).addClass('anim') : $(this).removeClass('anim');
		
	});
});