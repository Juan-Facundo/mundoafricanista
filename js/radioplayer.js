(function($){
  $(document).ready(function(){
    metadata();
    var source1 = 'http://giss.tv:8000/chaotic.mp3';
    var source2 = 'http://mundoafricanista.com.ar:8000/radio1.ogg';
    var player = document.getElementById("reproductor");
    var audioSupport = document.createElement('audio').canPlayType;

    //verificar soporte para audio/html5
    if(audioSupport) {
      //verificar si puede reproducir mp3
      if(player.canPlayType('audio/mpeg')) {
        //console.log("html5 mpeg audio supported!");
        var source = source1;
      //verficar si puede reproducir ogg
      } else if(player.canPlayType('audio/ogg')) {
        console.log("html5 ogg audio supported!");
        var source = source2;
      }
      //insertamos fuente y reproducimos
      var start_player = function() {
        player.src=source;
        player.play();
      //console.log("fuente: ", source);
      }
      var stop_player = function() {
        player.src='';
      }
      }
    else {
      //lanzamos reproductor flash
      //alert("html5 audio not supported!");
      var start_player = function() {
      instance3.playSound();
      }
      var stop_player = function() {
      instance3.stopSound();
      }
    }

    start_player();
    // intervalo de refresco de metadatos
    var tid = setInterval(metadata, 25000);

    var detach = $('#new_window a.new');
    detach.on('click', function(ev){
      clearInterval(tid); //borramos bucle metadatos
      detach.remove();  //borramos enlace "separar"
      // en la linea siguiente, paramos la descarga de streaming
      $("#jquery_jplayer_1").jPlayer( "clearMedia" );
      ev.preventDefault();
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

    var listen = $('a.escuchar');
    listen.on('click', function(ev){
      ev.preventDefault();
      start_player();
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

  });
})(jQuery);
