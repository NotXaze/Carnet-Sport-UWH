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

document.getElementById("save").addEventListener("click", () => {
    if (document.getElementById("checkCookie").checked){
        setID()
    }
    else{
        document.getElementById("Alert").style.visibility="visible"
        document.getElementById("Alert").innerHTML="Les cookies sont nécésaires au bon fonctionnement du site"
    }
})

document.getElementById("checkCookie").addEventListener('change',function(){
    if (document.getElementById("checkCookie").checked){
        document.getElementById("save").style.background="#00A75F"
        document.getElementById("save").style.boxShadow="0 5px #00590D"
        document.getElementById("save").innerHTML="💾 Enregistrer"
    }
    else{
        document.getElementById("save").style.background="#6c757d"
        document.getElementById("save").style.boxShadow=" 0 5px #495057"
        document.getElementById("save").innerHTML="🔒 Enregistrer"
    }
})

function setID(){
    var pincode=document.getElementById("pincode")
    if(pincode.value!="" || pincode.value=="0000"){
        database.ref("user").once("value", function(snap){
            var user=[]
            snap.forEach(function(child){
                user.push(child.key)
            })
            if (!(user.includes(pincode.value))){
                pincode.style.border="2px dashed red"
                document.getElementById("Alert").style.visibility="visible"
                document.getElementById("Alert").innerHTML="Code ID invalide"
            }
            else{
                document.cookie=pincode.value+ "; expires=Mon, 06 Oct 2100 00:00:00 GMT; path=/"
                window.location="index.html"
            }
        })
    }
    else{
        pincode.style.border="2px dashed red"
        document.getElementById("Alert").style.visibility="visible"
    }
}