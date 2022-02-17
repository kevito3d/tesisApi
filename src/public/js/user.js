// import {insertar,setEmail} from'./index/nav.js';
// import {getCookie,setCookie} from './cookie'
/* 
const e = require("connect-flash");
 */
const d = document;



const search = (search, element) => {
    console.log("search");
    const $search = d.getElementById(search);
    $search.addEventListener("keydown", (e) => {
        if (e.key == 'Enter') {
            var url = `${location.origin}/api/user/filter/${e.target.value}`;
            if (e.target.value.length == 0) {
                location.replace(location.origin + "/user");
            }
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(x => x.json()

                // return x.json();
            ).then(res => {
                const plants = res['data']
                const $grid = d.getElementById(element);
                $grid.innerHTML = "";
                if (plants.length > 0) {
                    plants.forEach(e => {
                        $grid.innerHTML += `
                        
                        <tr id="${e.ci}">

                                <td>
                                ${e.ci}
                                </td>
                                <td>
                                ${e.firstname}
                                </td>
                                <td>
                                    ${e.lastname}
                                </td>
                                <td>
                                    ${e.email}
                                </td>
                                <td>
                                    ${e.phone}
                                </td>
                                <td>
                                    ${e.role}
                                </td>

                                <td style="display: flex; justify-content: flex-end;">
                                    <a href="#editEmployeeModal" data-toggle="modal" role="button" id="btnEdit"
                                        onclick="setEditItem('${e.ci}')" class="edit"><i
                                            style="color:burlywood;" class="material-icons" data-toggle="tooltip"
                                            title="Edit">&#xE254;</i></a>
                                    <a href="#deleteUserModal" id="btnDelete"
                                        onclick="setDeleteItem('${e.ci}')" class="delete"
                                        data-toggle="modal"><i style="color:red;" class="material-icons"
                                            data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                </td>
                            </tr>
                        

                        `
                    });
                } else {
                    $grid.innerHTML = `<div>no hay datos</div>`;
                }
            }).catch(e => {
                console.log(e);
            })
        }

    })
}





/* FileList.prototype.toArray = function () {
    return Array.from(this).map(function (file) {
      return file.toObject()
    })
  } */


const setEditItem = (item) => {
    const $user = d.getElementById(item).children;
    const array = Array.from($user)
    d.getElementById('ciE').value = array[0].innerText;
    d.getElementById('ciE').disabled = true;
    d.getElementById('firstE').value = array[1].innerText;
    d.getElementById('lastE').value = array[2].innerText;
    d.getElementById('emailE').value = array[3].innerText;
    d.getElementById('phoneE').value = array[4].innerText;
    d.getElementById('roleE').value = array[5].innerText;
    /* $text.innerText = item;
    const $send = d.getElementById('scientificname').value = item; */


}

function limpiarFormulario(form) {
    document.getElementById(form).reset();
}

const updateUser = (firstname, lastname, ci, email, phone, password, role, form) => {
    const $form = document.getElementById(form);

    $form.onsubmit = (e) => {
        console.log(d.getElementById(ci).value);
        e.preventDefault();
        console.log(e.target);
        $("#loading").modal('show')
        const $rol = d.getElementById(role)
        data = {};
        // data.password = d.getElementById(password).value;
        data.lastname = d.getElementById(lastname).value;
        data.firstname = d.getElementById(firstname).value;
        data.email = d.getElementById(email).value;
        data.phone = d.getElementById(phone).value;
        console.log(data.email);
        data.role = $rol.value;
        console.log("me cago en la puta 31");
        console.log(JSON.stringify(data));
        fetch(`${location.origin}/api/user/${d.getElementById(ci).value}`, {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'PUT',

            body: JSON.stringify(data)
        }).then(async x => {
            if (x.status == 200) {
                const $user = d.getElementById(d.getElementById(ci).value).children;
                console.log($user);
                limpiarFormulario(form);

                $user[1].innerText = d.getElementById(firstname).value;
                $user[2].innerText = d.getElementById(lastname).value;
                $user[3].innerText = d.getElementById(email).value;
                $user[4].innerText = d.getElementById(role).value;

                $("#editEmployeeModal").modal('hide')
                $("#loading").modal('hide');
                $('#case').text('actualizado')
                $("#myModalS").modal("show")
            }
            else {
                const res = await x.json();

                $("#loading").modal('hide');
                console.log("entre al error");
                $("#problem").text(res.message)
                $("#myModalE").modal("show")
            }
        })
    }
}

