(function($) {
    "use strict";

       function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationDuration = $this.data('duration');
                var $animationType = 'p-tick ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay,
                    '-webkit-animation-duration': $animationDuration,
                    'animation-duration': $animationDuration,
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    if (!Modernizr.touch) {
		//only do slider animation for desktop only not touch device
        $('.ani-slider').on('init', function(e, slick) {
            var $firstAnimatingElements = $('div.slide').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });

        $('.ani-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('div.slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });


        
    }
	

})(jQuery);