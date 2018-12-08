var existTeam = false;
var tSize = 0;
var person = null;
var inTeam = false;
var cuTeam = null;
var validUser = false;
var username = null;
var userID = null;
var taskCount = 0;
var description = "Not defined";
var currTime = null;
var oldEventName = null;
var eventNum = 0;

async function getIndividualTask(ref) {
  var taskDoer;
  var taskStatus;
  ref.on("value", function(snapshot) {
    console.log("HERE");
    if (snapshot.val() !== null) {
      snapshot.forEach(function(item) {
        taskDoer = item.val().handler;
        taskStatus = item.val().status;
        if (taskDoer == username && taskStatus !== "fin") {
          taskCount += 1;
        }
      });
    }
  });
}

async function teamExistInRef(ref, data) {
  return ref.child(data).once("value", function(snapshot) {
    if (snapshot.exists()) {
      existTeam = true;
    } else {
      existTeam = false;
    }
  });
}

async function isInTeam(ref, data) {
  return ref.child(data).once("value", function(snapshot) {
    if (snapshot.exists()) {
      inTeam = true;
    } else {
      inTeam = false;
    }
  });
}

async function isUser(ref, field, data) {
  return ref
    .orderByChild(field)
    .equalTo(data)
    .once("value", function(snapshot) {
      if (snapshot.exists()) {
        console.log("valid user");
        validUser = true;
        snapshot.forEach(function(data) {
          person = data.key;
        });
      } else {
        console.log("not valid user");
        validUser = false;
      }
    });
}

async function getTeamSize(ref) {
  return ref.once("value").then(function(snapshot) {
    tSize = snapshot.val();
  });
}

async function getCurrTeam(ref) {
  return ref.once("value").then(function(snapshot) {
    cuTeam = snapshot.val();
  });
}

async function getUserName(ref) {
  return ref.once("value").then(function(snapshot) {
    username = snapshot.val();
  });
}

async function getTeamDes(ref) {
  return ref.once("value").then(function(snapshot) {
    description = snapshot.val();
  });
}

// Gets the current time for timestamp
async function getCurrTime(ref) {
  return ref.once("value").then(function(snapshot) {
    let offset = snapshot.val();
    let serverTime = new Date().getTime() + offset;
    let myDate = new Date(serverTime);
    currTime = myDate.toString().split(" ")[4];
  });
}

async function createTeam() {
  var teamName = prompt("Please enter the team name.");
  var done = false;
  var rootref = firebase.database().ref("Team");

  while (!done) {
    if (teamName == null || teamName == "") {
      alert("Cancelled");
      done = true;
    } else {
      //check if team name exist in database
      await teamExistInRef(rootref, teamName);

      if (existTeam) {
        teamName = prompt(
          "Team name " +
            teamName +
            " already taken. Please enter another team name."
        );
      } else {
        rootref
          .child(teamName)
          .child("teamSize")
          .set(1);
        var teamsref = rootref.child(teamName);
        var userref = firebase.database().ref("Users/" + userID + "/Name");
        await getUserName(userref);
        teamsref
          .child("Members")
          .child(userID)
          .set([username, "Admin"]);
        teamsref.child("description").set("");
        teamsref.child("admin").set(userID);
        teamsref.child("TeamName").set(teamName);
        firebase
          .database()
          .ref("Users/" + userID + "/Teams/adminOf")
          .child(teamName)
          .set(teamName);

        // Get the currTime
        await getCurrTime(firebase.database().ref("/.info/serverTimeOffset"));

        // Set up the Announcements chat
        var newPostRef = teamsref
          .child("Chatroom")
          .child("Announcements")
          .child("AnnouncementsExt")
          .child("msgArray")
          .push();
        newPostRef.set({
          sender: "Admin",
          message: "Welcome",
          time: currTime
        });
        teamsref
          .child("Chatroom")
          .child("Announcements")
          .child("AnnouncementsExt")
          .child("mostRecent")
          .set("Welcome");

        // Set up the general chatroom
        var chatref = teamsref.child("Chatroom");
        chatref
          .child("Chatrooms")
          .child("general")
          .child("chatroomName")
          .set("general");
        //chatref.child('Chatrooms').child('general').child('memberList').child(userID).set([userID, username]);
        chatref
          .child("Chatrooms")
          .child("general")
          .child("mostRecent")
          .set("Welcome");
        newPostRef = chatref
          .child("Chatrooms")
          .child("general")
          .child("msgArray")
          .push();
        newPostRef.set({
          sender: "Admin",
          message: "Welcome.",
          time: currTime
        });

        // Set up the directMessages chat
        var DMref = chatref.child("directMessages");
        await getUserName(
          firebase.database().ref("/Users/" + userID + "/Name")
        );
        DMref.child(userID)
          .child(userID)
          .set({
            mostRecent: "Send your messages here.",
            name: username,
            userId: userID
          });
        newPostRef = DMref.child(userID)
          .child(userID)
          .child("msgArray")
          .push();
        newPostRef.set({
          sender: "Admin",
          message: "Send your messages here.",
          time: currTime
        });

        alert("You have created " + teamName + ".");
        done = true;
      }
    }
  }
}

