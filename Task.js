var config = {
  apiKey: "AIzaSyCDwFS1dxv0WWEbgehMdtsIQ3F_WQlKDnE",
  authDomain: "team-plus-plus.firebaseapp.com",
  databaseURL: "https://team-plus-plus.firebaseio.com",
  projectId: "team-plus-plus",
  storageBucket: "team-plus-plus.appspot.com",
  messagingSenderId: "836611996730"
};
firebase.initializeApp(config);

var addButtons = document.getElementsByClassName("add");
var saveButton = document.getElementById("save");
var updateButton = document.getElementById("update");
var delButton = document.getElementById("delete");
var cancelButtons = document.getElementsByClassName("cancel");
var leftArrows = document.getElementsByClassName("left");
var rightArrows = document.getElementsByClassName("right");
var todo = document.getElementById("todolist");
var ip = document.getElementById("iplist");
var fin = document.getElementById("finlist");
var dialog = document.getElementById("dialog");
var editDialog = document.getElementById("editDialog");
var selectTags = document.getElementsByClassName("members");
var taskRef = null;
var memRef = null;

firebase.auth().onAuthStateChanged(async function (user) {
  // User is signed in: set userId and teamId
  if (user) {
    var userId = user.uid;
    console.log("Hello " + user.uid);
    var ref = firebase.database().ref("Users/" + userId);
    await loadTeamId(ref);

    // Check values
    console.log("userId has been set: " + userId);
    console.log("teamId has been set: " + teamId);
  }
  // No user is signed in.
  else {
  }
});

