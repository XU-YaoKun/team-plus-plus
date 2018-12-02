var myPassword = '*******';
var storage = firebase.storage().ref();
var root = firebase.database().ref('Users');
var userId;
var currentUser;


window.onload = function () {

    firebase.auth().onAuthStateChanged(function(user){
        // User is signed in: set userId and teamId
        if (user){
            userId = user.uid;
            currentUser = user;

            // Check values
            console.log("userId has been set: "+ userId);

            updateName();
            updatePhone();
            updateEmail();
            updatePicture();
            document.getElementById('Password').innerHTML = myPassword.toString();
        }
        // No user is signed in.
        else{
            console.log('User is not logged in. !!')
        }
    });
}

function nameChange(){
    document.getElementById('NameText').innerHTML=
        '<input id="newName" type="text" placeholder="Insert Your Name" >';
    document.getElementById('nameEdit').hidden=true;
    document.getElementById('nameSave').hidden=false;
    document.getElementById('nameCancel').hidden=false;
}

function passwordChange(){
    var temp = document.getElementById('PasswordRow');
    temp.style = "display: none";
    document.getElementById('curPassword').style = '';
    document.getElementById('newPassword').style = '';
    document.getElementById('re-enterPW').style = '';
    document.getElementById('passwordSave').hidden = false;
    document.getElementById('passwordCancel').hidden = false;
    document.getElementById('currentPW').value = '';
    document.getElementById('newPW').value = '';
    document.getElementById('reenterPW').value = '';
}

function emailChange(){
    document.getElementById('Email').innerHTML=
        '<input id="newEmail" type="email" placeholder="Insert Your Email" >'
    document.getElementById('emailEdit').hidden=true;
    document.getElementById('emailSave').hidden=false;
    document.getElementById('emailCancel').hidden=false;
}

function phoneChange(){
    document.getElementById('Phone').innerHTML=
        '<input id="newPhone" type="tel" , placeholder="Insert Your Phone">';
    document.getElementById('phoneEdit').hidden=true;
    document.getElementById('phoneSave').hidden=false;
    document.getElementById('phoneCancel').hidden=false;
}

function nameSave(){
    var otherName = document.getElementById('newName').value;
    if(/^\s+$/.test(otherName) || otherName==''){
        alert("Name Field Is Missing !!")
    }
    else {
        document.getElementById('NameText').innerHTML = otherName.toString();
        doneNameEdit();
        root.child(userId).child('Name').set(otherName.toString())

    }
}

function nameCancel(){
    var databaseName = root.child(userId).child('Name');
    databaseName.once('value', function(snapshot){
        var temp = snapshot.val();
        document.getElementById('NameText').innerHTML = temp.toString();
    });
    doneNameEdit();
}

function passwordSave(){
    var curPassword = document.getElementById('currentPW').value;
    var newPassword1 = document.getElementById('newPW').value;
    var newPassword2 = document.getElementById('reenterPW').value;
    var databasePassword =  root.child(userId).child('Password');

    if(curPassword == '' || newPassword1 == '' || newPassword1 == '' ){
        alert("Password Field Is Missing !!");
        return false;
    }
    else if(newPassword1.length < '4'){
        alert('Your new password is not long enough! Please enter a new password !')
        return false;
    }
    databasePassword.once('value', function (snapshot) {
        databasePassword = snapshot.val();
        if(databasePassword !== curPassword){
            alert('Your current password is incorrect. Please Try Again');
        }
        else if(newPassword2 !== newPassword1){
            alert('The confirm password does not match the new password. Please try again');
        }
        else{
            currentUser.updatePassword(newPassword1).then(function () {
                alert('You have successfully changed your password');
                root.child(userId).child('Password').set(newPassword1.toString());
                donePasswordEdit();
            }).catch(function (error) {
                alert('An error has occurred. Please try again')
            })
        }
    });

}

function passwordCancel(){
    document.getElementById('Password').innerHTML= myPassword.toString();
    donePasswordEdit();
}


function emailSave() {

    var otherEmail = document.getElementById('newEmail').value;
    if(otherEmail == '' || /^\s+$/.test(otherEmail)){
        alert("Name Field Is Missing !!");
    }
    else if(!(otherEmail.includes('@') && otherEmail.includes('.'))){
        alert('Your email is invalid !!')
    }
    else {
        document.getElementById('Email').innerHTML = otherEmail.toString();
        doneEmailEdit();
        root.child(userId).child('Email').set(otherEmail.toString());
    }
}

