function f1(x)
{
    document.getElementById("sec1-p1").innerHTML=document.getElementById("sec1-p1").innerHTML+x
}
function all_clear()
{
    document.getElementById("sec1-p1").innerHTML=""
}
function dlt()
{
   text=document.getElementById("sec1-p1").innerHTML
   char=text[text.length-1]
   document.getElementById("sec1-p1").innerHTML=document.getElementById("sec1-p1").innerHTML.replace(char,"")
}
function result()
{
    document.getElementById("sec1-p1").innerHTML=eval(document.getElementById("sec1-p1").innerHTML)
}