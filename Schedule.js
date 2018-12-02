var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");

function submitClick(){

	var firebaseRef = firebase.database().ref();

	firebaseRef.child("Text").set("Some value");

}

function f(e) {

    // var userId = firebase.auth().currentUser.uid;
    // window.alert(userId);
	var T = document.getElementById("T" + e.id);
    //var firebaseRef = firebase.database().ref('Team/' + teamId + '/Schedule/eventList/' + eventId + '/' + userId + '/availability');

    //var firebaseRef = firebase.database().ref('Team/Team1/Schedule/eventList/eventId/' + userId + '/availability');

    //firebaseRef.child("0:").set(e.data-col);
    //window.alert("TEST");
    //window.alert(e.data-col);

    if(e.style.background=='rgb(255, 222, 222)')
    {
        e.style.background = "rgb(51, 153, 0)";
    }
    else
    {
        e.style.background = "rgb(255, 222, 222)";
    }

    if(T.style.background=='rgb(255, 255, 255)')
    {
        T.style.background = "rgb(51, 153, 0)";
    }
    else
    {
        T.style.background = "rgb(255, 255, 255)";
    }
}