$(document).ready(function(){

  $('.slideshow').each(function() {

  var index = 0,                          // current location in slideshow
      $slides = $('.slide'),              // array of slide elements
      slide = $slides[index],              // currently focused slide
      video = $(slide).find('video')[0],  // current video element
      videos = [],                        // array of video elements
      queued,                             // video to be played next
      is_touch = Modernizr.touch,
      slideshowID = $(this).attr('id'),
      flipsnap = new Flipsnap(this, {transitionDuration: 600});


  flipsnap.element.addEventListener('fspointmove', function(e) {
    $('.shifty').removeClass('show-menu');
    $slides.removeClass('active');
    index = e.newPoint; // customized flipsnap event to provide this
    slide = $slides[index];
    
    $(slide).addClass('active');
    
    $('body').removeClass().addClass( $($slides[index]).attr('id') ).addClass( $($slides[index]).attr('data-color') );
    // if( ($('.js-slide-previous').css('display') !== 'none') && ($('.js-slide-next').css('display') !== 'none') ){
    if ($('.js-slide-previous').is(':visible') || $('.js-slide-next').is(':visible')){
      if (!flipsnap.hasNext()) {
        $('.js-slide-next').addClass('hide');
      } else if (!$('.js-slide-next').is(':visible')){
        $('.js-slide-next').removeClass('hide');
      }
      if (!flipsnap.hasPrev()) {
        $('.js-slide-previous').addClass('hide');
        $('.js-coach-mark').removeClass('hide').addClass('table-cell');
      } else if (!$('.js-slide-previous').is(':visible')){
        $('.js-slide-previous').removeClass('hide');
        $('.js-coach-mark').removeClass('table-cell').addClass('hide');
      } else if ($('.js-coach-mark').is(':visible')){
        $('.js-coach-mark').removeClass('table-cell').addClass('hide');
      }
    }
  }, false);


  $('.js-slide-btn').click(function(e){
    e.preventDefault();
    index = $($(this).attr('href')).index('.slide');
    flipsnap.moveToPoint(index);
  });

  $('.js-slide-next').click(function(){
    closeModals();
    flipsnap.toNext();
  });

  $('.js-slide-previous').click(function(){
    closeModals();
    flipsnap.toPrev();
  });

  if (!flipsnap.hasPrev()) {
    $('.js-slide-previous').addClass('hide');
  }

  function toggleMenu(){
    closeModals();
    if ($('.shifty').hasClass('show-menu')) {
      $('.shifty').removeClass('show-menu');
    } else {
      $('.shifty').addClass('show-menu');
    }
  }

  $('.js-shifty-toggle').click(function(){
    toggleMenu();
  });

  function closeModals(){
    $('.js-modal').fadeOut();
    $('.js-modal').find('.fluid-width-video-wrapper').remove();
  }

  $('.js-show-modal').click(function(){
    var $modal = $(this).parents('.slide').find('.js-modal'),
        $iframe = $('<iframe>'),
        src = $modal.attr('data-src'),
        container = $modal.find('.js-embed-wrap')[0];
    $modal.show();
    $iframe.attr('src', src).attr('frameborder', 0);
    $(container).append($iframe);
    $(container).fitVids();
  });

  $('.js-hide-modal').click(function(){
    closeModals();
  });

  $(document).keydown(function(e){
    if (e.keyCode === 37) {
      closeModals();
      flipsnap.toPrev();
      return false;
    }
    if (e.keyCode === 39) {
      closeModals();
      flipsnap.toNext();
      return false;
    }
    if(e.keyCode === 38 || e.keyCode === 40){
      e.preventDefault();
      closeModals();
      toggleMenu();
    }
  });

  if($('#flipsnap-controls').length && slideshowID == "team-slideshow"){
    $('#flipsnap-controls li').click(function(){
      
      var myPosition = $(this).parent().children().index(this);

      $('#flipsnap-controls li').removeClass('currentToggle');
      $(this).addClass('currentToggle');

      flipsnap.moveToPoint(myPosition);

    })
  }

  //console.log(slideshowID);


  });

  

});
