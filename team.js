<<<<<<< HEAD
src = "https://www.gstatic.com/firebasejs/5.5.9/firebase.js";
var config = {
  apiKey: "AIzaSyCDwFS1dxv0WWEbgehMdtsIQ3F_WQlKDnE",
  authDomain: "team-plus-plus.firebaseapp.com",
  databaseURL: "https://team-plus-plus.firebaseio.com",
  projectId: "team-plus-plus",
  storageBucket: "team-plus-plus.appspot.com",
  messagingSenderId: "836611996730"
};
firebase.initializeApp(config);

var existTeam = false;
var tSize = 0;
var person = null;
var inTeam = false;
var cuTeam = null;
var validUser = false;
var username = null;
var teamsAdmin = null;
var teamsMem = null;

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

async function createTeam() {
  var userID = firebase.auth().currentUser.uid;
  var teamName = prompt("Please enter the team name.", "Team++");
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
          .set([username, "admin"]);
        teamsref.child("description").set("");
        teamsref.child("admin").set(userID);
        teamsref.child("TeamName").set(teamName);
        firebase
          .database()
          .ref("Users/" + userID + "/Teams/adminOf")
          .child(teamName)
          .set(teamName);
        alert("You have created " + teamName + ".");
        done = true;
      }
    }
  }
}

async function joinTeam() {
  var userID = firebase.auth().currentUser.uid;
  var teamName = prompt(
    "Please enter the team name that you want to join.",
    "Team++"
  );
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
          await getUserName(userref);
          teamsref
            .child("Members")
            .child(userID)
            .set([username, ""]);
          firebase
            .database()
            .ref("Users/" + userID + "/Teams/memberOf")
            .child(teamName)
            .set(teamName);
          alert("You have joined " + teamName + ".");
          done = true;
        }
      }
    }
  }
}

async function modifyAdmin(uid) {
  var userID = firebase.auth().currentUser.uid;
  //get team name
  var ref = firebase.database().ref("Users/" + userID + "/currTeam");
  await getCurrTeam(ref);
  //get the name of user of next admin
  var userref = firebase.database().ref("Users/" + uid + "/Name");
  await getUserName(userref);
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
      .set([username, "admin"]);
    userref = firebase.database().ref("Users/" + userID + "/Name");
    await getUserName(userref);
    firebase
      .database()
      .ref("Team/" + cuTeam + "/Members/" + userID)
      .set([username, ""]);
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
    alert("The admin of " + cuTeam + " has been changed to " + username + ".");
  } else alert("Canceled");
}

async function addMember() {
  var userID = firebase.auth().currentUser.uid;
  var email = prompt(
    "Please enter the email of the user that you want to add",
    "1@1.com"
  );
  var rootref = firebase.database().ref("Users");
  var done = false;

  //console.log(userID);
  //console.log(validUser);
  while (!done) {
    if (email == null || email == "") {
      alert("Cancelled");
      done = true;
    } else {
      //check if team name exist in database
      await isUser(rootref, "email", email);

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
          alert("The user you want to add is already in " + teamName + ".");
          done = true;
        } else {
          var teamref = firebase.database().ref("Team/" + cuTeam);
          //update members field
          var userref = firebase.database().ref("Users/" + person + "/Name");
          await getUserName(userref);
          teamref
            .child("Members")
            .child(person)
            .set([username, ""]);
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
          alert("You have added " + username + " to " + cuTeam + ".");
          done = true;
        }
      }
    }
  }
}

async function removeMember(uid) {
  var userID = firebase.auth().currentUser.uid;
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
    alert("You have removed " + username + " from " + cuTeam + ".");
  } else alert("Canceled");
}

async function leaveTeam() {
  var userID = firebase.auth().currentUser.uid;
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
    alert("You are no longer a member of " + cuTeam + ".");
  } else alert("Canceled");
}

function getTeamAdmin() {
  var userID = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref("Users/" + userID + "/Teams/adminOf");
  ref.on("value", function(snapshot) {
    teamsAdmin = snapshot.val();
  });
}

