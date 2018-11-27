var inputElem = document.querySelector('.chatMessage');
var messages = document.querySelector('.messages').children[0];
var socket = io.connect('http://localhost:3000');

function createHTMLMessage(msg, source){

	// Create elements of message box
	var li = document.createElement("li");
	var p = document.createElement("p");
	var img = document.createElement("img");
	p.innerHTML += msg;

	// Determine the class attribute and image to append
	if(source == 'server'){
		li.className += "sent";
		img.src = "img/eggperson.jpeg";
	}
	else{
		li.className += "replies";
		img.src = "img/chat.jpg";
	}
	
	// Add img and message to li
	li.appendChild(img);
	li.appendChild(p);

	// Add to HTML
	messages.appendChild(li);
	
	// Write to database
	var firebaseRef = firebase.database().ref();
	firebaseRef.child("Messages").set(msg);
}

inputElem.addEventListener('keypress', function (e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		createHTMLMessage(inputElem.value, 'client');
		socket.emit('chat', inputElem.value);
		inputElem.value = "";
	}
});

socket.on('connect', function(data) {
	socket.emit('join', 'Hello server from client');
});

socket.on('chat msg', function(msg) {
	createHTMLMessage(msg, 'server');
});

