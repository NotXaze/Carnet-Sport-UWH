var state=0
var nextButton=document.getElementById("blue")
var TS=document.getElementById("TS")
var P2=document.getElementById("P2")
var P3=document.getElementById("P3")
var final=document.getElementById("FINAL")

var OtherValue=""
document.getElementById("OtherText").addEventListener("input", () => {
        OtherValue=document.getElementById("OtherText").value
    })

var ContentValue=""
document.getElementById("CONTENT").addEventListener("input", () => {
    ContentValue=document.getElementById("CONTENT").value
})

var TimeValue=""
document.getElementById("TIME").addEventListener("input", () => {
    TimeValue=document.getElementById("TIME").value
})


function FindMySport(temp){
    var Sport=document.getElementById(temp)
    if (document.getElementById("UWH").checked){
        Sport.innerHTML="🤿 UWH"
    }
    if (document.getElementById("NEP").checked){
        Sport.innerHTML="🏊 Nage en piscine"
    }
    if (document.getElementById("NEV").checked){
        Sport.innerHTML="🌊 Nage en eau vive"
    }
    if (document.getElementById("CAP").checked){
        Sport.innerHTML="🏃 Course à pied"
    }
    if (document.getElementById("MUSC").checked){
        Sport.innerHTML="🏋️Musculation"
    }
    if (document.getElementById("Other").checked){
        Sport.innerHTML=`❓ ${OtherValue}`
    }
}

function clickNext(){
    if (state<3){
        state++
    }
    if (state==1) {
        document.getElementById("grey").style.boxShadow="0 5px #495057"
        document.getElementById("grey").style.background="#6c757d"
        document.getElementById("grey").innerHTML='<span style="display: inline-block; transform: scale(-1, 1);">&#10140;</span> Retour'
        TS.style.display= "none"
        P2.style.display= "contents"
        FindMySport("sport")
        if (document.getElementById("Other").checked==true){
            document.getElementById("Other").value=document.getElementById("OtherText").value
        }
    }
    if (state==2) {
        P2.style.display= "none"
        P3.style.display= "contents"
        FindMySport("sport2")
    }
    if (state==3){
        P3.style.display= "none"
        final.style.display="contents"
        document.getElementById("blue").style.visibility="hidden"
    }
}

document.getElementById("grey").addEventListener("click",clickPrevious)
function clickPrevious(){
    if (state>-1){
        state--
    }
    if (state==-1) {
        window.location.href = "index.html"
    }
    if (state==0) {
        document.getElementById("grey").style.boxShadow="0 5px #00590D"
        document.getElementById("grey").style.background="#00A75F"
        document.getElementById("grey").innerHTML='🏠 Accueil'
        TS.style.display= "contents"
        P2.style.display= "none"
        if (document.getElementById("Other").checked==true){
            document.getElementById("Other").value=document.getElementById("OtherText").value
        }
    }
    if (state==1) {
        document.getElementById("blue").style.visibility="visible"
        P3.style.display= "none"
        P2.style.display= "contents"
        FindMySport("sport")
    }
    if (state==2){
        final.style.display= "none"
        P3.style.display= "contents"
        document.getElementById("blue").style.visibility="visible"
    }
}

function checkOther(){
    document.getElementById("Other").checked=true
}

document.getElementById("blue").addEventListener("click",MandCheckNext)
function MandCheckNext(){
    if (state==2){
        if(!(document.getElementById("res1").checked || document.getElementById("res2").checked || document.getElementById("res3").checked || document.getElementById("res4").checked || document.getElementById("res5").checked || document.getElementById("res6").checked || document.getElementById("res7").checked || document.getElementById("res8").checked || document.getElementById("res9").checked || document.getElementById("res10").checked)){
            document.getElementById("radios").style.border="2px dashed red"
            document.getElementById("alertRA").style.visibility="visible"
        }
        else{
            document.getElementById("radios").style.border="none"
            document.getElementById("alertRA").style.visibility="hidden" 
            clickNext()
        }
    }
    if (state==1){
        if (!(ContentValue!="")){
            document.getElementById("CONTENT").style.border="2px dashed red"
            document.getElementById("alertCO").style.visibility="visible"
        }
        if (!(TimeValue!="")){
            document.getElementById("TIME").style.border="2px dashed red"
            document.getElementById("alertTI").style.visibility="visible"
        }
        else{
            document.getElementById("CONTENT").style.border="0.5px solid rgb(168,168,168)"
            document.getElementById("TIME").style.border="0.5px solid rgb(168,168,168)"
            document.getElementById("alertCO").style.visibility="hidden"
            document.getElementById("alertTI").style.visibility="hidden"
            clickNext()
        }
    }
    if (state==0){
        if (!(document.getElementById("UWH").checked || document.getElementById("NEV").checked || document.getElementById("NEP").checked || document.getElementById("CAP").checked || document.getElementById("MUSC").checked || (document.getElementById("Other").checked && OtherValue!=""))){
            document.getElementById("Radio").style.border="2px dashed red"
            document.getElementById("alertTS").style.visibility="visible"
        }
        else{
            document.getElementById("Radio").style.border="none"
            document.getElementById("alertTS").style.visibility="hidden"
            clickNext()
        }
    }
}

var OtherText=document.getElementById("OtherText")
OtherText.addEventListener('input', function(){
    var ValOtherText=OtherText.value
    if (ValOtherText[ValOtherText.length-1]=="\n"){
        OtherText.value=ValOtherText.slice(0,ValOtherText.length-1)
    }
})

var Time=document.getElementById("TIME")
Time.addEventListener('input', function(){
    var ValTime=Time.value
    if (ValTime[ValTime.length-1]=="\n"){
        Time.value=ValTime.slice(0,ValTime.length-1)
    }
})

document.getElementById("ENVOI").addEventListener("click",function(){
    document.getElementById("ENVOI").style.display="none"
    document.getElementById("grey").style.visibility="hidden"
    document.getElementById("alertSAVE").style.display="none"
    document.getElementById("msgConf").innerHTML="🚧 Enregistrement en cours 🚧 </br> Veuillez patienter </br> Redirection en cours..."
})