async function joinTeam() {
  var teamName = prompt("Please enter the team name that you want to join.");
  var done = false;
  var rootref = firebase.database().ref("Team");

  while (!done) {
    if (teamName == null || teamName == "") {
      alert("Cancelled");
      done = true;
    } else {
      //check if team name exist in database
      await teamExistInRef(rootref, teamName);

      if (!existTeam) {
        teamName = prompt(
          "Team does not exist, please enter another team name."
        );
      } else {
        await isInTeam(
          firebase.database().ref("Team/" + teamName + "/Members/"),
          userID
        );
        if (inTeam) {
          alert("You are already in " + teamName + ".");
          done = true;
        } else {
          var tref = firebase.database().ref("Team/" + teamName + "/teamSize");
          await getTeamSize(tref);
          tSize = tSize + 1;
          tref.set(tSize);
          var teamsref = rootref.child(teamName);
          var userref = firebase.database().ref("Users/" + userID + "/Name");
          var memref = teamsref.child("Members");
          await getUserName(userref);
          memref.child(userID).set([username, "Member"]);
          firebase
            .database()
            .ref("Users/" + userID + "/Teams/memberOf")
            .child(teamName)
            .set(teamName);

          // Get the currTime
          await getCurrTime(firebase.database().ref("/.info/serverTimeOffset"));

          // Set up the directMessages chat
          var DMref = teamsref.child("Chatroom").child("directMessages");

          // Iterate thtough list of members creating a direct message between them and the new member
          memref.on("child_added", snapshot => {
            DMref.child(userID)
              .child(snapshot.key)
              .set({
                mostRecent: "Send your messages here.",
                name: snapshot.val()[0],
                userId: userID
              });
            newPostRef = DMref.child(userID)
              .child(snapshot.key)
              .child("msgArray")
              .push();
            newPostRef.set({
              sender: "Admin",
              message: "Send your messages here.",
              time: currTime
            });

            DMref.child(snapshot.key)
              .child(userID)
              .set({
                mostRecent: "Send your messages here.",
                name: username,
                userId: userID
              });
            newPostRef = DMref.child(snapshot.key)
              .child(userID)
              .child("msgArray")
              .push();
            newPostRef.set({
              sender: "Admin",
              message: "Send your messages here.",
              time: currTime
            });
          });

          alert("You have joined " + teamName + ".");
          done = true;
        }
      }
    }
  }
}

async function modifyAdmin(uid) {
  //get team name
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  //get the name of user of next admin
  var userref = firebase.database().ref("Users/" + uid + "/Name");
  await getUserName(userref);
  var newAdminname = username;
  var con = confirm(
    "Are you sure to change admin of " + cuTeam + " to be " + username + "?"
  );
  if (con) {
    firebase
      .database()
      .ref("Team/" + cuTeam + "/admin")
      .set(uid);
    firebase
      .database()
      .ref("Team/" + cuTeam + "/Members/" + uid)
      .set([username, "Admin"]);
    userref = firebase.database().ref("Users/" + userID + "/Name");
    await getUserName(userref);
    firebase
      .database()
      .ref("Team/" + cuTeam + "/Members/" + userID)
      .set([username, "Member"]);
    firebase
      .database()
      .ref("Users/" + userID + "/Teams/adminOf")
      .child(cuTeam)
      .remove();
    firebase
      .database()
      .ref("Users/" + userID + "/Teams/memberOf")
      .child(cuTeam)
      .set(cuTeam);
    firebase
      .database()
      .ref("Users/" + uid + "/Teams/adminOf")
      .child(cuTeam)
      .set(cuTeam);
    firebase
      .database()
      .ref("Users/" + uid + "/Teams/memberOf")
      .child(cuTeam)
      .remove();

    alert(
      "The admin of " + cuTeam + " has been changed to " + newAdminname + "."
    );
    window.location = "team.html";
  } else alert("Cancelled");
}

