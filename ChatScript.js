var inputElem = document.querySelector('.chatMessage');
var contacts = document.querySelector('#contacts').children[0];
var messages = document.querySelector('.messages').children[0];
var userDisplayName = document.querySelector('#userDisplayName');
var chatroomDisplayName = document.querySelector('#chatroomDisplayName');

var userId;
var teamId;

var chatRef;
var othersRef;

// Variables to keep track of what kind of chat user is viewing
var inDM = false;
var inAnnounce = false;

// Keeps track if current user is an admin of the current team
var isAdmin = false;

// Used to set who sent a message
var nameOfSender = "Your Friend";

// Current time used for timestamps
var currTime;

// Sets userId and teamId when user is logged in
firebase.auth().onAuthStateChanged(async function (user) {
  // User is signed in: set userId and teamId
  if (user) {
    userId = user.uid;

    let ref = firebase.database().ref("Users/" + userId);
    await loadTeamId(ref);

  }
  // No user is signed in.
  else {}
});

// Sets teamId
async function loadTeamId(ref) {
  return ref.once('value').then(function (snapshot) {
    teamId = snapshot.val().currTeam;
  });
}

// Signs user out of website
function signOut() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Signing out");
      firebase.auth().signOut();
    }
  });
}

// Determines if current user is an admin
function checkAdmin(ref) {
  ref.once('value').then(function (snapshot) {
    // Check if the current user is the same as the admin listed on team
    isAdmin = (userId == snapshot.val().admin);
  });
}

// Sets name of person sending message
function getName(ref) {
  ref.once('value').then(function (snapshot) {
    // Check if the current user is the same as the admin listed on team
    nameOfSender = snapshot.val().Name;
  });
}

// Gets the current time for timestamp
async function getCurrTime(ref) {
  return ref.once('value').then(function (snapshot) {
    let offset = snapshot.val();
    let serverTime = new Date().getTime() + offset;
    let myDate = new Date(serverTime);
    currTime = myDate.toString().split(' ')[4];
  });
}

// Sets up chat window for announcements, chatrooms, and directMessages according to parameters
function setUpChat(chatType, name, optionalId) {

  // Sets up displays, variables, and refs based on chat type
  if (chatType == "announcements") {
    // Display name
    chatroomDisplayName.innerHTML = "Announcements";

    // Set type of chatroom
    inDM = false;
    inAnnounce = true;

    // Call checkAdmin to set isAdmin
    let adminRef = firebase.database().ref("Team/" + teamId);
    checkAdmin(adminRef);

    // Set reference to Announcements page on firebase
    chatRef = firebase.database().ref("/Team/" + teamId + "/Chatroom/Announcements/AnnouncementsExt");
  } else if (chatType == "chatrooms") {
    // Display name
    chatroomDisplayName.innerHTML = name;

    // Set type of chatroom
    inDM = false;
    inAnnounce = false;

    // Set reference to chatrooms page on firebase
    chatRef = firebase.database().ref("/Team/" + teamId + "/Chatroom/Chatrooms/" + name);
  } else { // directMessages
    // Display name
    chatroomDisplayName.innerHTML = name;

    // Set type of chatroom
    inDM = true;
    inAnnounce = false;

    // Set references for saving messages in both user's messages
    chatRef = firebase.database().ref("/Team/" + teamId + "/Chatroom/directMessages/" + userId + "/" + optionalId);
    othersRef = firebase.database().ref("/Team/" + teamId + "/Chatroom/directMessages/" + optionalId + "/" + userId);
  }

  // Removes all messages in the message window
  while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
  }

  // Fill in chat window with each message from database branch
  chatRef.child("msgArray").once("value", snapshot => {

    snapshot.forEach(function (data) {

      // Get value of message and time
      let inputMsg = data.val().message;
      let inputSender = data.val().sender;
      let timestamp = data.val().time;

      // Determine who is sending the message
      let source;
      if (inputSender == userId) {
        source = "client";
      } else {
        source = "server";
      }

      // Set name of sender
      friendRef = firebase.database().ref("/Users/" + inputSender);
      getName(friendRef);

      // Add chat bubble to window
      if (chatType == "announcements") {
        createHTMLMessage(inputMsg, "server", timestamp, "Admin");
      } else {
        createHTMLMessage(inputMsg, source, timestamp, nameOfSender);
      }
    });
  });
}

// Wait for log in to work so we don't get a null uid
setTimeout(function () {
  console.log("Ready to fill contacts!");

  console.log("userID: " + userId);
  console.log("teamId: " + teamId);

  /** Set Name **/
  let userRef = firebase.database().ref('/Users/' + userId);
  userRef.on("value", snapshot => {
    userDisplayName.innerHTML = snapshot.val().Name;
  })


  /** Announcements **/
  let announcementsRef = firebase.database().ref('/Team/' + teamId + '/Chatroom/Announcements');
  announcementsRef.on("child_added", snapshot => {

    // Fetch latest message on announcements
    let latestMsg = snapshot.val().mostRecent;

    // Truncates lates message if too long
    if (latestMsg.length > 25) {
      latestMsg = latestMsg.substring(0, 25) + "...";
    }

    // Generate HTML element on sidebar
    createHTMLContact("announcements", "Announcements", latestMsg);

  });
  /** Announcements **/


  /** Chatrooms **/
  let chatroomsRef = firebase.database().ref('/Team/' + teamId + '/Chatroom/Chatrooms');
  chatroomsRef.on("child_added", snapshot => {

    // Fetch from database
    let chatroomName = snapshot.val().chatroomName;
    let latestMsg = snapshot.val().mostRecent;

    // Truncates lates message if too long
    if (latestMsg.length > 25) {
      latestMsg = latestMsg.substring(0, 25) + "...";
    }

    // Generate HTML element on sidebar
    createHTMLContact("chatrooms", chatroomName, latestMsg);

  });
  /** Chatrooms **/


  /** Direct Messages **/
  let friendsRef = firebase.database().ref('/Team/' + teamId + '/Chatroom/directMessages/' + userId);
  friendsRef.on("child_added", snapshot => {

    // Fetch from database
    let friendName = snapshot.val().name;
    let friendId = snapshot.val().userId;
    let latestMsg = snapshot.val().mostRecent;

    // Truncates lates message if too long
    if (latestMsg.length > 25) {
      latestMsg = latestMsg.substring(0, 25) + "...";
    }

    // Generate HTML element on sidebar
    createHTMLContact("directMessages", friendName, latestMsg, friendId);

  });
  /** Direct Messages **/


  // Start at the announcements page
  setUpChat("announcements", "Announcements");


}, 1500);

