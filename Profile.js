var myPassword = '********';
var myPicture =  'img/sample.png'
var root = firebase.database().ref();


window.onload = function () {
    var databaseName = root.child('Temporary Profile').child('User 1').child('Name');
    var databaseEmail = root.child('Temporary Profile').child('User 1').child('Email');
    var databasePhone = root.child('Temporary Profile').child('User 1').child('Phone');

    document.getElementById('Password').innerHTML= myPassword;
    document.getElementById('Pic').src= myPicture;

    databaseName.once('value', function(snapshot){
       var temp = snapshot.val();
       document.getElementById('NameText').innerHTML = temp.toString();
    });
    databaseEmail.once('value', function(snapshot){
        var temp = snapshot.val();
        document.getElementById('Email').innerHTML = temp.toString();
    });
    databasePhone.once('value', function(snapshot){
        var temp = snapshot.val();
        document.getElementById('Phone').innerHTML = temp.toString();
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
        root.child("Temporary Profile").child('User 1').child('Name').set(otherName.toString());

    }
}

function nameCancel(){
    var databaseName = root.child('Temporary Profile').child('User 1').child('Name');
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
    var databasePassword =  root.child("Temporary Profile").child('User 1').child('Password');
    databasePassword.once('value', function (snapshot) {
        databasePassword = snapshot.val();
        if(databasePassword !== curPassword){
            alert('Your current password is incorrect. Please Try Again');
        }
        else if(newPassword2 !== newPassword1){
            alert('The confirm password does not match the new password. Please try again');
        }
        else{
            alert('You have successfully changed your password');
            root.child("Temporary Profile").child('User 1').child('Password').set(newPassword1.toString());
            donePasswordEdit();
        }
    });
    if(curPassword == '' || newPassword1 == '' || newPassword1 == '' ){
        alert("Password Field Is Missing !!");
        return false;
    }

}

function passwordCancel(){
    document.getElementById('Password').innerHTML= myPassword.toString();
    donePasswordEdit();
}


function emailSave() {
    var otherEmail = document.getElementById('newEmail').value;
    if(otherEmail == ''){
        alert("Name Field Is Missing !!");
    }
    else {
        document.getElementById('Email').innerHTML = otherEmail.toString();
        doneEmailEdit();
        root.child("Temporary Profile").child('User 1').child('Email').set(otherEmail.toString());
    }
}

function emailCancel(){
    var databaseEmail = root.child('Temporary Profile').child('User 1').child('Email');
    databaseEmail.once('value', function(snapshot){
        var temp = snapshot.val();
        document.getElementById('Email').innerHTML = temp.toString();
    });
    doneEmailEdit();
}

function phoneSave(){
    var otherPhone = document.getElementById('newPhone').value;
    if(otherPhone == ''){
        alert("Phone Field Is Missing !!");
    }
    else{
        document.getElementById('Phone').innerHTML = otherPhone.toString();
        donePhoneEdit();
        root.child("Temporary Profile").child('User 1').child('Phone').set(otherPhone.toString());
    }
}

function phoneCancel(){
    var databasePhone = root.child('Temporary Profile').child('User 1').child('Phone');
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

function picChange(){
    var newProfile = document.getElementById('addProfilePic').value;
    document.getElementById('Pic').src = newProfile.toString();
}