function getTeamMem() {
  var userID = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref("Users/" + userID + "/Teams/memberOf");
  ref.on("value", function(snapshot) {
    teamsMem = snapshot.val();
  });
}

async function assignRole(uid) {
  //get the user name
  var userref = firebase.database().ref("Users/" + uid + "/Name");
  await getUserName(userref);
  var role = prompt("Please enter the of " + username + ".");
  firebase
    .database()
    .ref("Team/" + cuTeam + "/Members/" + uid)
    .set([username, role]);
}

function addDescription() {
  var info = prompt("Please enter a brief description of your team below.");
  //TODO write to html
  /*
    function createTeam() {
        var teamName = prompt("Please enter the team name", "Team++");
        var valid = true;
        var rootref = firebase.database().ref();
        var user = firebase.auth().currentUser;
        //TODO check if team name exist in database
        while (!valid && (teamName != null && teamName != "")) {
            teamName = prompt("Team name already taken, please enter another team name.");
        }
        if (teamName == null || teamName == ""){
            alert("Cancelled");
        }
        else{
            rootref.child('teams').child(teamName).child('teamSize').set(1);
            var teamsref = rootref.child('teams').child(teamName);
            teamsref.child('members').set(["Me",]);
            teamsref.child('description').set("");
            alert("You have created " + teamName + ".");
        }
    }
    function modifyAdmin() {
        var person = prompt("Please enter the email of the user of the future admin", "Gary");
        var valid = false;
        //TODO check if person exist in team
        while (!valid && (person != null && person != "")) {
            person = prompt("User is not in your team, please enter another email.");
        }
        if (person == null || person == ""){
            alert("Cancelled");
        }
        else{
            //TODO update database
            alert("You have changes " + person + " to be the admin of your team.");
        }
    }
    function addMember() {
        var person = prompt("Please enter the email of the user that you want to add", "Gary");
        var valid = true;
        //TODO check if person exist in database
        while (!valid && (person != null && person != "")) {
            person = prompt("User does not exist, please enter another email.");
        }
        if (person == null || person == ""){
            alert("Cancelled");
        }
        else{
            //TODO modify team members field for other team members and update database
            document.getElementById("members").value += " " + person;
            alert("You have added " + person + " to your team.");
        }
    }
    function joinTeam() {
        var teamName = prompt("Please enter the team name", "Team++");
        var valid = false;
        //TODO check if is a valid team
        while (!valid && (teamName != null && teamName != "")) {
            teamName = prompt("Team does not exist, please enter another team name.");
        }
        if (teamName == null || teamName == ""){
            alert("Cancelled");
        }
        else{
            //TODO modify team members field for other team members and update database
            alert("You have joined " + teamName + ".");
        }
    }
    function removeMember() {
        var person = prompt("Please enter the email of the user that you want to remove", "Gary");
        var valid = false;
        //TODO check if person exist in team
        while (!valid && (person != null && person != "")) {
            person = prompt("User is not in your team, please enter another email.");
        }
        if (person == null || person == ""){
            alert("Cancelled");
        }
        else{
            //TODO modify team members field for other team members and update database
            alert("You have removed " + person + " from your team.");
        }
    }
    function leaveTeam() {
        var con = confirm("Are you sure you want to leave this team?");
        var admin = true;
        if(con) {
            if (admin) {
                alert("Cannot leave team because you are the admin of this team.");
            }
            else {
                //TODO modify team members field for other team members and update database
                alert("You have left the team");
            }
        }
        else alert("Canceled");
    */
}

function signOut() {
  alert("We are now in signOut()!");
  alert(firebase.auth().currentUser.uid);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.auth().signOut();
      window.location.href = "Login.html";
    }
  });
}
=======
src="https://www.gstatic.com/firebasejs/5.5.9/firebase.js";
var config = {
    apiKey: "AIzaSyCDwFS1dxv0WWEbgehMdtsIQ3F_WQlKDnE",
    authDomain: "team-plus-plus.firebaseapp.com",
    databaseURL: "https://team-plus-plus.firebaseio.com",
    projectId: "team-plus-plus",
    storageBucket: "team-plus-plus.appspot.com",
    messagingSenderId: "836611996730"
};
firebase.initializeApp(config);


