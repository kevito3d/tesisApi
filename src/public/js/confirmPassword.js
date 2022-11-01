const d = document;
function cierraAlert() {
    const alert = document.getElementById('alert');
    alert.style = 'display:none';
}

const setReset = (form,pass1,pass2)=>{
    const alert = document.getElementById('alert');
    const $form = d.getElementById(form)
    $form.onsubmit= (e)=>{
        e.preventDefault()
        const newPassword = d.getElementById(pass1).value
        const newPassword2 = d.getElementById(pass2).value
        if(newPassword!=newPassword2){
            alert.innerText="contraseñas no coinciden"
            alert.style.display="flex";
            return;
        }
        //console.log(ci);
        fetch(`${location.origin}/api/user/reset-password`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ci
            })
        }).then(async x =>{
            const res = await x.json()
            alert.firstElementChild.lastElementChild.innerText = res.message
            if(x.ok){
                alert.setAttribute("style", "rgba(0, 255, 38, 0.875);");
                alert.style.backgroundColor="green"
            }else{
                alert.setAttribute("style", "rgba(255, 0, 0, 0.37);");
                alert.style.backgroundColor="red"
            }
            alert.style.display = 'flex';
        })
    }   

}
d.addEventListener("DOMContentLoaded", () => {
    setReset("form","ci")
})