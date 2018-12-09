var root = firebase.database().ref();
var teamId;
var userId;
var tSize;
var adminId;
var currentTeam;

var Yid = new Array();
for (var i = 0; i < 7; i++) {
  Yid[i] = new Array(i);
  for (var j = 0; j < 11; j++) {
    if (j == 10) {
      Yid[i][j] = i.toString() + "X";
      // root.child('Team').child(teamId).child('Schedule').child('eventList').child('eventId').child('teamAvailability').child(Yid[i][j]).set(0);
      break;
    }
    Yid[i][j] = i.toString() + j.toString();
    // root.child('Team').child(teamId).child('Schedule').child('eventList').child('eventId').child('teamAvailability').child(Yid[i][j]).set(0);
  }
}

var Tid = new Array();
for (var i = 0; i < 7; i++) {
  Tid[i] = new Array(i);
  for (var j = 0; j < 11; j++) {
    if (j == 10) {
      Tid[i][j] = "T" + i.toString() + "X";
      break;
    }
    Tid[i][j] = "T" + i.toString() + j.toString();
  }
}

// get userId from database
firebase.auth().onAuthStateChanged(async function(user) {
  // User is signed in: set userId and teamId
  if (user) {
    userId = user.uid;
    console.log("Hello " + user.uid);
    var ref = firebase.database().ref("Users/" + userId);
    await loadTeamId(ref);
    var ref_tSize = firebase.database().ref("Team/" + teamId);
    await loadTeamSize(ref_tSize);
    // Check values
    console.log("userId has been set: " + userId);
    console.log("teamId has been set: " + teamId);
    console.log("teamSize has been set: " + tSize);

    // window.onload = function () {
    // update Your availability for each grid from database
    updateAvailability();

    updateTeamAvailability();

    // }
  }
  // No user is signed in.
  else {
  }
});

// get teamId from database
async function loadTeamId(ref) {
  return ref.once("value").then(function(snapshot) {
    //console.log(snapshot.val())
    teamId = snapshot.val().currTeam;
  });
}
async function loadTeamSize(ref) {
  return ref.once("value").then(function(snapshot) {
    //console.log(snapshot.val())
    tSize = snapshot.val().teamSize;
  });
}

// window.onload = function () {
//     // update Your availability for each grid from database
//     updateAvailability();
//
//     updateTeamAvailability();
//
// }
// only used for test
function submitClick() {
  var firebaseRef = firebase.database().ref();

  firebaseRef.child("Text").set("Some value");
}

// onClick function for each grid
// change color of grid, change Your Availability status in database, add/minus teamAvailability in database
function f(e) {
  var T = document.getElementById("T" + e.id);

  if (e.style.background == "rgb(255, 222, 222)") {
    e.style.background = "rgb(51, 153, 0)";
    root
      .child("Team")
      .child(teamId)
      .child("Schedule")
      .child("eventList")
      .child("eventId")
      .child(userId)
      .child("availability")
      .child(e.id)
      .set(true);

    var teamRef = firebase
      .database()
      .ref(
        "Team/" +
          teamId +
          "/Schedule/eventList/eventId/teamAvailability/" +
          e.id
      );
    var num;

    //console.log(str);

    teamRef.once("value").then(function(snapshot) {
      //console.log(snapshot.val())

      num = snapshot.val();
      num += 1;
      console.log(num);
      teamRef.set(num);
    });
  } else {
    e.style.background = "rgb(255, 222, 222)";
    root
      .child("Team")
      .child(teamId)
      .child("Schedule")
      .child("eventList")
      .child("eventId")
      .child(userId)
      .child("availability")
      .child(e.id)
      .set(false);
    var teamRef = firebase
      .database()
      .ref(
        "Team/" +
          teamId +
          "/Schedule/eventList/eventId/teamAvailability/" +
          e.id
      );
    var num;

    //console.log(str);

    teamRef.once("value").then(function(snapshot) {
      //console.log(snapshot.val())

      num = snapshot.val();
      num -= 1;
      console.log(num);
      teamRef.set(num);
    });
  }
}

