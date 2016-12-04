var express = require('express');
var app = express();
var serv = require('http').Server(app);
var verbose = false;
var winnerFound = false;

var compressionStr = [
	"This is the text that has to be compressed. This is going to be compressed by the player",
	"Java is an object oriented language. The languages which are object oriented like java has OOPS concepts like abstraction, inheritace etc. The inheritace feature gives the advantage of code reuse",
	"Change the world to technology, technology effects every field , it is not just about computers anymore, and ot is not just about tablets or smart phones, technology is about medicine, energy, transportation",
	"Computing and technology has transformed society from the laptop we use to work and play, to medicine, to home as IoT, to GPS to self driving cars. Computing effects every one and every field, we need every one fluent in computing and technolgy ",
	"I am thinking about something much more important than bombs, I am thinking about computer",
	"To access an object we use reference variable, reference variable can be of only one type, reference variable cannot be changed, reference variable can be reassigned to other objects, reference variable can be declared as a class or interface type",
	"Agile software development refers to a group of software development methods which are based on iterative development. Agile methods or agile processes generally promote a disciplined project management process",
	"betty botteutr bought a bit of butter but she said butter is bitter if I put in my batter it will make my batter bitter but a bit of better butter will make my batter better so she bought a bit of butter better than her bitter butter made her bitter batter better so it was better betty botter bought a bit of better butter",
	"peter piper picked a peck of pickled peppers, a peck of pickled peppers peter pipper picked, if peter piper picked a peck of pickled peppers, where are the pickled peppers peter piper picked",
	"I wish to wish the wish you wish to wish, but if u wish to wish the witch wishes I wont wish the wish you wish to wish",
	"this is this  cat this is is cat this is how cat this is to cat this is keep cat this is an cat this is idiot cat this is busy cat this is for cat this is forty cat this is seconds cat",
	"esau wood saw wood. esau wood would saw wood. oh, the wood that wood would saw ! one day esau wood saw a saw saw wood as no other wood saw wood ever saw wouls saw wood, wood ever saw saw wood, wood never saw a wood saw that would saw wood like the wood saw wood saw would saw wood now esau wood saws with that saw he saw saw wood ",
	"a problem of solving a problem, but when a problem solves a problem without any problem then the problem is not at all a problem",
	"luke luck likes lakes luckes duck likes lakes luke luck licks lakes lukes duck licks lakes duck takes licks in lakes luke luck takes licks in lakes duck likes",
	"How many cookies could a good cook cook if a good cook could cook cookies? a good cook could cook as much cookies as a good cook who could cook cookies",
	"As I was in Arkansas I saw a saw that could out saw any saw I ever saw saw. If you happen to be Arkansas and see a saw that can out saw the saw I saw saw Id like to see the saw you saw saw",
	"the big black bug bit the big black bear, but the big black bear bit the big black bug",
	"a fly and flea flew into flue, said the fly to the flea  what shall we do?  let us fly said the flea said the fly shall we flee so they flew through a flaw in the flue"
];

var str = compressionStr[Math.floor(Math.random() * compressionStr.length)];
var myMap = {};
var counter = 0;
var SOCKET_LIST = {};
var playersList = {};
var io = require('socket.io')(serv, {});
var noOfPlayers;
var temp_obj = {};
//var UUID = require('node-uuid');
//var UUID = require('uuid-js');

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
//app.use('/',express.static(__dirname + '/*'));
app.get('/*', function (req, res, next) {

	//This is the current file they have requested
	var file = req.params[0];

	//For debugging, we can track what files are requested.
	if (verbose) console.log('\t :: Express :: file requested : ' + file);

	//Send the requesting client the file.
	res.sendFile(__dirname + '/' + file);

});

serv.listen(8000);
console.log("Server started.");

