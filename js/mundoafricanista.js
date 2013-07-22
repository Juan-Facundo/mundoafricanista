(function($){
  $(document).ready(function(){
    metadata();

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