async function addMember() {
  var email = prompt(
    "Please enter the email of the user that you want to add."
  );
  var rootref = firebase.database().ref("Users");
  var done = false;

  while (!done) {
    if (email == null || email == "") {
      alert("Cancelled");
      done = true;
    } else {
      //check if team name exist in database
      await isUser(rootref, "Email", email);

      if (!validUser) {
        email = prompt("User does not exist, please enter another user email.");
      } else {
        //get the current team of admin
        var ref = firebase.database().ref("Users/" + userID + "/currTeam");
        await getCurrTeam(ref);
        //check if is already in team
        await isInTeam(
          firebase.database().ref("Team/" + cuTeam + "/Members/"),
          person
        );
        if (inTeam) {
          alert("The user you want to add is already in " + cuTeam + ".");
          done = true;
        } else {
          var teamref = firebase.database().ref("Team/" + cuTeam);
          var memref = teamref.child("Members");
          //update members field
          var userref = firebase.database().ref("Users/" + person + "/Name");
          await getUserName(userref);
          memref.child(person).set([username, "Member"]);
          //update team size
          await getTeamSize(teamref.child("teamSize"));
          tSize = tSize + 1;
          teamref.child("teamSize").set(tSize);
          //update added person's account
          firebase
            .database()
            .ref("Users/" + person + "/Teams/memberOf")
            .child(cuTeam)
            .set(cuTeam);

          var nref = firebase.database().ref("Team/" + cuTeam + "/teamSize");
          await getTeamSize(nref);
          document.getElementById("number").innerText = tSize;

          // Get the currTime
          await getCurrTime(firebase.database().ref("/.info/serverTimeOffset"));

          // Set up the directMessages chat
          var DMref = teamref.child("Chatroom").child("directMessages");

          // Iterate thtough list of members creating a direct message between them and the new member
          memref.on("child_added", snapshot => {
            DMref.child(person)
              .child(snapshot.key)
              .set({
                mostRecent: "Send your messages here.",
                name: snapshot.val()[0],
                userId: person
              });
            newPostRef = DMref.child(person)
              .child(snapshot.key)
              .child("msgArray")
              .push();
            newPostRef.set({
              sender: "Admin",
              message: "Send your messages here.",
              time: currTime
            });

            DMref.child(snapshot.key)
              .child(person)
              .set({
                mostRecent: "Send your messages here.",
                name: username,
                userId: person
              });
            newPostRef = DMref.child(snapshot.key)
              .child(person)
              .child("msgArray")
              .push();
            newPostRef.set({
              sender: "Admin",
              message: "Send your messages here.",
              time: currTime
            });
          });

          alert("You have added " + username + " to " + cuTeam + ".");
          done = true;
        }
      }
    }
  }
}

async function removeMember(uid) {
  //get team name
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  //get the name of user need to be removed
  var userref = firebase.database().ref("Users/" + uid + "/Name");
  await getUserName(userref);
  var con = confirm(
    "Are you sure to remove " + username + " from " + cuTeam + "?"
  );
  if (con) {
    firebase
      .database()
      .ref("Team/" + cuTeam + "/Members/" + uid)
      .remove();
    firebase
      .database()
      .ref("Users/" + uid + "/Teams/memberOf/" + cuTeam)
      .remove();
    var tref = firebase.database().ref("Team/" + cuTeam + "/teamSize");
    await getTeamSize(tref);
    tSize = tSize - 1;
    tref.set(tSize);
    alert("You have removed " + username + " from " + cuTeam + ".");
    location.reload();
  } else alert("Cancelled");
}

async function leaveTeam() {
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  var con = confirm(
    "Are you sure you do not want to be a member of " + cuTeam + "?"
  );
  if (con) {
    console.log(cuTeam);
    firebase
      .database()
      .ref("Users/" + userID + "/currTeam")
      .set("");
    firebase
      .database()
      .ref("Team/" + cuTeam + "/Members/" + userID)
      .remove();
    firebase
      .database()
      .ref("Users/" + userID + "/Teams/memberOf/" + cuTeam)
      .remove();
    var tref = firebase.database().ref("Team/" + cuTeam + "/teamSize");
    await getTeamSize(tref);
    tSize = tSize - 1;
    tref.set(tSize);
    alert("You are no longer a member of " + cuTeam + ".");
    window.location = "team.html";
  } else alert("Cancelled");
}

