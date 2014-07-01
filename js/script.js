$(document).ready(function(){
	var headerHeight 	= $('#site-header').height();
	// var twitterURL		= 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=1532harrison&count=100';

//	var scrollorama = $.scrollorama({
//		blocks:'.scrollblock'
//	});

//	if($('.scrollblock').length){
//		if (Modernizr.touch && Modernizr.mq('only screen and (max-width: 640px)')){
//			alert("This is a touch device...");
//		}else{
//			scrollorama.animate('.transparent-background',{ duration: 160, property:'opacity', start:1,end:0});
//			scrollorama.animate('#mission-statement',{ duration: 160, property:'opacity', start:1,end:0});
//			alert("This is NOT a touch device...");
//		}
//	}

	function sizeFullScreenImages(){
		var winHeight 		= $(window).height(),
			fullWidthHeight = (winHeight - 60),
			missionPosition	= (fullWidthHeight - $('#mission-statement').height() + headerHeight) * .5;
		if($(window).height() < 700 && $(window).width() < 990){
			missionPosition = 65;
		}
		if( $(window).width() > 1240){
			missionPosition = 155;
		}else{
			missionPosition = 65;
		}
		//console.info("missionPosition: " + missionPosition);
		$('#introduction .full-width-image').css('height', fullWidthHeight);
		//$('#mission-statement').css('top', missionPosition);
	}
	
	function moreInfo() {
		if($(window).width() < 990){
			console.info("width is < 990. ["+$(window).width()+ "]");
			$("#process-chevron, #rental-alternative-chevron").hide();
			$("#rental-alternative-details, #more-process").show();	
		}else{
			console.info("width is > 990.");
			$("#process-chevron, #rental-alternative-chevron").show();
			$("#rental-alternative-details, #more-process").hide();	

		}
	}
	

	sizeFullScreenImages();
	// moreInfo();

	$(window).resize(function() {
		sizeFullScreenImages();
		// moreInfo();
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

var chevronopen = {"-webkit-transition":"all 0.5s ease","transition":"all 0.5s ease","transform":"rotate(90deg)","-webkit-transform":"rotate(90deg)"};
var chevronclose= {"-webkit-transition":"all 0.5s ease","transition":"all 0.5s ease","transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)"};

	$("#rental-alternative-details").on("show.bs.collapse", function () {
		$("#rental-alternative-chevron").css(chevronopen);
	});
	$('#rental-alternative-details').on('hide.bs.collapse', function () {
		$("#rental-alternative-chevron").css(chevronclose);
	});


	$("#more-process").on("show.bs.collapse", function () {
		$("#process-chevron").css(chevronopen);
	});
	$('#more-process').on('hide.bs.collapse', function () {
		$("#process-chevron").css(chevronclose);
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

	// ajaxLoadContent();

});
