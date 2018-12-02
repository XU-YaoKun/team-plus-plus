var inputElem = document.querySelector('.chatMessage');
var contacts = document.querySelector('#contacts').children[0];
var messages = document.querySelector('.messages').children[0];
var userDisplayName = document.querySelector('#userDisplayName');
var socket = io.connect('http://localhost:3000');

var userId;
var teamId;

var chatRef;
var othersRef;

var inDM = false;

firebase.auth().onAuthStateChanged(async function(user){
	// User is signed in: set userId and teamId
	if (user){
		userId = user.uid;

		var ref = firebase.database().ref("Users/" + userId);
		await loadTeamId(ref);

		// Check values
		console.log("userId has been set: "+ userId);
		//console.log("teamId has been set: " + teamId);
		
	} 
	// No user is signed in.
	else{
	}
});


async function loadTeamId(ref){

    return ref.once('value').then(function(snapshot){
        teamId = snapshot.val().currTeam;
    });
}

function signOut() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Signing out");
      firebase.auth().signOut();
    }
  });
}

// Wait for log in to work so we don't get a null uid

setTimeout(function() {
    console.log( "Ready to fill contacts!" );

    console.log("userID: "+userId);
	console.log("teamId: "+teamId);
	
	/** Set Name **/

	var userRef = firebase.database().ref('/Users/'+userId); 			//FIXME!!!!!!!!!!!!!!!!!!
	userRef.on("value", snapshot => {
		userDisplayName.innerHTML = snapshot.val().Name;
	})


	/** Announcements **/
	var announcementsRef = firebase.database().ref('/Team/'+teamId+'/Chatroom/Announcements'); 			//FIXME!!!!!!!!!!!!!!!!!!
    announcementsRef.on("child_added", snapshot => {

    	// Set type of chatroom
    	inDM = false;

    	// Fetch latest message on announcements
    	//var latestMsg = snapshot.val()[0];		// FIXME: Make function to get latest msg !!!!!!!!!!!!!!
    	var latestMsg = snapshot.val().mostRecent;

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
		div1.onclick = function(){
			
			chatRef = firebase.database().ref("/Team/"+teamId+"/Chatroom/Announcements/AnnouncementsExt");

			// Removes all messages in the message window
			while(messages.firstChild){
				messages.removeChild(messages.firstChild);	
			}

			// Fill in chat window
			chatRef.child("msgArray").on("child_added", snapshot => {  //FIXME!!!!!!!!!!!!!!!!
				// Iterate through each message 
				//snapshot.forEach(snapshot => {

				console.log("Message: "+snapshot.val().message);
				console.log("Sender: "+snapshot.val().sender);

				var inputMsg = snapshot.val().message;

				createHTMLMessage(inputMsg, "server");
			});
			
		};

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
	var chatroomsRef = firebase.database().ref('/Team/'+teamId+'/Chatroom/Chatrooms'); 			//FIXME!!!!!!!!!!!!!!!!!!
    chatroomsRef.on("child_added", snapshot => {

    	// Set type of chatroom
    	inDM = false;

		// Fetch from database
    	var chatroomName = snapshot.val().chatroomName;
    	var latestMsg = snapshot.val().mostRecent;

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

		// Add ability to switch between chats
		div1.onclick = function(){
			
			chatRef = firebase.database().ref("/Team/"+teamId+"/Chatroom/Chatrooms/"+chatroomName);

			// Removes all messages in the message window
			while(messages.firstChild){
				messages.removeChild(messages.firstChild);	
			}

			// Fill in chat window
			chatRef.child("msgArray").on("child_added", snapshot => {  //FIXME!!!!!!!!!!!!!!!!
				// Iterate through each message 
				//snapshot.forEach(snapshot => {

				console.log("Message: "+snapshot.val().message);
				console.log("Sender: "+snapshot.val().sender);

				var inputMsg = snapshot.val().message;
				var inputSender = snapshot.val().sender;

				// Determine who is sending the message
				var source;
				if(inputSender == userId){
					source = "client";
				}
				else{
					source = "server";
				}

				createHTMLMessage(inputMsg, source);

				//});
			});
			
		};


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
    var friendsRef = firebase.database().ref('/Team/'+teamId+'/Chatroom/directMessages/'+userId); 			
    friendsRef.on("child_added", snapshot => {

    	// Variable to determine if we are in DMs
    	inDM = true;

    	// Fetch from database
    	var friendName = snapshot.val().name;
    	var friendId = snapshot.val().userId;
    	var latestMsg = snapshot.val().mostRecent;

    	// Check values
    	//console.log("friendName = " + friendName);
    	//console.log("friendId = " + friendId);

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

		// Add ability to switch between chats
		div1.onclick = function(){
			
			// Set references for saving messages in both user's messages
			chatRef = firebase.database().ref("/Team/"+teamId+"/Chatroom/directMessages/"+userId+"/"+friendId);
			othersRef = firebase.database().ref("/Team/"+teamId+"/Chatroom/directMessages/"+friendId+"/"+userId);

			// Removes all messages in the message window
			while(messages.firstChild){
				messages.removeChild(messages.firstChild);	
			}

			// Fill in chat window
			chatRef.child("msgArray").on("child_added", snapshot => {  //FIXME!!!!!!!!!!!!!!!!
				// Iterate through each message 
				//snapshot.forEach(snapshot => {

				console.log("Message: "+snapshot.val().message);
				console.log("Sender: "+snapshot.val().sender);

				var inputMsg = snapshot.val().message;
				var inputSender = snapshot.val().sender;

				// Determine who is sending the message
				var source;
				if(inputSender == userId){
					source = "client";
				}
				else{
					source = "server";
				}

				createHTMLMessage(inputMsg, source);

				//});
			});
			
		};


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

/**
* Updates message database
*/
function updateMessageDatabase(msg){

	// Write to database
	// Create a new post reference with an auto-generated id
	var newPostRef = chatRef.child("msgArray").push();
	newPostRef.set({
	    sender: userId,
	    message: msg
	});

	// Update the most recent message
	chatRef.update({
		mostRecent: msg
	});

	// If calling from directMessages then update other's too
	if(inDM){
		// Update other member's database info
		var newPostRef = othersRef.child("msgArray").push();
		newPostRef.set({
		    sender: userId,
		    message: msg
		});

		// Update the most recent message
		othersRef.update({
			mostRecent: msg
		});		
	}

}

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

	messages.append(li);
	
}

inputElem.addEventListener('keypress', function (e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		//createHTMLMessage(inputElem.value, 'client');
		updateMessageDatabase(inputElem.value);
		socket.emit('chat', inputElem.value);
		inputElem.value = "";
	}

});

socket.on("connect", function(data) {
  socket.emit("join", "Hello server from client");
});

socket.on("chat msg", function(msg) {
  createHTMLMessage(msg, "server");
});