async function assignRole(uid) {
  //get the user name
  var userref = firebase.database().ref("Users/" + uid + "/Name");
  await getUserName(userref);
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  var role = prompt("Please enter the role of " + username + ".");
  if (role == null || role == "") {
    alert("Cancelled");
  } else {
    firebase
      .database()
      .ref("Team/" + cuTeam + "/Members/" + uid)
      .set([username, role]);
    location.reload();
  }
}

async function addDescription() {
  var info = prompt("Please enter a brief description of your team below.");
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  if (info == null || info == "") {
    alert("Cancelled");
  } else {
    firebase
      .database()
      .ref("Team/" + cuTeam + "/description")
      .set(info);
    document.getElementById("descriptionBox").innerHTML = info.toString();
  }
}

async function updateView() {
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  document.getElementById("teamName").innerText =
    "You are a member of: " + cuTeam;

  var nref = firebase.database().ref("Team/" + cuTeam + "/teamSize");
  await getTeamSize(nref);
  document.getElementById("number").innerText = tSize;

  var dref = firebase.database().ref("Team/" + cuTeam + "/description");
  await getTeamDes(dref);
  document.getElementById("descriptionBox").innerText = description;

  var tref = firebase.database().ref("Team/" + cuTeam + "/Members");
  var members = document.getElementById("allMem");

  var taskRef = firebase.database().ref("Team/" + cuTeam + "/Tasks");
  var path = firebase.database().ref("Users/" + userID + "/Name");
  await getUserName(path);
  await getIndividualTask(taskRef);
  setTimeout(function() {
    document.getElementById("taskNum").innerText = taskCount;
  }, 50);

  tref.on("child_added", snapshot => {
    var name = snapshot.val()[0];
    var role = snapshot.val()[1];
    var id = snapshot.key;

    var tr = document.createElement("tr");
    tr.className = name;
    var td1 = document.createElement("td");
    td1.innerText = name;
    var td2 = document.createElement("td");
    td2.innerText = role;

    tr.appendChild(td1);
    tr.appendChild(td2);
    if (id != userID) {
      var td3 = document.createElement("td");
      var button1 = document.createElement("button");
      button1.className = "btn btn-success btn-lg btn-block ti-hand-drag";
      button1.type = "button";
      button1.style = "width:50px; margin: auto";
      button1.textAlign = "center";
      button1.addEventListener("click", function() {
        assignRole(id);
      });

      var td4 = document.createElement("td");
      var button2 = document.createElement("button");
      button2.className = "btn btn-success btn-lg btn-block ti-user";
      button2.type = "button";
      button2.style = "width:50px; margin: auto";
      button2.textAlign = "center";
      button2.addEventListener("click", function() {
        modifyAdmin(id);
      });

      var td5 = document.createElement("td");
      var button3 = document.createElement("button");
      button3.className = "btn btn-success btn-lg btn-block ti-eraser";
      button3.type = "button";
      button3.style = "width: 50px; margin: auto";
      button3.textAlign = "center";
      button3.addEventListener("click", function() {
        removeMember(id);
      });

      td3.appendChild(button1);
      td4.appendChild(button2);
      td5.appendChild(button3);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
    } else {
      var td3 = document.createElement("td");
      td3.innerText = " You are the admin";
      td3.className = "ti-na";
      var td4 = document.createElement("td");
      td4.innerText = " You are the admin";
      td4.className = "ti-na";
      var td5 = document.createElement("td");
      td5.innerText = " You are the admin";
      td5.className = "ti-na";

      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
    }
    members.appendChild(tr);
  });

  var eref = firebase.database().ref("Team/" + cuTeam + "/Events");
  var events = document.getElementById("eventTable");
  var tableRowNum = events.rows.length;

  if (eref == null) {
    console.log("The event page is not yet set up.");
  } else {
    eref.on("child_added", snapshot => {
      var eventName = snapshot.key;
      var eventDate = snapshot.child("Date").val();
      var eventDescription = snapshot.child("Description").val();
      var eventEndTime = snapshot.child("End Time").val();
      var eventStartTime = snapshot.child("Start Time").val();

      if (
        eventName == null ||
        eventDate == null ||
        eventDescription == null ||
        eventEndTime == null ||
        eventStartTime == null
      ) {
        return false;
      } else {
        var row = events.insertRow(tableRowNum);
        var firstCell = row.insertCell(0);
        var secondCell = row.insertCell(1);
        var thirdCell = row.insertCell(2);
        var fourthCell = row.insertCell(3);
        var fifthCell = row.insertCell(4);
        var sixthCell = row.insertCell(5);

        var deleteButton = document.createElement("button");
        var buttonName = document.createTextNode("Delete");
        deleteButton.appendChild(buttonName);
        sixthCell.appendChild(deleteButton);
        deleteButton.onclick = function() {
          deleteEvent(eventName);
        };

        var editButton = document.createElement("button");
        var buttonName1 = document.createTextNode("Edit");
        editButton.appendChild(buttonName1);
        fifthCell.appendChild(editButton);
        editButton.onclick = function() {
          onClickEditEvent(
            eventName,
            eventDescription,
            eventDate,
            eventStartTime,
            eventEndTime
          );
        };

        firstCell.innerHTML = eventDate;
        secondCell.innerHTML = eventStartTime + " to " + eventEndTime;
        thirdCell.innerHTML = eventName;
        fourthCell.innerHTML = eventDescription;
      }
    });
  }
}