io.sockets.on('connection', function (socket) {
	//socket.id = Math.floor((Math.random() * 10) + 1);
	//playersList.push({id:socket.id,user_name:user_name});
	//SOCKET_LIST[socket.id] = socket;
	user_name = Math.random().toString(36).substr(2, 9);
	playersList[user_name] = socket.id;
	noOfPlayers = Object.keys(playersList).length;
	console.log("len", noOfPlayers);
	//console.log("len",socket[sID]);
	for (var i in playersList) {
		console.log("userd id ", playersList[i]);

	}
	console.log("Sending socket ID to client: ", socket.id);
	socket.emit('sendid', user_name);
	//for (var i in SOCKET_LIST) {

	//	var socket = SOCKET_LIST[i];
	socket.emit('newString', str);


	//}

	// receive final score and unique id from each server(send)
	socket.on('myscore', function (data) {
		//console.log("dummy");
		counter += 1;
		if (counter <= noOfPlayers - 1) {
			socket.emit('check results', "Waiting for other players to complete");
		}
		console.log("client-ID: " + data.id + "score: " + data.score);
		myMap[data.id] = data.score;
		for (var key in myMap) {
			if (myMap.hasOwnProperty(key)) {
				console.log(key + " -> " + myMap[key]);
			}
		}
		keysSorted = Object.keys(myMap).sort(function (a, b) { return myMap[b] - myMap[a] });
		//console.log("aklsbcaklsj",keysSorted);
		len2 = keysSorted.length;
		console.log("zero", keysSorted[0]);
		console.log(counter + " length " + noOfPlayers );
		// var items = Object.keys(myMap).map(function (key) {
		// 	return [key, myMap[key]];
		// });
		// console.log(items);
		// var sorted = items.slice(0).sort(function (a, b) {
		// 	return a.value - b.value;
		// });

		// var keys = [];
		// for (var i = 0, len = sorted.length; i < len; ++i) {
		// 	keys[i] = sorted[i].key;
		// }
		// //console.log(keys);
		// // Sort the array based on the second element
		// // items.sort(function (first, second) {
		// 	return second[1] - first[1];
		// });

		// Create a new array with only the first 5 items
		//console.log(items.slice(0, 5));
		//[ [ 'd', 17 ], [ 'c', 11 ], [ 'z', 9 ], [ 'b', 7 ], [ 'y', 6 ] ]
		if (counter == noOfPlayers) {
			//console.log("ahbdfks", playersList[keysSorted[0]]);
			if (myMap[keysSorted[0]] != myMap[keysSorted[1]]) {
				io.sockets.connected[playersList[keysSorted[0]]].emit('send msg', "Congratulations! You have won.");
				for (var i = 1; i < len2; i++) {
					io.sockets.connected[playersList[keysSorted[i]]].emit('send msg', "Oops! You couldn't make it.");
				}
			}
		}
		//obj1 = {str1:40, str2:0, str3:10, str4:20 };
		// sortObj = function (obj) {
		// 	var temp_array = [];
		// 	for (var key in obj) {
		// 		if (obj.hasOwnProperty(key)) {
		// 			temp_array.push(key);
		// 		}
		// 	}
		// 	temp_array.sort(function (a, b) {
		// 		var x = obj[a];
		// 		var y = obj[b];
		// 		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		// 	});

		// 	for (var i = temp_array.length - 1; i >= 0; i--) {
		// 		temp_obj[temp_array[i]] = obj[temp_array[i]];
		// 		console.log(typeof temp_obj[i]);
		// 	}
		// 	console.log(temp_obj);
		// };
		// sortObj(myMap);
		// len2 = temp_obj.length;
		// if (counter == noOfPlayers) {
		// 	var keys = Object.keys(temp_obj);
		// 	//var dupe = false;
		// 	var count = 0;

		// 	for (var i = 0, j = 1; j < keys.length; j++) {
		// 		if (parseInt(temp_obj[keys[i]]) === parseInt(temp_obj[keys[j]])) {
		// 			count += 1
		// 			console.log("number",parseInt(temp_obj[keys[j]]));
		// 			//dupe = true;
		// 		}
		// 	}
		// }
		
		// if (count > 0) {
		// 	for (var i = 0; i < count; i++)
		// 		io.sockets.connected[playersList[temp_obj[i]]].emit('send msg', "It's a draw");
		// 	for (var i = count; i < len2; i++)
		// 		io.sockets.connected[playersList[temp_obj[0]]].emit('send msg', "Oops! You couldn't make it.");
		// }
		// else {
		// 	io.sockets.connected[playersList[temp_obj[0]]].emit('send msg', "Congratulations! You have won.");
		// 	for (var i = 1; i < len2; i++) {
		// 		io.sockets.connected[playersList[temp_obj[i]]].emit('send msg', "Oops! You couldn't make it.");
		// 	}
		// }
		// 		for (var i = 1; i < len2; i++) {
		// 			io.sockets.connected[playersList[keysSorted[i]]].emit('send msg', "Oops! You couldn't make it.");
		// 		}
		//socket.broadcast.to(playersList[keysSorted[0]]).emit('send msg',"Winner");
		// if (!winnerFound) {
		// 	//This guy is the winner
		// 	socket.emit('result', "Winner");
		// 	winnerFound = true;
		// } else {
		// 	//Loser
		// 	socket.emit('result', "Loser");
		// }
	});

	socket.on('disconnect', function () {
		delete SOCKET_LIST[socket.id];
	});

});

// setInterval(function () {
// 	var pack = [];
// 	for (var i in SOCKET_LIST) {
// 		var socket = SOCKET_LIST[i];
// 		socket.x++;
// 		socket.y++;
// 		pack.push({
// 			x: socket.x,
// 			y: socket.y,
// 			number: socket.number
// 		});
// 	}
// 	for (var i in SOCKET_LIST) {
// 		var socket = SOCKET_LIST[i];
// 		socket.emit('newPositions', pack);
// 		//socket.emit('newString', str);
// 	}
// }, 1000 / 25);
