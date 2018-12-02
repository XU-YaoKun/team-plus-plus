var inputElem = document.querySelector('.chatMessage');
var messages = document.querySelector('.messages');
var socket = io.connect('http://localhost:3000');

function createHTMLMessage(msg, source){
	var li = document.createElement("li");
	var div = document.createElement("div");
	div.innerHTML += msg;
	div.className += "messageInstance " + source;
	li.appendChild(div);
	messages.appendChild(li);
	
	
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