function updateAvailability() {
  // database reference for each grid (tried to use for loops and a 2-D array to simplify but failed)
  var Y00 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][0]
    );
  var Y10 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][0]
    );
  var Y20 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][0]
    );
  var Y30 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][0]
    );
  var Y40 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][0]
    );
  var Y50 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][0]
    );
  var Y60 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][0]
    );
  var Y01 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][1]
    );
  var Y11 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][1]
    );
  var Y21 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][1]
    );
  var Y31 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][1]
    );
  var Y41 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][1]
    );
  var Y51 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][1]
    );
  var Y61 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][1]
    );
  var Y02 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][2]
    );
  var Y12 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][2]
    );
  var Y22 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][2]
    );
  var Y32 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][2]
    );
  var Y42 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][2]
    );
  var Y52 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][2]
    );
  var Y62 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][2]
    );
  var Y03 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][3]
    );
  var Y13 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][3]
    );
  var Y23 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][3]
    );
  var Y33 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][3]
    );
  var Y43 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][3]
    );
  var Y53 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][3]
    );
  var Y63 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][3]
    );
  var Y04 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][4]
    );
  var Y14 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][4]
    );
  var Y24 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][4]
    );
  var Y34 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][4]
    );
  var Y44 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][4]
    );
  var Y54 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][4]
    );
  var Y64 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][4]
    );
  var Y05 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][5]
    );
  var Y15 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][5]
    );
  var Y25 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][5]
    );
  var Y35 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][5]
    );
  var Y45 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][5]
    );
  var Y55 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][5]
    );
  var Y65 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][5]
    );
  var Y06 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][6]
    );
  var Y16 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][6]
    );
  var Y26 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][6]
    );
  var Y36 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][6]
    );
  var Y46 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][6]
    );
  var Y56 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][6]
    );
  var Y66 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][6]
    );
  var Y07 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][7]
    );
  var Y17 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][7]
    );
  var Y27 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][7]
    );
  var Y37 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][7]
    );
  var Y47 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][7]
    );
  var Y57 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][7]
    );
  var Y67 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][7]
    );
  var Y08 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][8]
    );
  var Y18 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][8]
    );
  var Y28 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][8]
    );
  var Y38 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][8]
    );
  var Y48 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][8]
    );
  var Y58 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][8]
    );
  var Y68 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][8]
    );
  var Y09 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][9]
    );
  var Y19 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][9]
    );
  var Y29 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][9]
    );
  var Y39 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][9]
    );
  var Y49 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][9]
    );
  var Y59 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][9]
    );
  var Y69 = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][9]
    );
  var Y0X = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[0][10]
    );
  var Y1X = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[1][10]
    );
  var Y2X = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[2][10]
    );
  var Y3X = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[3][10]
    );
  var Y4X = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[4][10]
    );
  var Y5X = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[5][10]
    );
  var Y6X = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/" +
        userId +
        "/availability/" +
        Yid[6][10]
    );
  console.log("test Your" + teamId);

  // update the color of each grid based on the status in database(also tried to use for loops and 2-D array but failed)
  Y00.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][0]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][0]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y10.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][0]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][0]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y20.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][0]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][0]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y30.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][0]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][0]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y40.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][0]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][0]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y50.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][0]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][0]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y60.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][0]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][0]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y01.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][1]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][1]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y11.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][1]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][1]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y21.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][1]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][1]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y31.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][1]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][1]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y41.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][1]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][1]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y51.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][1]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][1]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y61.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][1]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][1]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y02.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][2]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][2]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y12.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][2]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][2]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y22.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][2]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][2]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y32.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][2]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][2]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y42.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][2]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][2]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y52.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][2]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][2]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y62.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][2]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][2]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y03.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][3]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][3]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y13.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][3]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][3]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y23.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][3]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][3]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y33.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][3]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][3]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y43.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][3]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][3]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y53.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][3]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][3]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y63.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][3]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][3]).style.background =
        "rgb(255, 222, 222)";
    }
  });
  Y04.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][4]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][4]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y14.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][4]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][4]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y24.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][4]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][4]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y34.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][4]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][4]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y44.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][4]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][4]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y54.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][4]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][4]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y64.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][4]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][4]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y05.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][5]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][5]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y15.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][5]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][5]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y25.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][5]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][5]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y35.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][5]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][5]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y45.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][5]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][5]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y55.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][5]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][5]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y65.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][5]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][5]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y06.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][6]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][6]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y16.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][6]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][6]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y26.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][6]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][6]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y36.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][6]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][6]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y46.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][6]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][6]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y56.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][6]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][6]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y66.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][6]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][6]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y07.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][7]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][7]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y17.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][7]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][7]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y27.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][7]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][7]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y37.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][7]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][7]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y47.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][7]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][7]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y57.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][7]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][7]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y67.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][7]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][7]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y08.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][8]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][8]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y18.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][8]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][8]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y28.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][8]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][8]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y38.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][8]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][8]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y48.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][8]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][8]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y58.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][8]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][8]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y68.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][8]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][8]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y09.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][9]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][9]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y19.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][9]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][9]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y29.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][9]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][9]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y39.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][9]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][9]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y49.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][9]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][9]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y59.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][9]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][9]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y69.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][9]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][9]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y0X.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[0][10]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[0][10]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y1X.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == true) {
      document.getElementById(Yid[1][10]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[1][10]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y2X.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[2][10]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[2][10]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y3X.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[3][10]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[3][10]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y4X.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[4][10]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[4][10]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y5X.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[5][10]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[5][10]).style.background =
        "rgb(255, 222, 222)";
    }
  });

  Y6X.once("value", function(snapshot) {
    var temp = snapshot.val();

    if (temp == true) {
      document.getElementById(Yid[6][10]).style.background = "rgb(51, 153, 0)";
    }
    if (temp == false) {
      document.getElementById(Yid[6][10]).style.background =
        "rgb(255, 222, 222)";
    }
  });
}