/**
 * Updates message database
 */
async function updateMessageDatabase(msg) {

  // Only let admins post to announcements
  if ((inAnnounce && isAdmin) || (!inAnnounce)) {

    // Get the currTime
    await getCurrTime(firebase.database().ref("/.info/serverTimeOffset"));

    // Write to database
    // Create a new post reference with an auto-generated id
    let newPostRef = chatRef.child("msgArray").push();
    newPostRef.set({
      sender: userId,
      message: msg,
      time: currTime
    });

    // Update the most recent message
    chatRef.update({
      mostRecent: msg
    });

    // If calling from directMessages then update other's too except if talking to self
    if (inDM && (othersRef.toString() != chatRef.toString())) {
      // Update other member's database info
      newPostRef = othersRef.child("msgArray").push();
      newPostRef.set({
        sender: userId,
        message: msg,
        time: currTime
      });

      // Update the most recent message
      othersRef.update({
        mostRecent: msg
      });
    }
  }

  // Append the new message to chat window
  chatRef.child("msgArray").limitToLast(1).once("child_added", snapshot => {

    // Get value of message and time
    let inputMsg = snapshot.val().message;
    let inputSender = snapshot.val().sender;
    let timestamp = snapshot.val().time;

    // Determine who is sending the message
    let source;
    if (inputSender == userId) {
      source = "client";
    } else {
      source = "server";
    }

    // Set name of sender
    friendRef = firebase.database().ref("/Users/" + inputSender);
    getName(friendRef);

    // Add chat bubble to window
    if (inAnnounce) {
      createHTMLMessage(inputMsg, "server", timestamp, "Admin");
    } else {
      createHTMLMessage(inputMsg, source, timestamp, nameOfSender);
    }
  });
}

// Generates HTML element on sidebar for a specific contact
function createHTMLContact(chatType, name, latestMsg, optionalId) {

  // Create elements of contact
  let li = document.createElement("li");
  let div1 = document.createElement("div");
  let img = document.createElement("img");
  let div2 = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");

  // Edit attributes
  li.className += "contact";
  div1.className += "wrap";
  div2.className += "meta";
  p1.className += "name";

  // Add img and ability to switch between chats
  if (chatType == "announcements") {
    img.src += "img/announcement.png";
    div1.onclick = function () {
      setUpChat("announcements", "Announcements")
    };
  } else if (chatType == "chatrooms") {
    img.src += "img/admin_1.png";
    div1.onclick = function () {
      setUpChat("chatrooms", name)
    };
  } else {
    img.src += "img/user.png";
    div1.onclick = function () {
      setUpChat("directMessages", name, optionalId)
    };
  }

  // FIXME: Add online status !!!

  // Add text
  p1.innerHTML += name;
  p2.innerHTML += latestMsg;

  // Nest elements
  div2.appendChild(p1);
  div2.appendChild(p2);
  div1.appendChild(img);
  div1.appendChild(div2);
  li.appendChild(div1);

  // Add to HTML
  contacts.appendChild(li);
}

// Generates HTML element on message window for a specific message
function createHTMLMessage(msg, source, time, name) {

  // Timestamp
  let div = document.createElement("p");
  div.innerHTML += name + ": " + time.toString();

  // Create elements of message box
  let li = document.createElement("li");
  let p = document.createElement("p");
  let img = document.createElement("img");
  p.innerHTML += msg;

  // Determine the class attribute and image to append
  if (source == 'server') {
    li.className += "sent";
    img.src = "img/eggperson.jpeg";
    div.style = "padding-left: 50px; font-size: 12px"
  } else {
    li.className += "replies";
    img.src = "img/chat.jpg";
    div.style = "padding-left: 500px; font-size: 12px"
  }

  // Add img and message to li
  li.appendChild(img);
  li.appendChild(p);


  // Selects the messages class to always scroll to bottom
  const messagesCont = document.querySelector('.messages');
  shouldScroll = messagesCont.scrollTop + messagesCont.clientHeight === messagesCont.scrollHeight;
  if (!shouldScroll) {
    messagesCont.scrollTop = messagesCont.scrollHeight;
  }

  // Put html element on page
  messages.append(li);
  messages.append(div);


  messages.append(div);



}

// Adds message to message window whenever user presses enter
inputElem.addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {

    // Checked if the user entered anything
    if (inputElem.value != "") {
      updateMessageDatabase(inputElem.value);
      inputElem.value = "";
    }

  }

});