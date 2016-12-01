function finish() {
	for(var i = 0;  i<numberOfWords; i++){
    var elementSelector = "#draggable" + i;
    $(elementSelector).draggable("disable");
  }
}