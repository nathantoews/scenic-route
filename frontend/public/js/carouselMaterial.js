function googleExpandoToggle() {
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
			height:(_parkHeight/1.3)
		},200);
  	});
});