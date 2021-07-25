
/*-----------------------------------------------------------------------------------

    Theme Name: Daniels
    Theme URI: http://
    Description: Portfolio Onepage Template
    Author: creativotheme
    Author URI: http://themeforest.net/user/creativotheme
    Version: 1.0

-----------------------------------------------------------------------------------*/


/* ----------------------------------------------------------------

TABLE OF CONTENTS

        + scrollIt
        + close navbar-collapse when clicked
        + navbar scrolling background
        + progress bar
        + magnificPopup
        + Owl Carsouel
            - clients carsouel
            - blog carsouel
        + stellar
        + countUp
        + Preloader
        + isotope portfolio
        + contact form validator
        
---------------------------------------------------------------- */

$(function() {

	"use strict";

    var wind = $(window);


    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',         // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -60            // offste (in px) for fixed top navigation
    });


    // close navbar-collapse when a  clicked
    $(".nav a").on('click', function () {
        $(".navbar-collapse").removeClass("in").addClass("collapse");
    });


    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar-default"),
            h_hight = $(".header").outerHeight();

        if(bodyScroll > h_hight){

            navbar.addClass("nav-scroll");

        }else{

            navbar.removeClass("nav-scroll");
        }
    });


    // progress bar
    wind.on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });


    // magnificPopup
    $('.portfolio .link').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
            enabled: true
        }
    });


    //// === owl carsouel === /////

    // clients carsouel
    $('.clients .owl-carousel').owlCarousel({
        items: 1,
        loop:true,
        autoplay:true,
        smartSpeed:500
    });


    // Blog carsouel
    $('.blog .owl-carousel').owlCarousel({
        margin: 30,
        loop:true,
        autoplay:true,
        smartSpeed:500,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            767:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });


	// stellar
    wind.stellar();


    // countUp
    $('.numbers .counter').countUp({
        delay: 10,
        time: 1500
    });
    

});

$(window).on("load",function (){

    // Preloader
    $(".loading").addClass("loading-end").fadeOut(1000);


    // isotope
    $('.services .row').isotope({
      // options
      itemSelector: '.col-md-4'
    });


    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });



    // contact form
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});