var existTeam = false;
var tSize = 0;
var person = null;
var inTeam = false;
var cuTeam = null;
var validUser = false;
var username = null;
var teamsAdmin = null;
var teamsMem = null;


async function teamExistInRef(ref, data){
    return ref.child(data).once('value', function(snapshot) {
        if (snapshot.exists()) {
            existTeam = true;
        }
        else{
            existTeam = false;
        }
    });
}

async function isInTeam(ref, data){
    return ref.child(data).once('value', function(snapshot) {
        if (snapshot.exists()) {
            inTeam = true;
        }
        else{
            inTeam = false;
        }
    });
}

async function isUser(ref, field, data){
    return ref.orderByChild(field).equalTo(data).once("value", function(snapshot) {
        if (snapshot.exists()) {
            console.log("valid user");
            validUser = true;
            snapshot.forEach(function(data) {
                person = data.key;
            });
        }
        else{
            console.log("not valid user");
            validUser = false;
        }
    });
}

async function getTeamSize(ref){
    return ref.once('value').then(function(snapshot){
        tSize = snapshot.val();
    });
}

async function getCurrTeam(ref){
    return ref.once('value').then(function(snapshot){
        cuTeam = snapshot.val();
    });
}

async function getUserName(ref){
    return ref.once('value').then(function(snapshot){
        username = snapshot.val();
    });
}

async function createTeam() {
    var userID = firebase.auth().currentUser.uid;
    var teamName = prompt("Please enter the team name.", "Team++");
    var done = false;
    var rootref = firebase.database().ref("Team");

    while(!done){
        if (teamName == null || teamName == ""){
            alert("Cancelled");
            done = true;
        }
        else{
            //check if team name exist in database
            await teamExistInRef(rootref, teamName);

            if(existTeam){
                teamName = prompt("Team name " + teamName + " already taken. Please enter another team name.");
            }
            else{
                rootref.child(teamName).child('teamSize').set(1);
                var teamsref = rootref.child(teamName);
                var userref = firebase.database().ref("Users/" + userID + "/Name");
                await getUserName(userref);
                teamsref.child("Members").child(userID).set([username, "admin"]);
                teamsref.child("description").set("");
                teamsref.child("admin").set(userID);
                teamsref.child("TeamName").set(teamName);
                firebase.database().ref('Users/' + userID + '/Teams/adminOf').child(teamName).set(teamName);
                alert("You have created " + teamName + ".");
                done = true;
            }
        }
    }
}

async function joinTeam() {
    var userID = firebase.auth().currentUser.uid;
    var teamName = prompt("Please enter the team name that you want to join.", "Team++");
    var done = false;
    var rootref = firebase.database().ref("Team");

    while(!done){
        if (teamName == null || teamName == ""){
            alert("Cancelled");
            done = true;
        }
        else{
            //check if team name exist in database
            await teamExistInRef(rootref, teamName);

            if(!existTeam){
                teamName = prompt("Team does not exist, please enter another team name.");
            }
            else{
                await isInTeam(firebase.database().ref("Team/" + teamName + "/Members/"), userID);
                if(inTeam){
                    alert("You are already in " + teamName + ".");
                    done = true;
                }
                else{
                    var tref = firebase.database().ref("Team/" + teamName + "/teamSize");
                    await getTeamSize(tref);
                    tSize = tSize + 1;
                    tref.set(tSize);
                    var teamsref = rootref.child(teamName);
                    var userref = firebase.database().ref("Users/" + userID + "/Name");
                    await getUserName(userref);
                    teamsref.child("Members").child(userID).set([username, ""]);
                    firebase.database().ref('Users/' + userID + '/Teams/memberOf').child(teamName).set(teamName);
                    alert("You have joined " + teamName + ".");
                    done = true;
                }
            }
        }
    }
}