async function loadTeamId(ref) {
  return ref.once("value").then(function (snapshot) {
    //console.log(snapshot.val())
    teamId = snapshot.val().currTeam;
  });
}
setTimeout(function () {
  if (taskRef == null) {
    taskRef = firebase.database().ref("Team/" + teamId + "/Tasks");
  }
  if (memRef == null) {
    memRef = firebase.database().ref("Team/" + teamId + "/Members");
  }

  //Load in Team Members
  memRef.once("value", snapshot => {
    //console.log(snapshot.val());
    snapshot.forEach(child => {
      let node0 = document.createElement("option");
      let node1 = document.createElement("option");
      let name = child.val()[0];
      //console.log(name);
      node0.innerHTML = name;
      node1.innerHTML = name;

      document.getElementById("handler0").appendChild(node0);
      document.getElementById("handler1").appendChild(node1);
    });
    document.getElementById("handler0").value = "";
  });
  //Load in initial Tasks
  taskRef.once("value", snapshot => {
    //console.log(snapshot.val());
    snapshot.forEach(child => {
      let node = document.createElement("div");
      let title = child.val()["title"];
      let handler = child.val()["handler"];
      let list = child.val()["status"];
      let oneRef = taskRef.child(child.key);
      console.log(oneRef.key);
      node.innerHTML = `<div class="${list}"><li id="${
        oneRef.key
        }"><div class="title">Title: ${title}</div><div class="handler">Handler: ${handler}</div></li><div class="arrows"><div class="left">⇦</div><div class="right">⇨</div></div></div>`;
      //left arrow
      node.childNodes[0].childNodes[1].childNodes[0].addEventListener(
        "click",
        function () {
          let li = this.parentNode.parentNode;
          let status = li.className;
          if (status === "ip") {
            li.className = "todo";
            oneRef.update({
              status: "todo"
            });
            console.log(child.val());
            todo.appendChild(li);
          }
          if (status == "fin") {
            li.className = "ip";
            oneRef.update({
              status: "ip"
            });
            ip.appendChild(li);
          }
        }
      );
      //right arrow
      node.childNodes[0].childNodes[1].childNodes[1].addEventListener(
        "click",
        function () {
          let li = this.parentNode.parentNode;
          let status = li.className;
          if (status === "todo") {
            li.className = "ip";
            oneRef.update({
              status: "ip"
            });
            ip.appendChild(li);
          }
          if (status == "ip") {
            li.className = "fin";
            oneRef.update({
              status: "fin"
            });
            fin.appendChild(li);
          }
        }
      );
      //console.log(list);
      if (list == "todo") {
        todo.appendChild(node);
      }
      if (list == "ip") {
        ip.appendChild(node);
      }
      if (list == "fin") {
        fin.appendChild(node);
      }
      //Show Edit Dialog
      node.childNodes[0].childNodes[0].addEventListener("click", function () {
        currentTask = this;
        document.getElementById(
          "title1"
        ).value = this.childNodes[0].innerText.replace("Title: ", "");
        document.getElementById(
          "handler1"
        ).value = this.childNodes[1].innerText.replace("Handler: ", "");
        console.log(this.childNodes[1].innerText.replace("Handler: ", ""));
        setTimeout(editDialog.showModal(), 200);
      });
    });
  });

  //Show Add Dialog
  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function () {
      list = this.parentNode.parentNode.id;
      dialog.showModal();
    });
  }

  //Show Edit Dialog
  for (var i = 0; i < todo.childNodes.length; i++) {
    todo.childNodes[i].addEventListener("click", function () {
      currentTask = this;
      console.log(this.title);
      document.getElementById("title1").value = this.title;
      dialog.showModal();
    });
  }
  for (var i = 0; i < ip.childNodes.length; i++) {
    ip.childNodes[i].addEventListener("click", function () {
      currentTask = this;
      console.log(this.title);
      dialog.showModal();
    });
  }
  for (var i = 0; i < fin.childNodes.length; i++) {
    fin.childNodes[i].addEventListener("click", function () {
      currentTask = this;
      console.log(this.title);
      dialog.showModal();
    });
  }

  //Save Change Dialog
  saveButton.addEventListener("click", function () {
    let node = document.createElement("div");
    let title = document.getElementById("title0").value;
    document.getElementById("title0").value = "";
    let handler = document.getElementById("handler0").value;
    let oneRef;
    taskRef.once("value", snapshot => {
      oneRef = taskRef.push();
      oneRef.set({
        title: title,
        status: list,
        handler: handler
      });
    });
    setTimeout(function () {
      node.innerHTML = `<div class="${list}"><li id="${
        oneRef.key
        }"><div class="title">Title: ${title}</div><div class="handler">Handler: ${handler}</div></li><div class="arrows"><div class="left">⇦</div><div class="right">⇨</div></div></div>`;
      node.childNodes[0].childNodes[1].childNodes[0].addEventListener(
        "click",
        function () {
          let li = this.parentNode.parentNode;
          var status = li.className;
          if (status === "ip") {
            li.className = "todo";
            todo.appendChild(li);
          }
          if (status == "fin") {
            li.className = "ip";
            ip.appendChild(li);
          }
        }
      );
      node.childNodes[0].childNodes[1].childNodes[1].addEventListener(
        "click",
        function () {
          let li = this.parentNode.parentNode;
          let status = li.className;
          if (status === "todo") {
            li.className = "ip";
            ip.appendChild(li);
          }
          if (status == "ip") {
            li.className = "fin";
            fin.appendChild(li);
          }
        }
      );
      if (list == "todo") {
        todo.appendChild(node);
      }
      if (list == "ip") {
        ip.appendChild(node);
      }
      if (list == "fin") {
        fin.appendChild(node);
      }

      //Show Edit Dialog
      node.childNodes[0].childNodes[0].addEventListener("click", function () {
        currentTask = this;
        document.getElementById(
          "title1"
        ).value = this.childNodes[0].innerText.replace("Title: ", "");
        document.getElementById(
          "handler1"
        ).value = this.childNodes[1].innerText.replace("Handler: ", "");
        console.log(this.childNodes[1].innerText.replace("Handler: ", ""));
        setTimeout(editDialog.showModal(), 200);
      });
    }, 200);
  });

  //Update Change Dialog
  updateButton.addEventListener("click", function () {
    let title = document.getElementById("title1").value;
    oneRef = taskRef.child(currentTask.id);
    document.getElementById("title1").value = "";
    let handler = document.getElementById("handler1").value;
    currentTask.childNodes[0].innerHTML = `Title: ${title}`;
    currentTask.childNodes[1].innerHTML = `Handler: ${handler}`;
    oneRef.update({
      title: title,
      handler: handler
    });
  });
  //Delete Button
  delButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this Task?")) {
      console.log("Clicked");
      oneRef = taskRef.child(currentTask.id);
      document.getElementById("title1").value = "";
      currentTask.parentNode.parentNode.removeChild(currentTask.parentNode);
      oneRef.remove();
    }
  });
  //Cancel Button
  for (var i = 0; i < cancelButtons.length; i++) {
    cancelButtons[i].addEventListener("click", function () {
      document.getElementById("title0").value = "";
      document.getElementById("title1").value = "";
      document.getElementById("handler0").value = "";
      document.getElementById("handler1").value = "";
    });
  }
}, 1500);
