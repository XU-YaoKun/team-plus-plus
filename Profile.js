var myName ='John Doe';
var myEmail ='XXX@UCSD.EDU';
var myPhone ='###-###-####';
var myPassword = '********';

window.onload = function () {

    document.getElementById('NameText').innerHTML= myName.toString();
    document.getElementById('Email').innerHTML= myEmail.toString();
    document.getElementById('Phone').innerHTML= myPhone.toString();
    document.getElementById('Password').innerHTML = myPassword.toString();

    document.getElementById('nameSave').hidden=true;
    document.getElementById('nameCancel').hidden=true;
    document.getElementById('emailSave').hidden=true;
    document.getElementById('emailCancel').hidden=true;
    document.getElementById('phoneSave').hidden=true;
    document.getElementById('phoneCancel').hidden=true;
    document.getElementById('passwordSave').hidden=true;
    document.getElementById('passwordCancel').hidden=true;
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
    temp.style = "display : none";
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
        '<input id="newPhone" type = "tel", placeholder="Insert Your Phone">';
    document.getElementById('phoneEdit').hidden=true;
    document.getElementById('phoneSave').hidden=false;
    document.getElementById('phoneCancel').hidden=false;
}

function nameSave(){
    var otherName = document.getElementById('newName').value;
    if(/^\s+$/.test(otherName) || otherName==''){
        alert("Invalid Input!! Please Try Again")
    }
    else {
        document.getElementById('NameText').innerHTML = otherName.toString();
        doneNameEdit();
    }
}

function nameCancel(){
    document.getElementById('NameText').innerHTML= myName.toString();
    doneNameEdit();
}

function passwordSave(){
    var curPassword = document.getElementById('currentPW').value;
    var newPassword1 = document.getElementById('newPW').value;
    var newPassword2 = document.getElementById('reenterPW').value;
    if(curPassword == '' || newPassword1 == '' || newPassword1 == '' ){
        alert("Invalid Input!! Please Try Again");
    }
    else if(newPassword1 == newPassword2){
        donePasswordEdit();
        alert("You have successfully changed your password");
        document.getElementById('Password').innerHTML= myPassword.toString();
    }
    else{
        alert("You have re-entered your password incorrectly");
    }
}

function passwordCancel(){
    document.getElementById('Password').innerHTML= myPassword.toString();
    donePasswordEdit();
}


function emailSave() {
    var otherEmail = document.getElementById('newEmail').value;
    if(otherEmail == ''){
        alert("Invalid Input!! Please Try Again");
    }
    else {
        document.getElementById('Email').innerHTML = otherEmail.toString();
        doneEmailEdit();
    }
}

function emailCancel(){
    document.getElementById('Email').innerHTML= myEmail.toString();
    doneEmailEdit();
}

function phoneSave(){
    var otherPhone = document.getElementById('newPhone').value;
    if(otherPhone == ''){
        alert("Invalid Input!! Please Try Again");
    }
    else{
        document.getElementById('Phone').innerHTML = otherPhone.toString();
        donePhoneEdit();
    }
}

function phoneCancel(){
    document.getElementById('Phone').innerHTML= myPhone.toString();
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

function picOnHover(){
    document.getElementById('editPicture').style = '';

}

function picOffHover(){
   if(document.getElementById('editPicture').onmouseover == ''){
       document.getElementById('editPicture').style = 'display: none';
   }

}