function updateTeamAvailability() {
  console.log("test Team");
  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][0]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][0]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][0]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][0]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][0]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][0]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][0]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][0]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][0]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][0]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][0]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][0]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][0]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][0]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][1]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][1]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][1]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][1]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][1]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][1]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][1]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][1]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][1]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][1]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][1]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][1]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][1]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][1]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][2]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][2]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][3]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][3]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][3]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][3]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][3]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][3]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][3]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][3]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][3]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][3]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][3]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][3]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][3]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][3]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][4]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][4]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][4]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][4]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][4]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][4]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][4]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][4]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][4]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][4]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][4]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][4]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][4]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][4]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][5]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][5]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][5]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][5]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][5]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][5]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][5]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][5]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][5]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][5]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][5]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][5]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][5]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][5]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][6]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][6]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][6]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][6]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][6]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][6]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][6]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][6]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][6]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][6]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][6]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][6]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][6]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][6]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][7]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][7]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][7]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][7]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][7]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][7]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][7]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][7]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][7]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][7]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][7]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][7]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][7]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][7]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][8]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][8]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][8]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][8]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][8]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][8]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][8]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][8]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][8]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][8]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][8]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][8]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][8]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][8]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][9]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][9]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][9]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][9]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][9]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][9]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][9]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][9]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][9]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][9]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][9]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][9]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][9]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][9]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[0][10]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[0][10]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[1][10]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[1][10]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[2][10]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[2][10]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[3][10]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[3][10]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[4][10]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[4][10]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[5][10]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[5][10]).style.background = "rgb(51, 153, 0)";
    }
  });

  var Ref = firebase
    .database()
    .ref(
      "Team/" +
        teamId +
        "/Schedule/eventList/eventId/teamAvailability/" +
        Yid[6][10]
    );
  Ref.once("value", function(snapshot) {
    var temp = snapshot.val();
    if (temp == tSize) {
      document.getElementById(Tid[6][10]).style.background = "rgb(51, 153, 0)";
    }
  });
}

async function getCurrTeam(ref){
  return ref.once('value').then(function(snapshot){
      currentTeam = snapshot.val();
      console.log(currentTeam);
  });
}

async function getAdminID(ref){
  return ref.once('value').then(function(snapshot){
    adminId = snapshot.val();
    console.log(adminId);
  })
}

async function changeView(){
  var item = document.getElementById("move");
  var ref = firebase.database().ref("Users/" + userId + "/currTeam");
  await getCurrTeam(ref);
  var aRef = firebase.database().ref("Team/" + currentTeam + "/admin");
  await getAdminID(aRef);
  if(adminId == userId){
    console.log("Should not be printed");
    item.href = "HomePage.html";
  }
  else{
    item.href = "HomePageMem.html";
    console.log("Should be printed");
  } 

}