$(function(){

  var points = 00;
  var difficulty = getParameterByName('difficulty'); 
  var pointsIncrementor = setPointsIncrementor(difficulty); //Implemented by factory design pattern
	var draggedWord;

  //This will pick the strings randomly from the array 'compressionStr' present in compressionStrings.js file
   var str = compressionStr[Math.floor(Math.random()*compressionStr.length)];
   var strWithoutSymbols = removeSymbols(str); //will remove symbols 

   //Code to split the string to individual words and put them on screen for dragging
   var arr = str.split(" ");
   putString(arr); //Implemented using iterator pattern

   //This array has been created to compare draggedWords with words without symbols like period, comma or exclamation.
   var arrWithoutSymbols = strWithoutSymbols.split(" ");

   //following loop adds the feature of dragging all the words and also gives each word a unique ID
   for(var i=0; i<counter; i++){
      var id = "#draggable" + i;
      $(id).draggable();
      $(id).draggable({ 
          revert: true,
          containment: "#play-area",
          cursor: "crosshair",
          start: function( event, ui ) {
            console.log(ui.helper[0].innerText);
            draggedWord = ui.helper[0].innerText;
            //to remove symbols like period, comma or exclamation from dragged word
            draggedWord = removeSymbols(draggedWord);
          }
      });
    }
   
  //Dragging code ends above

  
  //droppable is the compression box and the following code has the logic to check if dragged word is compressable
  $( "#droppable" ).droppable({
      drop: function( event, ui ) {   
         // this array is used to track the indexes of the words that will match the dragged word
        var matchingIndexes = checkDuplicates(arrWithoutSymbols, draggedWord);//Implemented using decorator pattern
        
        if(matchingIndexes.length<2){ // 2 or more including the word dragged
          $(this).effect("shake");
        }
        else{
          $(this).animateCss('bounce');          
          disableDuplicates(matchingIndexes); //Implemented using Iterator Pattern          
          var score = $("#score").html();
          $("#score").html(parseInt(score) + pointsIncrementor);
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