async function modifyAdmin(uid) {
    var userID = firebase.auth().currentUser.uid;
    //get team name
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    //get the name of user of next admin
    var userref = firebase.database().ref("Users/" + uid + "/Name");
    await getUserName(userref);
    var con = confirm("Are you sure to change admin of " + cuTeam + " to be " + username + "?");
    if(con) {
        firebase.database().ref("Team/" + cuTeam + "/admin").set(uid);
        firebase.database().ref("Team/" + cuTeam + "/Members/" + uid).set([username, "admin"]);
        userref = firebase.database().ref("Users/" + userID + "/Name");
        await getUserName(userref);
        firebase.database().ref("Team/" + cuTeam + "/Members/" + userID).set([username, ""]);
        firebase.database().ref('Users/' + userID + '/Teams/adminOf').child(cuTeam).remove();
        firebase.database().ref('Users/' + userID + '/Teams/memberOf').child(cuTeam).set(cuTeam);
        firebase.database().ref('Users/' + uid + '/Teams/adminOf').child(cuTeam).set(cuTeam);
        firebase.database().ref('Users/' + uid + '/Teams/memberOf').child(cuTeam).remove();
        alert("The admin of " + cuTeam + " has been changed to " + username + ".");
    }
    else alert("Canceled");
}

async function addMember() {
    var userID = firebase.auth().currentUser.uid;
    var email = prompt("Please enter the email of the user that you want to add", "1@1.com");
    var rootref = firebase.database().ref("Users");
    var done = false;

    //console.log(userID);
    //console.log(validUser);
    while(!done){
        if (email == null || email == ""){
            alert("Cancelled");
            done = true;
        }
        else{
            //check if team name exist in database
            await isUser(rootref, "email", email);

            if(!validUser){
                email = prompt("User does not exist, please enter another user email.");
            }
            else{
                //get the current team of admin
                var ref = firebase.database().ref("Users/" + userID + "/currTeam");
                await getCurrTeam(ref);
                //check if is already in team
                await isInTeam(firebase.database().ref("Team/" + cuTeam + "/Members/"), person);
                if(inTeam){
                    alert("The user you want to add is already in " + teamName + ".");
                    done = true;
                }
                else{
                    var teamref = firebase.database().ref("Team/" + cuTeam);
                    //update members field
                    var userref = firebase.database().ref("Users/" + person + "/Name");
                    await getUserName(userref);
                    teamref.child("Members").child(person).set([username, ""]);
                    //update team size
                    await getTeamSize(teamref.child("teamSize"));
                    tSize = tSize + 1;
                    teamref.child("teamSize").set(tSize);
                    //update added person's account
                    firebase.database().ref('Users/' + person + '/Teams/memberOf').child(cuTeam).set(cuTeam);
                    alert("You have added " + username + " to " + cuTeam + ".");
                    done = true;
                }
            }
        }
    }
}

async function removeMember(uid) {
    var userID = firebase.auth().currentUser.uid;
    //get team name
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    //get the name of user need to be removed
    var userref = firebase.database().ref("Users/" + uid + "/Name");
    await getUserName(userref);
    var con = confirm("Are you sure to remove " + username + " from " + cuTeam + "?");
    if(con) {
        firebase.database().ref("Team/" + cuTeam + "/Members/" + uid).remove();
        firebase.database().ref("Users/" + uid + "/Teams/memberOf/" + cuTeam).remove();
        alert("You have removed " + username + " from " + cuTeam + ".");
    }
    else alert("Canceled");
}

async function leaveTeam() {
    var userID = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    var con = confirm("Are you sure you do not want to be a member of " + cuTeam + "?");
    if(con) {
        console.log(cuTeam);
        firebase.database().ref("Users/" + userID + "/currTeam").set("");
        firebase.database().ref("Team/" + cuTeam + "/Members/" + userID).remove();
        firebase.database().ref("Users/" + userID + "/Teams/memberOf/" + cuTeam).remove();
        alert("You are no longer a member of " + cuTeam + ".");
    }
    else alert("Canceled");
}

