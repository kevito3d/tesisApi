const d = document;
function cierraAlert() {
    const alert = document.getElementById('alert');
    alert.style = 'display:none';
}

const setReset = (form,ci_input)=>{
    const alert = document.getElementById('alert');
    const $form = d.getElementById(form)
    const $spinner = document.getElementById('spinner');
    const $button = document.getElementById('send');
    $form.onsubmit= (e)=>{
        $spinner.style = "display:flex";
        $button.style = "display:none";
        e.preventDefault()
        const ci = d.getElementById(ci_input).value
        console.log(ci);
        fetch(`${location.origin}/api/user/forgot-password`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ci
            })
        }).then(async x =>{
            const res = await x.json()
            alert.lastElementChild.innerText = res.message
            if(x.ok){
                alert.style.backgroundColor="#45E531"
            }else{
                alert.style.backgroundColor="#FF605A"
            }
            alert.style.display = 'flex';
            $spinner.style = "display:none"
            $button.style = "display:block"
        })
    }   

}
d.addEventListener("DOMContentLoaded", () => {
    setReset("form","ci")
})