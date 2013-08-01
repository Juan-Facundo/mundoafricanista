(function($){
  $(document).ready(function(){

    metadata();
    var tid = '';
    var source = '';
    var player = document.getElementById("reproductor");
    var audioSupport = document.createElement('audio').canPlayType;
    var tid = setInterval(metadata, 25000);

    if (player.addEventListener) {
    player.addEventListener('play', justplay, false);
    }

    if (player.addEventListener) {
    player.addEventListener('canplaythrough', playing, false);
    }

    if (player.addEventListener) {
    player.addEventListener('waiting', loading, false);
    }

    var start_player = function() {
    instance3.playSound();
    tid = setInterval(metadata, 25000);
    }
    var stop_player = function() {
    instance3.stopSound();
    clearInterval(tid);
    }

    var detach = $('#new_window a.new');
    detach.on('click', function(ev){
      ev.preventDefault();
      detach.remove();
      stop_player();
      window.open('http://radio.mundoafricanista.com.ar', 'Radio','width=500, height=300' );
    });

    var play = $('li.rp-play a');
    play.on('click', function(ev){
      ev.preventDefault();
      start_player();
    });

    var stop = $('li.rp-stop a');
    stop.on('click', function(ev){
      ev.preventDefault();
      stop_player();
    });

    function metadata(){
      $.ajax({
        type: 'GET',
        url: 'titulo.html',
        cache:false
      }).done(renderResponse);
    }

    function renderResponse(html){
      $('.metadata').remove();
      $('.jp-gui.jp-interface').before(html);
    }

    function justplay() {
      start_player = function() {
        if (source) { 
          player.src = source;
        }
        player.play();
        tid = setInterval(metadata, 25000);
      }
      stop_player = function() {
        source = player.currentSrc;
        player.src='';
        clearInterval(tid);
      }
    }

    function playing() {  
      $('p.buff').remove();
      $('.metadata').append('<p class="buff" style="text-align: right; color: #0f0; font-weight: bold; line-height: 9px; font-size: 9px; position: absolute; bottom: 0px; right: 5px;">play</p>');
      source = player.currentSrc;
    }

    function loading() {  
      $('p.buff').remove();
      $('.metadata').append('<p class="buff" style="text-align: right; color: #f00; text-decoration: blink; font-weight: bold; line-height: 9px; font-size: 9px; position: absolute; bottom: 0px; right: 5px;">buffering</p>');
    }  

  });
})(jQuery);
