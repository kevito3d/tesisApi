
// import Cookies from "universal-cookie";



function cierraAlert() {
    const alert = document.getElementById('alert');
    alert.style = 'display:none';
}


const renderLogin = () => {
    // const cookies = new Cookies();

    //console.log("me cago");
    const loginView = document.getElementById('login-view');
    const login = document.getElementById('login');
    const spinner = document.getElementById('spinner');
    const alert = document.getElementById('alert');
    const loginForm = document.getElementById('form-signin');
    loginForm.onsubmit = (e) => {
        //console.log('assssssssssssss');
        e.preventDefault();
        //renderapp();
        alert.style = "display:none"
        login.style = "display:none";
        spinner.style = "display:flex";
        const ussername = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            fetch(`${location.origin}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ci: ussername,
                    email: ussername,
                    // user: ussername,
                    password: password
                })
            }).then(async x => {
                if (x.status == 200) {
                    //console.log("entre");
                    const res = await x.json();
                    window.localStorage['user'] = JSON.stringify(res.user)
                    window.localStorage['token'] = res.token
                    // //console.log(res);
                    location.replace(location.origin + "/plant");
                    // setCookie("email", res.user.email, 365);
                    // cookies.set('email', , { path: '/' });
                } else {
                    if (x.status == 403) {

                        alert.firstElementChild.lastElementChild.innerText = "Este usuario no tiene permisos"
                    }else{
                        alert.firstElementChild.lastElementChild.innerText = "Usuario y/o contraseña incorrecta!"
                    }
                    alert.style = 'display:flex';
                }
                login.style = "display:block"
                spinner.style = "display:none"
                // return x.json();
            }).catch(e => {
                //console.log(e);
            })

        } catch (error) {

        }

        //  .then(_res => {
        //     if (_res.sta) {
        //         //console.log("");
        //         //console.log(_res.institution);
        //         localStorage.setItem('user',JSON.stringify( _res.user))
        //         // localStorage.setItem('institution', JSON.stringify(_res.institution) )
        //         // localStorage.setItem('ses', _res.headers.ses_id)
        //          location.replace(location.origin)
        //     } else {
        //         //console.log("no entre");
        //         const alert = document.getElementById('alert');
        //         alert.style = 'display:flex';
        //     }
        //     login.style = "display:block"
        //     spinner.style = "display:none"
        // }) 
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    renderLogin();
})