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
var header=document.getElementById("header")
var name=""

database.ref("user/" + id + "/name").once("value", function(snapshot){
    header.innerHTML=header.innerHTML + snapshot.val()
})
