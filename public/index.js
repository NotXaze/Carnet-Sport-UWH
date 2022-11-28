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

let id=document.cookie
id=id.substring(id.length - 4)
console.log(id)
var user="Someone"

var header=document.getElementById("header")

database.ref("event/name").once("value", function(snapshot){
  var banderole=document.getElementById("alink")
  banderole.innerHTML=snapshot.val()
})

database.ref("user/" + id + "/name").once("value", function(snapshot){
  header.innerHTML=header.innerHTML + snapshot.val()
  user=snapshot.val()
  if (id==""){
    window.location="auth.html"
  }
  console.log(snapshot.val()=="Coach")
  if (snapshot.val()=="Coach"){
    header.innerHTML="Espace Coach <img src='https://drive.google.com/uc?id=1UHOF43dw97Aw-O1LSbKUQwnVyfC2SXnq'/>"
    document.getElementById("new").innerHTML="🔗 Lien Entrainements"
    document.getElementById("anew").href="https://docs.google.com/spreadsheets/d/1rcxVCzNP8HWlEE206lqyhbdbhZlyaG0FrOPpnmmOQo4/edit?usp=sharing"
    document.getElementById("sheet").style.display="none"
    document.getElementById("icon").style.width="120px"
    document.getElementById("Add").style.visibility="visible"
    var banderole=document.getElementById("Banderole")
    banderole.addEventListener("click", function(){
      openModal()
    })
    document.getElementById("blue").addEventListener("click", function(){
      var formBeg=document.getElementById("beg")
      var formEnd=document.getElementById("end")
      var formName=document.getElementById("ename")
      var formLink=document.getElementById("link")

/**------------------------------------------------------------------------------------------------------- */

      var dateBeg=formBeg.value.slice(8,10)+"/"+document.getElementById("beg").value.slice(5,7)
      var dateEnd=formEnd.value.slice(8,10)+"/"+document.getElementById("end").value.slice(5,7)
      var ename=formName.value
      var linkVal=formLink.value

      function save(temp){
        database.ref("event/name").set(temp)
        closeModal()
        window.location="index.html"
      }
      function savelink(temp){
        database.ref("event/link").set(temp)
      }
      if (linkVal.length>0){
        savelink(linkVal)
      }
      if (ename.length>1){
        if (dateBeg.length>2 && dateEnd.length>2){
          var temp="🕒 "+dateBeg+"-"+dateEnd+" "+ename
          save(temp)
        }
        else if(dateBeg.length>2){
          var temp="🕒 "+dateBeg +" "+ename 
          save(temp)
        }
        else if(dateEnd.length>2){
          var temp="🕒 "+dateEnd +" "+ename 
          save(temp)
        }
        else{
          var temp=ename
          save(temp)
        }}
      else{
        document.getElementById("ename").style.border="2px dashed red"
        document.getElementById("alertMod").style.visibility="visible" 
      }
    })
    document.getElementById("Add").addEventListener("click",function(){
      database.ref("seance/count").once("value",function(snapshot3){
        var lol=snapshot3.val()+1
        var temp=window.prompt("nom de la seance","Séance "+lol)
        if (temp.length>0){
          database.ref("seance/"+lol+"/name").set(temp)
          database.ref("seance/count").set(lol)
        }
      })
    })
  }
  else{
    database.ref("event/link").once("value", function(snapshot){
      var banderole=document.getElementById("alink")
      banderole.addEventListener("click",function(){
        window.location=snapshot.val()
      })
    })
  }
})


function openModal(){
  document.getElementById("modal").style.display="block"
}

function closeModal(){
  document.getElementById("modal").style.display="none"
}

document.getElementById('grey').addEventListener("click", function(){
  closeModal()
})

document.getElementById('overlay').addEventListener("click", function(){
  closeModal()
})

/* ---------------- Default Value of Modal ------------------------- */

database.ref("event/link").once("value", function(snapshot){
  document.getElementById("link").value=snapshot.val()
})

database.ref("event/name").once("value", function(snapshot){
  var value=snapshot.val().slice(3,snapshot.val().length)
  if (value[2]==="/"){
    document.getElementById("beg").value="2022-"+value.slice(3,5)+"-"+value.slice(0,2)
  }
  if (value[8]==="/"){
    document.getElementById("end").value="2022-"+value.slice(9,11)+"-"+value.slice(6,8)
  }
  document.getElementById("ename").value=value.slice(value.indexOf(" "),value.length)
})

/* --------------------Seance Dynamic Screen-----------------------*/

var stateTrain=0
var minSee=9999
var maxSee=9999
var count=9999
var Slot1=document.getElementById("slot1")
var Slot2=document.getElementById("slot2")
var Slot3=document.getElementById("slot3")

/* Init */
function Init(){
  database.ref("seance/count").once("value", function(snapshot){
    count=snapshot.val()-(3*stateTrain)
    var path1="seance/"+count+"/name"
    Slot2.style.visibility="visible"
    Slot3.style.visibility="visible"
    database.ref(path1).once("value",function(snapshot2){
      Slot1.innerHTML=snapshot2.val()
      Slot1.addEventListener("click",function(){
        openModal()
        document.getElementById("modal.default").style.display="none"
      })
    })
    var path2="seance/"+(count-1)+"/name"
    database.ref(path2).once("value",function(snapshot2){
      if (count-1>0){
        minSee=count-2
        Slot2.innerHTML=snapshot2.val()
      }
      else{
        minSee=count-1
        Slot2.style.visibility="hidden"
      }
    })
    var path3="seance/"+(count-2)+"/name"
    database.ref(path3).once("value",function(snapshot2){
      if (count-2>0){
        minSee=count-3
        Slot3.innerHTML=snapshot2.val()
      }
      else{
        Slot3.style.visibility="hidden"
      }
    })
    maxSee=snapshot.val()
  })
}
Init()

document.getElementById("TNext").addEventListener("click",function(){
  if (minSee>0){
    stateTrain++
    Init()
    document.getElementById("TPrevious").style.visibility="visible"
    if (minSee<4){
      document.getElementById("TNext").style.visibility="hidden"
    }
  }
})

document.getElementById("TPrevious").addEventListener("click",function(){
  if (count<maxSee){
    stateTrain--
    Init()
    document.getElementById("TNext").style.visibility="visible"
    if (stateTrain==0){
      document.getElementById("TPrevious").style.visibility="hidden"
    }
  }
})

