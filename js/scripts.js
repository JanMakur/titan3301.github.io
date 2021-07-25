(function($) {
	"use strict";


	$.fn.changeElementType = function(newType) {
		var attrs = {};
		if (!(this[0] && this[0].attributes))
			return;

		$.each(this[0].attributes, function(idx, attr) {
			attrs[attr.nodeName] = attr.nodeValue;
		});
		this.replaceWith(function() {
			return $("<" + newType + "/>", attrs).append($(this).contents());
		});
	}

	$(window).on("load", function() { // makes sure the whole site is loaded


		//script for mobile menu
		$('.mobile-wrapper').each(function() {
			var $this = $(this);
			$(this).find('.hamburger').on('click', function(event) {
				$this.find('.fat-nav').fadeToggle();
				$this.find('.fat-nav').toggleClass('active');
				$(this).toggleClass('active');
				$('body').toggleClass('nav-active');
				event.preventDefault();
			});
		}); 
		
		$('.fat-list').changeElementType('ul');
		$('.fat-nav a').on('click', function(event) {
			$('.fat-nav').removeClass('active');
			$('.fat-nav').fadeOut();
			$('.hamburger').removeClass('active');
			$('body').removeClass('nav-active');
		});
		$( '<a href="#" class="menu-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></a>' 
			).insertAfter( '.fat-nav .menu-item-has-children > a, .fat-nav .page_item_has_children > a' );
		$('.fat-nav .menu-item-has-children .menu-item-icon, .fat-nav .page_item_has_children .menu-item-icon').on('click', function(t) {
          t.stopPropagation(),
            t.preventDefault(),
            $(this).toggleClass('active');
          var n = $(this).next('ul'),
            o = $(this)
              .closest('ul')
              .children('li');
          o
            .find('.sub-menu')
            .not(n)
            .slideUp('fast'),
          o
            .find('.children')
            .not(n)
            .slideUp('fast'),
            o
              .find('.menu-item-icon')
              .not(this)
              .removeClass('active'),
            n.slideToggle('fast');
        })

		//sticky navigation
		$(".stuck-nav").sticky({
			topSpacing: 0,
		});

		//reduce next/prev link title
		$('.pagi-title').each(function(){
			$(this).text($(this).text().substring(0,38));
		 });


		if (Modernizr.touch) {
			//add class on touch device
			$('body').addClass('no-para');
		} 
	});

	// script popup image
	$('.popup-img').magnificPopup({
		type: 'image'
	});

	// script fixed-sidebar
	$('.fixed-sidebar').theiaStickySidebar({
	  // Settings
	  additionalMarginTop: 105
	});

	// script popup image
	$('.blog-popup-img').magnificPopup({
		type: 'image',
		gallery: {
			enabtrobica: true
		}
	});

	// Video responsive
	$("body").fitVids();

	//script for navigation(superfish)
	$('.menu-wrapper ul').superfish({
		delay: 400, //delay on mouseout
		animation: {
			opacity: 'show',
			height: 'show'
		}, // fade-in and slide-down animation
		animationOut: {
			opacity: 'hide',
			height: 'hide'
		},
		speed: 200, //  animation speed
		speedOut: 200,
		autoArrows: false // disable generation of arrow mark-up
	})

	$(window).on("load", function() { // makes sure the whole site is loaded
		// filter items when filter link is clicked
		var $container = $('.portfolio-body');
		$('.port-filter a').on('click', function() {
			var selector = $(this).attr('data-filter');
			$container.isotope({
				itemSelector: '.port-item',
				filter: selector
			});
			return false;
		});
	});

	//Header Search 
    $(document).on('click', '.close-black-block', function(event) {
        event.preventDefault();
        $('.search-icon-header').removeClass('open');
        $(".focus-input").focus();
    });

    $(document).on('click', '.search-icon-header > a.search', function(event) {
        event.preventDefault();
        $('.search-icon-header').addClass('open');
        $(".focus-input").focus();
    });


	//add image mask
	$('.bg-with-mask').each(function() {
		$(this).append('<div class="slider-mask"></div>');
	});

	//slider for blog slider
	$('.blog-slider').slick({
		autoplay: true,
		dots: false,
		nextArrow: '<i class="fa fa-arrow-right"></i>',
		prevArrow: '<i class="fa fa-arrow-left"></i>',
		speed: 800,
		fade: true,
		pauseOnHover: false,
		pauseOnFocus: false
	});

	//replace the data-background into background image
	$(".blog-img-bg").each(function() {
		var imG = $(this).data('background');
		$(this).css('background-image', "url('" + imG + "') "

		);
	});
	
	//change h5 class for custom footer
	$(".trobica-custom-footer div[class*='elementor-widget-wp-'] h5").each(function() {
		$(this).addClass("elementor-heading-title");
	});
	
	//sticky custom header
	$('.custom-sticky-menu .elementor-section:has(.white-header.no-bg)').first().addClass('stuck-nav');
	
	//adding/removing sticky menu class
	$('.stuck-nav').on('sticky-start', function() {
		$(this).addClass('trobica-sticky-menu');
		$(this).find('.trobica-nav,.mobile-wrapper').addClass('trobica-stick')
	});
	$('.stuck-nav').on('sticky-end', function() {
		$(this).removeClass('trobica-sticky-menu');
		$(this).find('.trobica-nav,.mobile-wrapper').removeClass('trobica-stick')
	});
	
	//add class for hovering team & hovering icon
	$('.elementor-widget-trobica-team-hover,.elementor-widget-trobica-texticon-hover').each(function() {
		$(this).closest('.elementor-column-wrap').addClass('hovering');
	});

	//Woocommerce

		$('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>'
        ).insertAfter('.quantity input');
		
        $('.quantity').each(function() {
        	var t, n, o, i;
          var e = $(this);
            t = e.find('input[type="number"]');
            n = e.find('.quantity-up');
            o = e.find('.quantity-down');
            i = t.attr('min');
          n.on('click', function() {
            var n = parseFloat(t.val());
              o = n + 1;
            e.find('input').val(o), e.find('input').trigger('change');
          });

          o.on('click', function() {
              var n = parseFloat(t.val());
              if (n <= i) var o = n;
              else var o = n - 1;
              e.find('input').val(o), e.find('input').trigger('change');
            });

          });

	//remove empty tags
	$('strong:empty').remove();
	$('p:empty').remove();
	$("form.track_order").unwrap();	

})(jQuery);

