function finish() {
	for(var i = 0;  i<numberOfWords; i++){
	    var elementSelector = "#draggable" + i;
	    $(elementSelector).draggable("disable");
  	}
    $('#resultModal').modal('show');
    finished = true;
    calculateCompressedStringLength();

        //Send result to server
        //var id1=Math.floor((Math.random() * 10) + 1);
        // store the final score and unique id that needs to be sent to server
        var send = { "id": my_id, "score": final_score };
        // send final score and unique id that needs to be sent to server
        socket.emit('myscore', send);
        console.log("client-ID: " + send.id + "Sending score to server: " + send.score);
}