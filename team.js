
var existTeam = false;
var tSize = 0;
var person = null;
var inTeam = false;
var cuTeam = null;
var validUser = false;
var username = null;

var userID = null;
var description = "Not defined";

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

async function isInTeam(ref, data) {
  return ref.child(data).once("value", function (snapshot) {
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
    .once("value", function (snapshot) {
      if (snapshot.exists()) {
        console.log("valid user");
        validUser = true;
        snapshot.forEach(function (data) {
          person = data.key;
        });
      } else {
        console.log("not valid user");
        validUser = false;
      }
    });
}

async function getTeamSize(ref) {
  return ref.once("value").then(function (snapshot) {
    tSize = snapshot.val();
  });
}

async function getCurrTeam(ref) {
  return ref.once("value").then(function (snapshot) {
    cuTeam = snapshot.val();
  });
}

async function getUserName(ref) {
  return ref.once("value").then(function (snapshot) {
    username = snapshot.val();
  });
}

async function getTeamDes(ref){
    return ref.once('value').then(function(snapshot){
        description = snapshot.val();
    });
}

async function createTeam() {

    var teamName = prompt("Please enter the team name.");
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
                location.reload();
            }
        }
    }
  }
}

async function joinTeam() {

    var teamName = prompt("Please enter the team name that you want to join.");
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
                    location.reload();
                }
            }

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
        window.location="team.html";
    }
    else alert("Canceled");
}

async function addMember() {
    var email = prompt("Please enter the email of the user that you want to add.");
    var rootref = firebase.database().ref("Users");
    var done = false;

    while(!done){
        if (email == null || email == ""){
            alert("Cancelled");
            done = true;
        }
        else{
            //check if team name exist in database
            await isUser(rootref, "Email", email);

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
                    alert("The user you want to add is already in " + cuTeam + ".");
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
                    location.reload();
                }
            }

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
    var con = confirm("Are you sure to remove " + username + " from " + cuTeam + "?");
    if(con) {
        firebase.database().ref("Team/" + cuTeam + "/Members/" + uid).remove();
        firebase.database().ref("Users/" + uid + "/Teams/memberOf/" + cuTeam).remove();
        var tref = firebase.database().ref("Team/" + cuTeam + "/teamSize");
        await getTeamSize(tref);
        tSize = tSize - 1;
        tref.set(tSize);
        alert("You have removed " + username + " from " + cuTeam + ".");
        location.reload();
    }
    else alert("Cancelled");
}

async function leaveTeam() {
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    var con = confirm("Are you sure you do not want to be a member of " + cuTeam + "?");
    if(con) {
        console.log(cuTeam);
        firebase.database().ref("Users/" + userID + "/currTeam").set("");
        firebase.database().ref("Team/" + cuTeam + "/Members/" + userID).remove();
        firebase.database().ref("Users/" + userID + "/Teams/memberOf/" + cuTeam).remove();
        var tref = firebase.database().ref("Team/" + cuTeam + "/teamSize");
        await getTeamSize(tref);
        tSize = tSize - 1;
        tref.set(tSize);
        alert("You are no longer a member of " + cuTeam + ".");
        window.location="team.html";
    }
    else alert("Cancelled");
}


async function assignRole(uid){
    //get the user name
    var userref = firebase.database().ref("Users/" + uid + "/Name");
    await getUserName(userref);
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    var role = prompt("Please enter the role of " + username + ".");
    firebase.database().ref("Team/" + cuTeam + "/Members/" + uid).set([username, role]);
    location.reload();
}

async function addDescription(){
    var info = prompt("Please enter a brief description of your team below.");
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    firebase.database().ref("Team/" + cuTeam + "/description").set(info);
    document.getElementById('descriptionBox').innerHTML = info.toString();
}


async function updateView() {
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    document.getElementById('teamName').innerText = "You are in: " + cuTeam;
    var tref = firebase.database().ref("Team/" + cuTeam + "/Members");
    var members = document.getElementById('allMem');

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
        if(id != userID){
            var td3 = document.createElement("td");
            var button1 = document.createElement("button");
            button1.className = "btn btn-success btn-lg btn-block";
            button1.type = "button";
            button1.addEventListener("click", function () {
                assignRole(id);
            });
            button1.innerText = "Assign Role";

            var td4 = document.createElement("td");
            var button2 = document.createElement("button");
            button2.className = "btn btn-success btn-lg btn-block";
            button2.type = "button";
            button2.addEventListener("click", function () {
                modifyAdmin(id);
            });
            button2.innerText = "Change to Admin";

            var td5 = document.createElement("td");
            var button3 = document.createElement("button");
            button3.className = "btn btn-success btn-lg btn-block";
            button3.type = "button";
            button3.addEventListener("click", function () {
                removeMember(id);
            });
            button3.innerText = "Delete";
            td3.appendChild(button1);
            td4.appendChild(button2);
            td5.appendChild(button3);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
        }
        else{
            var td3 = document.createElement("td");
            td3.innerText = "You are the Admin";
            var td4 = document.createElement("td");
            td4.innerText = "You are the Admin";
            var td5 = document.createElement("td");
            td5.innerText = "You are the Admin";

            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
        }
        members.appendChild(tr);
    });
}

async function updateViewMem() {
    var ref = firebase.database().ref("Users/" + userID + "/currTeam");
    await getCurrTeam(ref);
    document.getElementById('teamName').innerText = "You are in: " + cuTeam;
    var dref = firebase.database().ref("Team/" + cuTeam + "/description");
    await getTeamDes(dref);
    document.getElementById('teamDes').innerText = "Team Description: " + description;
    var tref = firebase.database().ref("Team/" + cuTeam + "/Members");
    var members = document.getElementById('allMem');

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
}

async function updateAdminList() {
    var adminRef = firebase.database().ref("Users/" + userID + "/Teams/adminOf");
    await getCurrTeam(adminRef);
    var adminT = document.getElementById('admin');
    var count = 1;
    adminRef.on("child_added", snapshot => {
        var teamName = snapshot.val();

        var tr = document.createElement("tr");
        tr.className = teamName;
        var td1 = document.createElement("td");
        td1.className = "serial";
        td1.innerText = count.toString() + ".";
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var span = document.createElement("span");
        span.className = "teamName";
        span.innerText = teamName;
        var button = document.createElement("button");
        button.className = "btn btn-success btn-lg btn-block";
        button.type = "button";
        button.addEventListener("click", function () {
            redirectAdmin(teamName)
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

async function updateMemList(){
    var memRef = firebase.database().ref("Users/" + userID + "/Teams/memberOf");
    await getCurrTeam(memRef);
    var memT = document.getElementById('member');
    var count = 1;
    memRef.on("child_added", snapshot => {
        var teamName = snapshot.val();

        var tr = document.createElement("tr");
        tr.className = teamName;
        var td1 = document.createElement("td");
        td1.className = "serial";
        td1.innerText = count.toString() + ".";
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var span = document.createElement("span");
        span.className = "teamName";
        span.innerText = teamName;
        var button = document.createElement("button");
        button.className = "btn btn-success btn-lg btn-block";
        button.type = "button";
        button.addEventListener("click", function () {
            redirectMem(teamName)
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

function redirectAdmin(currentTeam){
    var userID = firebase.auth().currentUser.uid;
    firebase.database().ref("Users/" + userID + "/currTeam").set(currentTeam);
    window.location="HomePage.html";
}

function redirectMem(currentTeam){
    var userID = firebase.auth().currentUser.uid;
    firebase.database().ref("Users/" + userID + "/currTeam").set(currentTeam);
    window.location="HomePageMem.html";
}