function emailCancel(){

    var databaseEmail = root.child(userId).child('Email');
    databaseEmail.once('value', function(snapshot){
        var temp = snapshot.val();
        document.getElementById('Email').innerHTML = temp.toString();
    });
    doneEmailEdit();
}

function phoneSave(){
    var otherPhone = document.getElementById('newPhone').value;
    if(otherPhone == '' || /^\s+$/.test(otherPhone)){
        alert("Phone Field Is Missing !!");
    }
    else if(!(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(otherPhone))){
        alert("The phone number is invalid !!")
    }
    else{
        document.getElementById('Phone').innerHTML = otherPhone.toString();
        donePhoneEdit();
        root.child(userId).child('Phone').set(otherPhone.toString())
    }
}

function phoneCancel(){
    var databasePhone = root.child(userId).child('Phone');
    databasePhone.once('value', function(snapshot){
        var temp = snapshot.val();
        document.getElementById('Phone').innerHTML = temp.toString();
    });
    donePhoneEdit();
}

function doneNameEdit(){
    document.getElementById('nameEdit').hidden=false;
    document.getElementById('nameSave').hidden=true;
    document.getElementById('nameCancel').hidden=true;
}

function doneEmailEdit(){
    document.getElementById('emailEdit').hidden=false;
    document.getElementById('emailSave').hidden=true;
    document.getElementById('emailCancel').hidden=true;
}

function donePhoneEdit() {
    document.getElementById('phoneEdit').hidden=false;
    document.getElementById('phoneSave').hidden=true;
    document.getElementById('phoneCancel').hidden=true;

}

function donePasswordEdit(){
    document.getElementById('passwordEdit').hidden=false;
    document.getElementById('passwordSave').hidden=true;
    document.getElementById('passwordCancel').hidden=true;
    document.getElementById('curPassword').style = 'display : none';
    document.getElementById('newPassword').style = 'display : none';
    document.getElementById('re-enterPW').style = 'display : none';
    document.getElementById('PasswordRow').style = '';
}

var fileUpload = document.getElementById('upload');

fileUpload.addEventListener('change', function(e){
    var file = e.target.files[0];
    var databaseStorage = firebase.storage().ref().child(userId);
    databaseStorage.put(file);
    var reader = new FileReader();
    reader.onload = function(){
        var image = reader.result;
        document.getElementById('Pic').src = image;
        //document.getElementById('icon').src = image;
    }
    reader.readAsDataURL(file);
})

async function updatePicture() {
    var databaseStorage = firebase.storage().ref().child(userId);
    databaseStorage.getDownloadURL().then(function(url){
        document.getElementById('Pic').src = url;
       // document.getElementById('icon').src = url;
    }).catch(function(error){
        document.getElementById('Pic').src = 'img/sample.png'
    });
}

async function updateName(){
    var databaseName = root.child(userId);
    databaseName.once('value', function (snapshot) {
        if(!snapshot.hasChild('Name')){
            databaseName.child('Name').set('')
        }
        else{
            databaseName.child('Name').once('value', function (snapshot) {
                var temp = snapshot.val();
                document.getElementById('NameText').innerHTML = temp.toString();
            })
        }
    })

}

async function updatePhone() {
    console.log('TEST PASSED')
    var databasePhone = root.child(userId);
    databasePhone.once('value', function (snapshot) {
        if(!snapshot.hasChild('Phone')){
            databasePhone.child('Phone').set('')
        }
        else{
            databasePhone.child('Phone').once('value', function (snapshot) {
                var temp = snapshot.val();
                document.getElementById('Phone').innerHTML = temp.toString();
            })
        }
    })

}

async function updateEmail() {
    console.log('TEST PASSED')
    var databaseEmail = root.child(userId);
    databaseEmail.once('value', function (snapshot) {
        if(!snapshot.hasChild('Email')){
            databaseEmail.child('Email').set('')
        }
        else{
            databaseEmail.child('Email').once('value', function (snapshot) {
                var temp = snapshot.val();
                document.getElementById('Email').innerHTML = temp.toString();
            })
        }
    })
}


