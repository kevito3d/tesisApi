// import {insertar,setEmail} from'./index/nav.js';
// import {getCookie,setCookie} from './cookie'
/* 
const e = require("connect-flash");
 */
const d = document;

const search = (search, element) => {
  //console.log("search");
  const $search = d.getElementById(search);
  $search.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      var url = `${location.origin}/api/user/filter/${e.target.value}`;
      if (e.target.value.length == 0) {
        location.replace(location.origin + "/user");
      }
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(
          (x) => x.json()

          // return x.json();
        )
        .then((res) => {
          const plants = res["data"];
          const $grid = d.getElementById(element);
          $grid.innerHTML = "";
          if (plants.length > 0) {
            plants.forEach((e) => {
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
                        

                        `;
            });
          } else {
            $grid.innerHTML = `<div>no hay datos</div>`;
          }
        })
        .catch((e) => {
          //console.log(e);
        });
    }
  });
};

/* FileList.prototype.toArray = function () {
    return Array.from(this).map(function (file) {
      return file.toObject()
    })
  } */

const setEditItem = (item) => {
  const $user = d.getElementById(item).children;
  const array = Array.from($user);
  d.getElementById("ciE").value = array[0].innerText;
  d.getElementById("ciE").disabled = true;
  d.getElementById("firstE").value = array[1].innerText;
  d.getElementById("lastE").value = array[2].innerText;
  d.getElementById("emailE").value = array[3].innerText;
  d.getElementById("phoneE").value = array[4].innerText;
  d.getElementById("roleE").value =
    array[5].innerText == "Estudiante" ? "student" : "admin";
  /* $text.innerText = item;
    const $send = d.getElementById('scientificname').value = item; */
};

function limpiarFormulario(form) {
  document.getElementById(form).reset();
}

const updateUser = (
  firstname,
  lastname,
  ci,
  email,
  phone,
  password,
  role,
  form
) => {
  const $form = document.getElementById(form);

  $form.onsubmit = (e) => {
    //console.log(d.getElementById(ci).value);
    e.preventDefault();
    //console.log(e.target);
    
    const $rol = d.getElementById(role);
    data = {};
    // data.password = d.getElementById(password).value;
    data.lastname = d.getElementById(lastname).value;
    data.firstname = d.getElementById(firstname).value;
    data.email = d.getElementById(email).value;
    data.phone = d.getElementById(phone).value;
    //console.log(data.email);
    data.role = $rol.value;


    if (!validatePhone(data.phone)) {
      const text = d.getElementById("phoneValidateE");
      text.innerText = "Celular invalido";
      text.style.color = "red";
      return;
    }
    if(!validateEmail(data.email)){
      const text = d.getElementById("emailValidateE");
      text.innerText = "Email invalido";
      text.style.color = "red";
      return;
    }
    $("#loading").modal("show");
    //console.log("me cago en la puta 31");
    //console.log(JSON.stringify(data));
    fetch(`${location.origin}/api/user/${d.getElementById(ci).value}`, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "PUT",

      body: JSON.stringify(data),
    }).then(async (x) => {
      const text = d.getElementById("phoneValidateE");
        text.innerText = "";
      if (x.status == 200) {
        const $user = d.getElementById(d.getElementById(ci).value).children;
        //console.log($user);
        $user[1].innerText = d.getElementById(firstname).value;
        $user[2].innerText = d.getElementById(lastname).value;
        $user[3].innerText = d.getElementById(email).value;
        $user[4].innerText = d.getElementById(role).value;
        limpiarFormulario(form);

        $("#editEmployeeModal").modal("hide");
        $("#loading").modal("hide");
        $("#case").text("actualizado");
        $("#myModalS").modal("show");

        // wait 1 seg and reaload page
        setTimeout(() => {
          location.reload();
        }, 1000);
        
      } else {
        const res = await x.json();

        $("#loading").modal("hide");
        //console.log("entre al error");
        $("#problem").text(res.message);
        $("#myModalE").modal("show");
      }
    });
  };
};
const validateCI = (ci) => {
  //Preguntamos si la cédula consta de 10 digitos
  if (isNaN(ci)) {
    return {
      correct: false,
      msj: "Esta cédula no son numeros",
    };
  }
  if (ci.length == 10) {
    //Obtenemos el digito de la region que sonlos dos primeros digitos
    var digito_region = ci.substring(0, 2);

    //Pregunto si la region existe ecuador se divide en 24 regiones
    if (digito_region >= 1 && digito_region <= 24) {
      // Extraigo el ultimo digito
      var ultimo_digito = ci.substring(9, 10);

      //Agrupo todos los pares y los sumo
      var pares =
        parseInt(ci.substring(1, 2)) +
        parseInt(ci.substring(3, 4)) +
        parseInt(ci.substring(5, 6)) +
        parseInt(ci.substring(7, 8));

      //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
      var numero1 = ci.substring(0, 1);
      var numero1 = numero1 * 2;
      if (numero1 > 9) {
        var numero1 = numero1 - 9;
      }

      var numero3 = ci.substring(2, 3);
      var numero3 = numero3 * 2;
      if (numero3 > 9) {
        var numero3 = numero3 - 9;
      }

      var numero5 = ci.substring(4, 5);
      var numero5 = numero5 * 2;
      if (numero5 > 9) {
        var numero5 = numero5 - 9;
      }

      var numero7 = ci.substring(6, 7);
      var numero7 = numero7 * 2;
      if (numero7 > 9) {
        var numero7 = numero7 - 9;
      }

      var numero9 = ci.substring(8, 9);
      var numero9 = numero9 * 2;
      if (numero9 > 9) {
        var numero9 = numero9 - 9;
      }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      //Suma total
      var suma_total = pares + impares;

      //extraemos el primero digito
      var primer_digito_suma = String(suma_total).substring(0, 1);

      //Obtenemos la decena inmediata
      var decena = (parseInt(primer_digito_suma) + 1) * 10;

      //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
      var digito_validador = decena - suma_total;

      //Si el digito validador es = a 10 toma el valor de 0
      if (digito_validador == 10) var digito_validador = 0;

      //Validamos que el digito validador sea igual al de la ci
      if (digito_validador == ultimo_digito) {
        return { correct: true };
      } else {
        return { correct: false, msj: "Cédula no valida" };
      }
    } else {
      // imprimimos en consola si la region no pertenece
      return {
        correct: false,
        msj: "Esta cédula no pertenece a ninguna region",
      };
    }
  } else {
    return {
      correct: false,
      msj: "Esta cédula no tiene 10 Digitos",
    };
  }
};

const validatePhone = (phone) => {
  if (data.phone.length != 10 || isNaN(data.phone)) {
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(email);
};

const createUser = (
  firstname,
  lastname,
  ci,
  email,
  phone,
  password,
  role,
  form,
  body
) => {
  const $form = document.getElementById(form);

  $form.onsubmit = (e) => {
    e.preventDefault();
    //console.log(e.target);

    const $rol = d.getElementById(role);
    data = {};
    data.ci = d.getElementById(ci).value;
    data.password = d.getElementById(password).value;
    data.lastname = d.getElementById(lastname).value;
    data.firstname = d.getElementById(firstname).value;
    ////console.log(email);
    //console.log(d.getElementById(email));
    data.email = d.getElementById(email).value;
    data.phone = d.getElementById(phone).value;

    ////console.log(data.email);
    data.role = $rol.value;
    ////console.log(JSON.stringify(data));
    const ciValidate = validateCI(data.ci);
    if (ciValidate.correct) {
      if (!validatePhone(data.phone)) {
        const text = d.getElementById("phoneValidate");
        text.innerText = "Celular invalido";
        text.style.color = "red";
        return;
      }
      if(!validateEmail(data.email)){
        const text = d.getElementById("emailValidate");
        text.innerText = "Email invalido";
        text.style.color = "red";
        return;
      }

      $("#loading").modal("show");
      fetch(`${location.origin}/api/user/register`, {
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: localStorage.getItem("token"),
        },
        method: "POST",

        body: JSON.stringify(data),
      }).then(async (x) => {
        //console.log("xd:", x);
        const text = d.getElementById("phoneValidate");
        text.innerText = "";
        if (x.status == 201) {
          const $body = d.getElementById(body);
          $body.innerHTML =
            `
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
                      
                      ` + $body.innerHTML;

          const $count = d.getElementById("countUsers").children;
          $count[0].innerText = "" + (parseInt($count[0].innerText) + 1);
          $count[1].innerText = "" + (parseInt($count[1].innerText) + 1);

          $("#addEmployeeModal").modal("hide");
          $("#loading").modal("hide");
          $("#case").text("agregado");
          $("#myModalS").modal("show");

          limpiarFormulario(form);
        } else {
          $("#loading").modal("hide");
          if (x.status != 403) {
            const res = await x.json();
            $("#problem").text(res.message);
          } else {
            $("#problem").text("No Autorizado");
          }

          $("#myModalE").modal("show");
        }
      });
    } else {
      const text = d.getElementById("ciValidate");
      text.innerText = ciValidate.msj;
      text.style.color = "red";
    }
  };
};

const setDeleteItem = (item, e) => {
  const $text = d.getElementById("userDelete");
  $text.innerText = item;
  const $send = (d.getElementById("ci").value = item);
};
const DeleteItem = (form, scientificname) => {
  const $form = document.getElementById(form);
  const $eliminar = document.getElementById(scientificname);
  //console.log("ttttttttttt: ", $eliminar.value);
  $form.onsubmit = (e) => {
    e.preventDefault();
    //console.log($eliminar.value);
    try {
      fetch(`${location.origin}/api/user/${$eliminar.value}`, {
        method: "DELETE",
      }).then(async (x) => {
        //console.log(x);
        $("#deleteUserModal").modal("hide");
        if (x.status != 201) {
          res = await x.json();
          //console.log("entre al error");
          $("#problem").text(res.error.original.detail);
          $("#myModalE").modal("show");
        } else {
          const $eliminated = d.getElementById($eliminar.value);
          //console.log($eliminated);
          $eliminated.parentElement.removeChild($eliminated);
          $("#case").text("eliminado");
          $("#myModalS").modal("show");
        }
      });
    } catch (error) {
      //console.log("aaaaaaaaaaa");
    }
  };
};
const resetModal = (reset) => {
  const modal = d.querySelectorAll(reset);
  //console.log(modal);
  //console.log(Array.from(modal))
  Array.from(modal).map((m) => {
    m.addEventListener("click", (e) => {
      const c = d.getElementById("ciValidate");
      const ce = d.getElementById("ciValidateE");
      const p = d.getElementById("phoneValidate");
      c.innerText = "";
      p.innerText = "";
      ce.innerText = "";
    });
  });
};

d.addEventListener("DOMContentLoaded", () => {
  setDeleteItem("btnDelete");
  DeleteItem("deleteUser", "ci");
  resetModal(".resetModal");
  createUser(
    "firstname",
    "lastname",
    "identification",
    "email",
    "phone",
    "pass",
    "role",
    "addUser",
    "tableBody"
  );
  updateUser(
    "firstE",
    "lastE",
    "ciE",
    "emailE",
    "phoneE",
    "no cambia password",
    "roleE",
    "editUser"
  );

  search("search", "tableBody");
});
