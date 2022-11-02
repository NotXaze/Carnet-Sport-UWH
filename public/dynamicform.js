const firebaseConfig = {
    apiKey: "AIzaSyC2T6sKVN0jKC17TIO3i13fI1DydhUFuaA",
    authDomain: "carnet-de-bord-sport.firebaseapp.com",
    databaseURL: "https://carnet-de-bord-sport-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "carnet-de-bord-sport",
    storageBucket: "carnet-de-bord-sport.appspot.com",
    messagingSenderId: "702698919029",
    appId: "1:702698919029:web:ddee2f8b01a50b04c1543c",
    measurementId: "G-D3QFVQZE5B"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database()
var id=document.cookie

var header=document.getElementById("head")

database.ref("user/" + id + "/name").once("value", function(snapshot){
  header.innerHTML=header.innerHTML + snapshot.val()
})

database.ref("user/"+id+"/form/action").once("value", function(snap){
  document.getElementById("mG61Hd").action=snap.val()
  console.log("action OK")
})

database.ref("user/"+id+"/form/1").once("value", function(snap){
  document.getElementById("UWH").name=snap.val()
  document.getElementById("NEP").name=snap.val()
  document.getElementById("NEV").name=snap.val()
  document.getElementById("CAP").name=snap.val()
  document.getElementById("MUSC").name=snap.val()
  document.getElementById("Other").name=snap.val()
  console.log("sport OK")
})

database.ref("user/"+id+"/form/2").once("value", function(snap){
  document.getElementById("CONTENT").name=snap.val()
  console.log("Contenus OK")
})

database.ref("user/"+id+"/form/3").once("value", function(snap){
  document.getElementById("TIME").name=snap.val()
  console.log("Durée OK")
})

database.ref("user/"+id+"/form/4").once("value", function(snap){
  document.getElementById("MOREINFO").name=snap.val()
  console.log("More Info OK")
})

database.ref("user/"+id+"/form/5").once("value", function(snap){
  document.getElementById("res1").name=snap.val()
  document.getElementById("res2").name=snap.val()
  document.getElementById("res3").name=snap.val()
  document.getElementById("res4").name=snap.val()
  document.getElementById("res5").name=snap.val()
  document.getElementById("res6").name=snap.val()
  document.getElementById("res7").name=snap.val()
  document.getElementById("res8").name=snap.val()
  document.getElementById("res9").name=snap.val()
  document.getElementById("res10").name=snap.val()
  console.log("RES OK")
})

database.ref("user/"+id+"/form/6").once("value", function(snap){
  document.getElementById("COMM").name=snap.val()
  console.log("COMM OK")
})