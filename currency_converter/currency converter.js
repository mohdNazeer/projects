baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
select=document.getElementsByTagName("select")
img=document.getElementsByTagName("img")
amount=document.getElementById("inp1")
msg=document.getElementById("item3")
for(var element of select){
    for(currCode in countryList){
        opt=document.createElement("option")
        opt.innerText=currCode
        opt.setAttribute("value",currCode)
        if(element==select[0] && opt.innerText=="USD")
            opt.setAttribute("selected","")
        if(element==select[1] && opt.innerText=="INR")
            opt.setAttribute("selected","")
        element.appendChild(opt)
    }
}
function displayImg(arg){
        var countryCode=countryList[select[arg].value]
        img[arg].setAttribute("src","https://flagsapi.com/"+countryCode+"/flat/64.png")
}
document.getElementById("inp2").addEventListener("click",function(event){
    event.preventDefault()
    getExchangeRate()
})
async function getExchangeRate(){
    fromCurr=select[0].value
    toCurr=select[1].value
    amtVal=amount.value
    url=baseURL+"/"+fromCurr.toLowerCase()+".json"
    let response=await fetch(url)
    let data=await response.json()
    let rate=data[fromCurr.toLowerCase()][toCurr.toLowerCase()]
    let finalAmount=amtVal*rate
    msg.innerText=amtVal+fromCurr+"="+finalAmount+toCurr
}
window.addEventListener("load",()=>{
    getExchangeRate()
})