async function updateViewMem() {
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  document.getElementById("teamName").innerText = "You are in: " + cuTeam;

  var dref = firebase.database().ref("Team/" + cuTeam + "/description");
  await getTeamDes(dref);
  document.getElementById("teamDes").innerText =
    "Team Description: " + description;

  var nref = firebase.database().ref("Team/" + cuTeam + "/teamSize");
  await getTeamSize(nref);
  document.getElementById("number").innerText = tSize;

  var tref = firebase.database().ref("Team/" + cuTeam + "/Members");
  var members = document.getElementById("allMem");

  var taskRef = firebase.database().ref("Team/" + cuTeam + "/Tasks");
  var path = firebase.database().ref("Users/" + userID + "/Name");
  await getUserName(path);
  await getIndividualTask(taskRef);
  setTimeout(function() {
    document.getElementById("taskNum").innerText = taskCount;
  }, 50);

  tref.on("child_added", snapshot => {
    var name = snapshot.val()[0];
    var role = snapshot.val()[1];

    var tr = document.createElement("tr");
    tr.className = name;
    var td1 = document.createElement("td");
    td1.innerText = name;
    var td2 = document.createElement("td");
    td2.innerText = role;

    // Nest elements
    tr.appendChild(td1);
    tr.appendChild(td2);

    members.appendChild(tr);
  });

  var eref = firebase.database().ref("Team/" + cuTeam + "/Events");
  var events = document.getElementById("eventTable");
  var tableRowNum = events.rows.length;

  if (eref == null) {
    console.log("The event page is not yet set up.");
  } else {
    eref.once("child_added", snapshot => {
      var eventName = snapshot.key;
      var eventDate = snapshot.child("Date").val();
      var eventDescription = snapshot.child("Description").val();
      var eventEndTime = snapshot.child("End Time").val();
      var eventStartTime = snapshot.child("Start Time").val();

      var row = events.insertRow(tableRowNum);
      var firstCell = row.insertCell(0);
      var secondCell = row.insertCell(1);
      var thirdCell = row.insertCell(2);
      var fourthCell = row.insertCell(3);
      var fifthCell = row.insertCell(4);
      var sixthCell = row.insertCell(5);

      firstCell.innerHTML = eventDate;
      secondCell.innerHTML = eventStartTime + " to " + eventEndTime;
      thirdCell.innerHTML = eventName;
      fourthCell.innerHTML = eventDescription;
    });
  }
}

async function updateAdminList() {
  var adminRef = firebase.database().ref("Users/" + userID + "/Teams/adminOf");
  await getCurrTeam(adminRef);
  var adminT = document.getElementById("admin");
  var count = 1;
  adminRef.on("child_added", snapshot => {
    var teamName = snapshot.val();

    var tr = document.createElement("tr");
    tr.className = teamName;
    var td1 = document.createElement("td");
    td1.className = "serial";
    td1.style = "text-align: center";
    td1.innerText = count.toString() + ".";
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var span = document.createElement("span");
    span.className = "teamName";
    span.innerText = teamName;
    var button = document.createElement("button");
    button.className = "btn btn-success btn-lg btn-block";
    button.type = "button";
    button.style = "width:150px";
    button.addEventListener("click", function() {
      redirectAdmin(teamName);
    });
    button.innerText = "Go";

    // Nest elements
    td2.appendChild(span);
    td3.appendChild(button);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    adminT.appendChild(tr);
    count += 1;
  });
}

