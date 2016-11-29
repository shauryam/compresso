$(function(){

  var points = 00;
  var difficulty = getParameterByName('difficulty');
  var pointsIncrementor = setPointsIncrementor(difficulty);
  console.log(pointsIncrementor);
	var draggedWord;

  //This will pick the strings randomly from the array 'compressionStr' present in compressionStrings.js file
   var str = compressionStr[Math.floor(Math.random()*compressionStr.length)];
   var strWithoutSymbols = removeSymbols(str);
   //Code to split the string to individual words and put them on screen for dragging
   var arr = str.split(" ");
   $.each(arr, function( index, value ) {
  		$( ".string" ).append( "<p class='draggable'>"+value+"</p>" );
	 });

   //This array has been created to compare draggedWords with words without symbols like period, comma or exclamation.
   var arrWithoutSymbols = strWithoutSymbols.split(" ");

   $(".draggable").draggable();

   $(".draggable").draggable({ 
      revert: true,
      containment: "#play-area",
      opacity: 0.50,
      cursor: "crosshair",
      start: function( event, ui ) {
        console.log(ui.helper[0].innerText);
        draggedWord = ui.helper[0].innerText;
        //to remove symbols like period, comma or exclamation from dragged word
        draggedWord = removeSymbols(draggedWord);
      }
  });
  //Dragging code ends above

  
  $( "#droppable" ).droppable({
      drop: function( event, ui ) {   
        count = 0;        
        $.each(arrWithoutSymbols, function( index, value ) {
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
    }
      }
    });

});


//this code animates the box
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
//box animation code ends here

//code for timer starts here which uses the function 'getParameterByName()' to fetch duration from query string
var seconds = getParameterByName('duration')*1000;
var time = new Date().getTime() + seconds;
$('#clock').countdown(time, {elapse: true})
.on('update.countdown', function(event) {
  var $this = $(this);
  if (event.elapsed) {
  } else {
    $this.html(event.strftime(' %S '));
  }
});
//timer code ends here






