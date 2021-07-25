(function($) {
	"use strict";
	$(window).on("load", function() { // makes sure the whole site is loaded
		//preloader
		$(".pre-loading").fadeOut(); // will first fade out the loading animation
		$(".pre-loading").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website. 
	});
})(jQuery);