async function updateMemList() {
  var memRef = firebase.database().ref("Users/" + userID + "/Teams/memberOf");
  await getCurrTeam(memRef);
  var memT = document.getElementById("member");
  var count = 1;
  memRef.on("child_added", snapshot => {
    var teamName = snapshot.val();

    var tr = document.createElement("tr");
    tr.className = teamName;
    var td1 = document.createElement("td");
    td1.className = "serial";
    td1.style = "text-align: center";
    td1.innerText = count.toString() + ".";
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var span = document.createElement("span");
    span.className = "teamName";
    span.innerText = teamName;
    var button = document.createElement("button");
    button.className = "btn btn-success btn-lg btn-block";
    button.type = "button";
    button.style = "width: 150px";
    button.addEventListener("click", function() {
      redirectMem(teamName);
    });
    button.innerText = "Go";

    // Nest elements
    td2.appendChild(span);
    td3.appendChild(button);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    memT.appendChild(tr);
    count += 1;
  });
}

function redirectAdmin(currentTeam) {
  var userID = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref("Users/" + userID + "/currTeam")
    .set(currentTeam);
  window.location = "HomePage.html";
}

function redirectMem(currentTeam) {
  var userID = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref("Users/" + userID + "/currTeam")
    .set(currentTeam);
  window.location = "HomePageMem.html";
}

function makeEvent() {
  var dialog = document.getElementById("dialog");
  dialog.showModal();
}

function onClickEditEvent(
  eventName,
  eventDescription,
  eventDate,
  eventStartTime,
  eventEndTime
) {
  var dialog = document.getElementById("editDialog");
  var ref = firebase.database().ref("Team/" + cuTeam + "/Events/" + eventName);
  document.getElementById("eventNameEdit").value = eventName;
  document.getElementById("eventDescriptionEdit").value = eventDescription;
  document.getElementById("eventDateEdit").value = eventDate;
  document.getElementById("eventStartEdit").value = eventStartTime;
  document.getElementById("eventEndEdit").value = eventEndTime;
  oldEventName = eventName;
  dialog.showModal();
}

function eventEditSave() {
  //Get the new values
  var eventName = document.getElementById("eventNameEdit").value;
  var eventDate = document.getElementById("eventDateEdit").value;
  var eventDescription = document.getElementById("eventDescriptionEdit").value;
  var eventStartTime = document.getElementById("eventStartEdit").value;
  var eventEndTime = document.getElementById("eventEndEdit").value;

  //Validate the new values
  var root = firebase.database().ref("Team/" + cuTeam + "/Events");
  root.once("child_added", function(snapshot) {
    var existedName = snapshot.key;
    if (eventName == existedName && existedName != oldEventName) {
      alert("This name is already taken. Please enter a new name");
    } else if (eventName == "" || /^\s+$/.test(eventName)) {
      alert("The event name is missing. Please enter a nam for the event");
    } else if (eventDescription == "" || /^\s+$/.test(eventDescription)) {
      alert("The event is missing a description. Please add a description !");
    } else if (eventEndTime < eventStartTime) {
      alert("The event ends before it even starts. Please change the time !");
    } else {
      alert("You have successfully edited the event.");

      root.child(oldEventName).set(null);

      var ref = root.child(eventName);
      ref.child("Date").set(eventDate);
      ref.child("Description").set(eventDescription);
      ref.child("Start Time").set(eventStartTime);
      ref.child("End Time").set(eventEndTime);

      var table = document.getElementById("eventTable");
      var rowNum = table.rows.length;

      for (var i = 0; i < rowNum; i++) {
        var thisRow = table.rows[i];
        var thisRowEventName = thisRow.cells[2].innerHTML;
        if (thisRowEventName == oldEventName) {
          thisRow.cells[0].innerHTML = eventDate;
          thisRow.cells[1].innerHTML = eventStartTime + "\t" + eventEndTime;
          thisRow.cells[2].innerHTML = eventName;
          thisRow.cells[3].innerHTML = eventDescription;

          var editButton = thisRow.cells[4].childNodes[0];
          editButton.onclick = function() {
            onClickEditEvent(eventName);
          };

          var deleteButton = thisRow.cells[5].childNodes[0];
          deleteButton.onclick = function() {
            deleteEvent(eventName);
          };
        }
      }
      //Clear old infor
      oldEventName = null;
      document.getElementById("eventNameEdit").value = "";
      document.getElementById("eventDateEdit").value = "";
      document.getElementById("eventDescriptionEdit").value = "";
      document.getElementById("eventStartEdit").value = "";
      document.getElementById("eventEndEdit").value = "";
    }
  });
}