function getTeamAdmin(){
    var userID = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("Users/" + userID + "/Teams/adminOf");
    ref.on("value", function(snapshot) {
        teamsAdmin = snapshot.val();
    });
}

function getTeamMem(){
    var userID = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("Users/" + userID + "/Teams/memberOf");
    ref.on("value", function(snapshot) {
        teamsMem = snapshot.val();
    });
}

async function assignRole(uid){
    //get the user name
    var userref = firebase.database().ref("Users/" + uid + "/Name");
    await getUserName(userref);
    var role = prompt("Please enter the of " + username + ".");
    firebase.database().ref("Team/" + cuTeam + "/Members/" + uid).set([username, role]);
}

function addDescription(){
    var info = prompt("Please enter a brief description of your team below.");
    //TODO write to html
/*
function createTeam() {
    var teamName = prompt("Please enter the team name", "Team++");
    var valid = true;
    var rootref = firebase.database().ref();
    var user = firebase.auth().currentUser;
    //TODO check if team name exist in database
    while (!valid && (teamName != null && teamName != "")) {
        teamName = prompt("Team name already taken, please enter another team name.");
    }
    if (teamName == null || teamName == ""){
        alert("Cancelled");
    }
    else{
        rootref.child('teams').child(teamName).child('teamSize').set(1);
        var teamsref = rootref.child('teams').child(teamName);
        teamsref.child('members').set(["Me",]);
        teamsref.child('description').set("");
        alert("You have created " + teamName + ".");
    }
}
function modifyAdmin() {
    var person = prompt("Please enter the email of the user of the future admin", "Gary");
    var valid = false;
    //TODO check if person exist in team
    while (!valid && (person != null && person != "")) {
        person = prompt("User is not in your team, please enter another email.");
    }
    if (person == null || person == ""){
        alert("Cancelled");
    }
    else{
        //TODO update database
        alert("You have changes " + person + " to be the admin of your team.");
    }
}
function addMember() {
    var person = prompt("Please enter the email of the user that you want to add", "Gary");
    var valid = true;
    //TODO check if person exist in database
    while (!valid && (person != null && person != "")) {
        person = prompt("User does not exist, please enter another email.");
    }
    if (person == null || person == ""){
        alert("Cancelled");
    }
    else{
        //TODO modify team members field for other team members and update database
        document.getElementById("members").value += " " + person;
        alert("You have added " + person + " to your team.");
    }
}
function joinTeam() {
    var teamName = prompt("Please enter the team name", "Team++");
    var valid = false;
    //TODO check if is a valid team
    while (!valid && (teamName != null && teamName != "")) {
        teamName = prompt("Team does not exist, please enter another team name.");
    }
    if (teamName == null || teamName == ""){
        alert("Cancelled");
    }
    else{
        //TODO modify team members field for other team members and update database
        alert("You have joined " + teamName + ".");
    }
}
function removeMember() {
    var person = prompt("Please enter the email of the user that you want to remove", "Gary");
    var valid = false;
    //TODO check if person exist in team
    while (!valid && (person != null && person != "")) {
        person = prompt("User is not in your team, please enter another email.");
    }
    if (person == null || person == ""){
        alert("Cancelled");
    }
    else{
        //TODO modify team members field for other team members and update database
        alert("You have removed " + person + " from your team.");
    }
}
function leaveTeam() {
    var con = confirm("Are you sure you want to leave this team?");
    var admin = true;
    if(con) {
        if (admin) {
            alert("Cannot leave team because you are the admin of this team.");
        }
        else {
            //TODO modify team members field for other team members and update database
            alert("You have left the team");
        }
    }
    else alert("Canceled");
*/
}

function signOut() {
    alert("We are now in signOut()!");
    setTimeout(function(){ alert("Hold"); }, 3000);
    firebase.auth().signOut();
}
>>>>>>> 377ce428b097ddf887cca37f6e6c569c88c7bd38
