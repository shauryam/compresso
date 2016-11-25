
$(function(){
	var draggedWord;
   var str = "This is the text that has to be compressed. This is going to be compressed by the player";
   var arr = str.split(" ");
   $.each(arr, function( index, value ) {
  		console.log(value);
  		$( ".string" ).append( "<p class='draggable'>"+value+"</p>" );
	});

   $(".draggable").draggable();

   $(".draggable").draggable({ 
      revert: true,
      containment: "#play-area",
      opacity: 0.50,
      cursor: "crosshair",
      start: function( event, ui ) {
        console.log(ui.helper[0].innerText);
        draggedWord = ui.helper[0].innerText;
      }
  });

  $( "#droppable" ).droppable({
      drop: function( event, ui ) {   
        count = 0;
        $.each(arr, function( index, value ) {
        if(value == draggedWord){
          count++;
        }
    });  
    if(count<2){
      $(this).effect("shake");
    }
    else{
      $(this).animateCss('bounce');
      var text = $("#draggable p").innerText;
      console.log(text);
    }
      }
    });

});

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var seconds = 60000
var time = new Date().getTime() + seconds;
$('#clock').countdown(time, {elapse: true})
.on('update.countdown', function(event) {
  var $this = $(this);
  if (event.elapsed) {
  } else {
    $this.html(event.strftime(' %S '));
  }
});