function deleteEvent(eventName) {
  //delete from firebase
  var ref = firebase.database().ref("Team/" + cuTeam + "/Events/" + eventName);
  ref.set(null);

  //delete from table
  var table = document.getElementById("eventTable");
  var rowNum = table.rows.length;

  for (var i = 0; i < rowNum; i++) {
    var thisRow = table.rows[i];
    var thisRowEventName = thisRow.cells[2].innerHTML;
    if (thisRowEventName == eventName) {
      table.deleteRow(i);
      return true;
    }
  }
}

//Save Event Details into database.
function eventSaveHelper(
  eventName,
  eventDate,
  eventDescription,
  eventStartTime,
  eventEndTime
) {
  var root = firebase
    .database()
    .ref("Team")
    .child(cuTeam)
    .child("Events");
  var eventRef = root.child(eventName);
  eventRef.child("Date").set(eventDate);
  eventRef.child("Description").set(eventDescription);
  eventRef.child("Start Time").set(eventStartTime);
  eventRef.child("End Time").set(eventEndTime);

  //Clear fields
  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventDescription").value = "";
  document.getElementById("eventStart").value = "";
  document.getElementById("eventEnd").value = "";

  var x = document.getElementById("dialog");
  x.close();

  var events = document.getElementById("eventTable");
  var tableRowNum = events.rows.length;

  var row = events.insertRow(tableRowNum);
  var firstCell = row.insertCell(0);
  var secondCell = row.insertCell(1);
  var thirdCell = row.insertCell(2);
  var fourthCell = row.insertCell(3);
  var fifthCell = row.insertCell(4);
  var sixthCell = row.insertCell(5);

  var deleteButton = document.createElement("button");
  var buttonName = document.createTextNode("Delete");
  deleteButton.appendChild(buttonName);
  sixthCell.appendChild(deleteButton);
  deleteButton.onclick = function() {
    deleteEvent(eventName);
  };

  var editButton = document.createElement("button");
  var buttonName1 = document.createTextNode("Edit");
  editButton.appendChild(buttonName1);
  fifthCell.appendChild(editButton);
  editButton.onclick = function() {
    onClickEditEvent(
      eventName,
      eventDescription,
      eventDate,
      eventStartTime,
      eventEndTime
    );
  };

  firstCell.innerHTML = eventDate;
  secondCell.innerHTML = eventStartTime + " to " + eventEndTime;
  thirdCell.innerHTML = eventName;
  fourthCell.innerHTML = eventDescription;
}

function eventSave() {
  //Receive Information from the dialog
  var eventName = document.getElementById("eventName").value;
  var eventDate = document.getElementById("eventDate").value;
  var eventDescription = document.getElementById("eventDescription").value;
  var eventStartTime = document.getElementById("eventStart").value;
  var eventEndTime = document.getElementById("eventEnd").value;

  //Check for valid information
  if (eventName == "" || /^\s+$/.test(eventName)) {
    alert("The event is missing a name. Please add a name !");
  } else if (eventDescription == "" || /^\s+$/.test(eventDescription)) {
    alert("The event is missing a description. Please add a description !");
  } else if (eventEndTime < eventStartTime) {
    alert("The event ends before it even starts. Please change the time !");
  } else if (eventNum == 0) {
    alert("You have successfully created the event.");
    eventSaveHelper(
      eventName,
      eventDate,
      eventDescription,
      eventStartTime,
      eventEndTime
    );
  } else {
    var valid = firebase.database().ref("Team/" + cuTeam + "/Events");
    valid.once("child_added", function(snapshot) {
      var name = snapshot.key;

      if (eventName == name) {
        alert(
          "There is already another event with the same name. Please change the name of the current event"
        );
      } else {
        alert("You have successfully created the event.");
        eventSaveHelper(
          eventName,
          eventDate,
          eventDescription,
          eventStartTime,
          eventEndTime
        );
      }
    });
  }
}