const createUser = (firstname, lastname, ci, email, phone, password, role, form, body) => {
    const $form = document.getElementById(form);

    $form.onsubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        $("#loading").modal('show')
        const $rol = d.getElementById(role)
        data = {};
        data.ci = d.getElementById(ci).value;
        data.password = d.getElementById(password).value;
        data.lastname = d.getElementById(lastname).value;
        data.firstname = d.getElementById(firstname).value;
        console.log(email);
        console.log(d.getElementById(email));
        data.email = d.getElementById(email).value;
        data.phone = d.getElementById(phone).value;
        console.log(data.email);
        data.role = $rol.value;
        console.log("me cago en la puta 31");
        console.log(JSON.stringify(data));
        fetch(`${location.origin}/api/user/register`, {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',

            body: JSON.stringify(data)
        }).then(async x => {
            if (x.status == 201) {
                const $body = d.getElementById(body);
                $body.innerHTML = `
                <tr id=${data.ci}>
                    <td>${data.ci}</td>
                    <td>${data.firstname}</td>
                    <td>${data.lastname}</td>
                    <td>${data.email}</td>
                    <td>${data.phone}</td>
                    <td>${data.role}</td>
                    
                    <td style="display: flex; justify-content: flex-end;">
                        <a href="#editEmployeeModal" data-toggle="modal" role="button" id="btnEdit"  onclick="setEditItem('${data.ci}')"  class="edit" ><i style = "color:burlywood;"
                                class="material-icons" data-toggle="tooltip"
                                title="Edit">&#xE254;</i></a>
                        <a href="#deleteUserModal" id="btnDelete" onclick="setDeleteItem('${data.ci}')" class="delete" data-toggle="modal"><i style = "color:red;"
                                class="material-icons" data-toggle="tooltip"
                                title="Delete">&#xE872;</i></a>
                    </td>
                </tr>
                
                `+ $body.innerHTML;

                const $count = d.getElementById('countUsers').children;
                $count[0].innerText = "" + (parseInt($count[0].innerText) + 1)
                $count[1].innerText = "" + (parseInt($count[1].innerText) + 1)


                $("#addEmployeeModal").modal('hide')
                $("#loading").modal('hide');
                $('#case').text('agregado')
                $("#myModalS").modal("show")

                limpiarFormulario(form);

            }
            else {
                const res = await x.json();

                $("#loading").modal('hide');
                console.log("entre al error");
                $("#problem").text(res.message)
                $("#myModalE").modal("show")
            }
        })
    }
}

const setDeleteItem = (item, e) => {


    const $text = d.getElementById('userDelete');
    $text.innerText = item;
    const $send = d.getElementById('ci').value = item;


}
const DeleteItem = (form, scientificname) => {


    const $form = document.getElementById(form);
    const $eliminar = document.getElementById(scientificname);
    console.log("ttttttttttt: ", $eliminar.value);
    $form.onsubmit = (e) => {
        e.preventDefault();
        console.log($eliminar.value);
        try {
            fetch(`${location.origin}/api/user/${$eliminar.value}`, {
                method: 'DELETE',
            }).then(async x => {
                console.log(x);
                $("#deleteUserModal").modal("hide")
                if (x.status != 201) {
                    res = await x.json()
                    console.log("entre al error");
                    $("#problem").text(res.error.original.detail)
                    $("#myModalE").modal("show")
                } else {
                    const $eliminated = d.getElementById($eliminar.value);
                    console.log($eliminated);
                    $eliminated.parentElement.removeChild($eliminated)
                    $('#case').text('eliminado')
                    $("#myModalS").modal("show")
                }
            })


        } catch (error) {
            console.log("aaaaaaaaaaa");
        }


    }


}


d.addEventListener('DOMContentLoaded', () => {
    setDeleteItem("btnDelete");
    DeleteItem("deleteUser", "ci");

    createUser('firstname', 'lastname', 'identification', 'email', 'phone', 'pass', 'role', 'addUser', 'tableBody');
    updateUser('firstE', 'lastE', 'ciE', 'emailE', 'phoneE', 'no cambia password', 'roleE', 'editUser');
    

    search('search', 'tableBody');

})