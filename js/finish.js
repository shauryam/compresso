function finish() {
	for(var i = 0;  i<numberOfWords; i++){
    console.log("Heyy");
    var elementSelector = "#draggable" + i;
    $(elementSelector).draggable("disable");
  }
}