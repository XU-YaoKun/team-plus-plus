function createTeam() {
    var teamName = prompt("Please enter the team name", "Team++");
    var valid = false;
    //TODO check if team name exist in database
    while (!valid && (teamName != null && teamName != "")) {
        teamName = prompt("Team name already taken, please enter another team name.")
    }
    if (teamName == null || teamName == ""){
        alert("Cancelled")
    }
    else{
        alert("You have created " + teamName + ".")
    }
}

function modifyAdmin() {
    var person = prompt("Please enter the email of the user of the future admin", "Gary");
    var valid = false;
    //TODO check if person exist in team
    while (!valid && (person != null && person != "")) {
        person = prompt("User is not in your team, please enter another email.")
    }
    if (person == null || person == ""){
        alert("Cancelled")
    }
    else{
        //TODO update database
        alert("You have changes " + person + " to be the admin of your team.")
    }
}

function addMember() {
    var person = prompt("Please enter the email of the user that you want to add", "Gary");
    var valid = true;
    //TODO check if person exist in database
    while (!valid && (person != null && person != "")) {
        person = prompt("User does not exist, please enter another email.")
    }
    if (person == null || person == ""){
        alert("Cancelled")
    }
    else{
        //TODO modify team members field for other team members and update database
        document.getElementById("members").value += " " + person;
        alert("You have added " + person + " to your team.")
    }
}

function joinTeam() {
    var teamName = prompt("Please enter the team name", "Team++");
    var valid = false;
    //TODO check if is a valid team
    while (!valid && (teamName != null && teamName != "")) {
        teamName = prompt("Team does not exist, please enter another team name.")
    }
    if (teamName == null || teamName == ""){
        alert("Cancelled")
    }
    else{
        //TODO modify team members field for other team members and update database
        alert("You have joined " + teamName + ".")
    }
}

function removeMember() {
    var person = prompt("Please enter the email of the user that you want to remove", "Gary");
    var valid = false;
    //TODO check if person exist in team
    while (!valid && (person != null && person != "")) {
        person = prompt("User is not in your team, please enter another email.")
    }
    if (person == null || person == ""){
        alert("Cancelled")
    }
    else{
        //TODO modify team members field for other team members and update database
        alert("You have removed " + person + " from your team.")
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
}