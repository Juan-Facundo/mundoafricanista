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
      window.open('http://mundoafricanista.com.ar', 'Radio','width=400, height=250' );
    });

    var quienes = $('a.quienes');
    quienes.on('click', function(ev){
      ev.preventDefault();
      window.resizeTo(400,420);
      window.moveTo(screen.width/2-200,screen.height/2-210);
      $('#botones a.quienes').css('display','none');
      $('#botones a.cerrar').css('display','block');
      $.ajax({
        type: 'GET',
        url: 'quienes.html',
      }).done(insDesplegable);
    });

    var cerrar = $('#botones a.cerrar');
    cerrar.on('click', function(ev){
      ev.preventDefault();
      window.resizeTo(400,250);
      window.moveTo(screen.width/2-200,screen.height/2-125);
      detach.remove();
      $('#botones a.quienes').css('display','block');
      $('#botones a.cerrar').css('display','none');
      $('#desplegable').css('display','none');
      $('#desplegable').empty();
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

    function insDesplegable(content){
      $('#desplegable').css('display','block');
      $('#desplegable').append(content);
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
