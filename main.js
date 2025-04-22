const text = document.querySelector("#main");
const btn = document.querySelector(".btn");
const change = document.querySelector(".here")
btn.addEventListener("click",function (){
    const name = text.value;
    sessionStorage.setItem("userName", name);
    window.location.href = "output.html";
})