var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");

function submitClick(){

	var firebaseRef = firebase.database().ref();

	firebaseRef.child("Text").set("Some value");

}