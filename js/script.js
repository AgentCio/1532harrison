$(document).ready(function(){
	var headerHeight 	= $('#site-header').height();
	var twitterURL		= 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=1532harrison&count=100';

	var scrollorama = $.scrollorama({
        blocks:'.scrollblock'
    });

	if($('.scrollblock').length){
		scrollorama.animate('.transparent-background',{ duration: 160, property:'opacity', start:1,end:0});
		scrollorama.animate('#mission-statement',{ duration: 160, property:'opacity', start:1,end:0});
	}

	function sizeFullScreenImages(){
		var winHeight 		= $(window).height(),
			fullWidthHeight = (winHeight - 60),
			missionPosition	= (fullWidthHeight - $('#mission-statement').height() + headerHeight) * .5;
		if($(window).height() < 700 && $(window).width() < 990){
			missionPosition = 65;
		}	
		$('#introduction .full-width-image').css('height', fullWidthHeight);
		$('#mission-statement').css('top', missionPosition);
	}

	sizeFullScreenImages();

	$(window).resize(function() {
		sizeFullScreenImages();
	});
	
	$('a.scrollTo').click(function(event) {
		//Add class = "collapsed" to #nav-toggle
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		$url = $(this).attr('href');
		$('html:not(:animated), body:not(:animated)').animate({
			scrollTop: $($url).offset().top - headerHeight
		}, 600, 'swing', function() {
			if (this.nodeName === "BODY") {
				return;
			}
		});
	});

	// Fetch Tweets and Add to Page
	function ajaxLoadContent() {

		$.ajax({
			type: "GET",
			url: "tweets.html",
			dataType: "html",
			success: function(out){
				var result = $(out);
				//var pageContent = $(out).find("#content");
				$('#tweets').append(result.fadeIn(300, function() {
				}));
			}
		});
	}

	ajaxLoadContent();

});