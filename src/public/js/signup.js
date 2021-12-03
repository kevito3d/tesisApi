function cierraAlert() {
  const alert = document.getElementById('alertR');
  alert.style = 'display:none';
}


const renderLogin = () => {
  const loginView = document.getElementById('login-view');
  const login = document.getElementById('login');
  const spinner = document.getElementById('spinner');
  const loginForm = document.getElementById('form-signin');
 

  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const select = document.getElementById('institutions');
    console.log(select.value);
    login.style = "display:none";
    spinner.style = "display:flex";
    const ussername = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    fetch(`${location.origin}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            user: ussername,
            institution_id: select.value
        })
    }).then(x => x.json()).then(_res => {
        console.log(_res)
        if (_res.success) {
            console.log(_res.success);
            const alert = document.getElementById('alertR');
            alert.innerHTML = `<div class="text_alert">
            <strong>Hey !</strong> ${_res.success} !
          </div>
          <button
            onclick="cierraAlert()"
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true ">&times;</span>
          </button>`;
            alert.style.backgroundColor = "rgb(47, 255, 116)"
            alert.style.display = 'flex';
            console.log('entro');
        } else {
            const alert = document.getElementById('alertR');
            alert.innerHTML = `
            <div class="text_alert">
            <strong>Hey !</strong> ${_res.error} !
          </div>
          <button
            onclick="cierraAlert()"
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true ">&times;</span>
          </button>
            `;
            alert.style = 'display:flex';
            console.log('no entro');
        }
        login.style = "display:block"
        spinner.style = "display:none"
    }).catch(e => {
        console.log(e);
    })
  }
}
async function cargaInstitutions() {
  fetch(`${location.origin}/api/institution`, {

    }).then(x => x.json())
    .then(listInstitutions => {
      const $select = document.getElementById("institutions");
      const $miFragment = document.createDocumentFragment();

      listInstitutions.forEach((institucion) => {
        $miFragment.appendChild(addtoselect(institucion))
      })

      $select.appendChild($miFragment)

    })
}
const addtoselect = (institution) => {
  const nuevaOpcion = document.createElement("option");
  nuevaOpcion.value = institution._id;
  nuevaOpcion.text = institution.name;
  return nuevaOpcion;

}
document.addEventListener('DOMContentLoaded', (e) => {
  cargaInstitutions();
  renderLogin();
})