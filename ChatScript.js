var inputElem = document.querySelector('.chatMessage');
var contacts = document.querySelector('#contacts').children[0];
var messages = document.querySelector('.messages').children[0];
var socket = io.connect('http://localhost:3000');

var rootRef = firebase.database().ref();

var userId;
var teamId;

firebase.auth().onAuthStateChanged(function(user){
	// User is signed in: set userId and teamId
	if (user){
		userId = user.uid;
		loadTeamId();

		// Check values
		console.log("userId has been set: "+ userId);
		console.log("teamId has been set: " + teamId);
	} 
	// No user is signed in.
	else{
	}
});

// Returns teamId of a user
function getTeamId(userId){

	var tempRef = firebase.database().ref('/Users/'+userId+'/currTeam');		// FIXME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	return tempRef.once("value");
};
function loadTeamId(){
	getTeamId(userId).then(setTeamId, showError);
}
function setTeamId(snapshot){
	teamId = snapshot.val();
}
function showError(error){
	console.log("The read failed: "+error);
}


// Wait for log in to work so we don't get a null uid
setTimeout(function() {
    console.log( "Ready to fill contacts!" );

    console.log("userID: "+userId);
	console.log("teamId: "+teamId);

	/** Announcements **/
	var announcementsRef = firebase.database().ref('/Team/Team1/Chatroom/Announcements'); 			//FIXME!!!!!!!!!!!!!!!!!!
    announcementsRef.on("child_added", snapshot => {

    	// Fetch latest message on announcements
    	var latestMsg = snapshot.val()[0];		// FIXME: Make function to get latest msg !!!!!!!!!!!!!!

    	// Create elements of contact
		var li = document.createElement("li");
		var div1 = document.createElement("div");
		var img = document.createElement("img");
		var div2 = document.createElement("div");
		var p1 = document.createElement("p");
		var p2 = document.createElement("p");

		// Edit attributes
		li.className += "contact";
		div1.className += "wrap";
		img.src += "img/eggperson.jpeg";
		div2.className += "meta";
		p1.className += "name";

		// FIXME: Add online status !!!

		// Add text
		p1.innerHTML += "Announcements";
		p2.innerHTML += latestMsg;

		// Nest elements
		div2.appendChild(p1);
		div2.appendChild(p2);
		div1.appendChild(img);
		div1.appendChild(div2);
		li.appendChild(div1);

		// Add to HTML
		contacts.appendChild(li);

    });
	/** Announcements **/



	/** Chatrooms **/
	var chatroomsRef = firebase.database().ref('/Team/Team1/Chatroom/Chatrooms'); 			//FIXME!!!!!!!!!!!!!!!!!!
    chatroomsRef.on("child_added", snapshot => {

		// Fetch from database
    	var chatroomName = snapshot.val().chatroomName;
    	var latestMsg = snapshot.val().msgArray[0];		// FIXME: Make function to get latest msg

    	// Check values
    	console.log("chatroomName = " + chatroomName);

    	// Create elements of contact
		var li = document.createElement("li");
		var div1 = document.createElement("div");
		var img = document.createElement("img");
		var div2 = document.createElement("div");
		var p1 = document.createElement("p");
		var p2 = document.createElement("p");

		// Edit attributes
		li.className += "contact";
		div1.className += "wrap";
		img.src += "img/eggperson.jpeg";
		div2.className += "meta";
		p1.className += "name";

		// FIXME: Add online status !!!

		// Add text
		p1.innerHTML += chatroomName;
		p2.innerHTML += latestMsg;

		// Nest elements
		div2.appendChild(p1);
		div2.appendChild(p2);
		div1.appendChild(img);
		div1.appendChild(div2);
		li.appendChild(div1);

		// Add to HTML
		contacts.appendChild(li);

    });
	/** Chatrooms **/


	/** Direct Messages **/
    var friendsRef = firebase.database().ref('/Team/Team1/Chatroom/directMessages'); 			//FIXME!!!!!!!!!!!!!!!!!!
    friendsRef.on("child_added", snapshot => {

    	// Fetch from database
    	var friendName = snapshot.val().name;
    	var friendId = snapshot.val().userId;
    	var latestMsg = snapshot.val().msgArray[0];		// FIXME: Make function to get latest msg

    	// Check values
    	console.log("friendName = " + friendName);
    	console.log("friendId = " + friendId);

    	// Create elements of contact
		var li = document.createElement("li");
		var div1 = document.createElement("div");
		var img = document.createElement("img");
		var div2 = document.createElement("div");
		var p1 = document.createElement("p");
		var p2 = document.createElement("p");

		// Edit attributes
		li.className += "contact";
		div1.className += "wrap";
		img.src += "img/eggperson.jpeg";
		div2.className += "meta";
		p1.className += "name";

		// FIXME: Add online status !!!

		// Add text
		p1.innerHTML += friendName;
		p2.innerHTML += latestMsg;

		// Nest elements
		div2.appendChild(p1);
		div2.appendChild(p2);
		div1.appendChild(img);
		div1.appendChild(div2);
		li.appendChild(div1);

		// Add to HTML
		contacts.appendChild(li);

    });
    /** Direct Messages **/

}, 1500);


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
	

	// Get Id's to access database
	//var userId = firebase.auth().currentUser.uid;
	//console.log(userId);

	/*
	var teamId;
	var tempRef = firebase.database().ref('/Users/'+userId+'/currTeam');		// FIXME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	tempRef.on('value', function(snapshot) {
		console.log(snapshot.val());
		teamId = snapshot.val();
	});
	*/

	//window.alert(teamId);
	console.log("outside: "+teamId);

	// Write to database
	//var chatRef = rootRef.child('teams').child(teamName);
	//var chatRef = rootRef.child('teams').child(teamID).child(chatrooms).child;
	//rootRef.child("Messages").set(msg);
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

