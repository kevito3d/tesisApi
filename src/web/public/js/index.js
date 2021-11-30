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

const search =(search, element)=>{
    console.log("search");
    const $search=d.getElementById(search);
    $search.addEventListener("change", (e)=>{
        
        fetch(`${location.origin}/api/plant/${e.target.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        }).then( x => x.json() 
            
            // return x.json();
        ).then(res =>{
           const plants = res['data']
           const $grid = d.getElementById('grid');
           $grid.innerHTML="";
           if(plants.length>0){
            plants.forEach(e => {
                $grid.innerHTML+=`<div class="cardPlant">
                <div>
                    <div class="name">
                        ${e.name}
                    </div>
                    <div class="scientific_name">
                    ${e.scientific_name}
                    </div>
                   <!--  <div class="description">
                    </div> -->
                    <img src=${e.url} alt="">
                </div>
            
            </div>`
               });
           }else{
               $grid.innerHTML=`<div>no hay datos</div>`;
           }
        }).catch(e => {
            console.log(e);
        })
    })
}
d.addEventListener('DOMContentLoaded', ()=>{
    /* funcionArrow('.user',".otp",".logout",".oscuro")
    loadDates(".institution", ".nameuser") */
    setEmail(localStorage.getItem('email'),"email");
    insertar('email')
    search('search','grid');


})