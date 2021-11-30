// import {insertar,setEmail} from'./index/nav.js';
// import {getCookie,setCookie} from './cookie'

const d =document;

 const  insertar=(btn)=>{
    const $insert = d.getElementById(btn);
    $insert.addEventListener("click",(e)=>{
        
    })
}
 const setEmail=(email, element)=>{
    console.log(email);
    d.getElementById(element).innerText= email;

}
d.addEventListener('DOMContentLoaded', ()=>{
    /* funcionArrow('.user',".otp",".logout",".oscuro")
    loadDates(".institution", ".nameuser") */
    setEmail(localStorage.getItem('email'),"email");
    insertar('email')


})