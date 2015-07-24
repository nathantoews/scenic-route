function googleExpandoToggle() {
  /*
	The React Carousel Component makes the bad assumption
	that it will be placed in the outer-most DOM level.
	
	when the dimensions are set, the parent components
	have not been rendered yet, forcing it to assign
	incorrect dimensions. 
  */
  window.dispatchEvent(new Event('resize'));	
  $(this).toggleClass('active');
  $(this).next().toggleClass('active');
  // ARIA
}

// Google Expando Event
// =====================================================

$('.google-expando__icon').on('click', function() {
  googleExpandoToggle.call(this);
});


var _parkHeight = $('.google-expando--wrap').height();


$('.openInfo').on('click', function() {
	$('.openInfo').toggleClass('active');
	$( ".expandedInfo" ).slideToggle( 400, function() {
		$(".expandedInfo").animate({
			height: ($(".HeaderRoute").offset().top - ($(".openInfo").offset().top + $(".openInfo").outerHeight(true))) + 'px'
		},200);
  	});
});