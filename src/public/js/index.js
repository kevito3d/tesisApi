let $plants;
const d = document;

const search = (search, element) => {
  console.log("search");
  const $search = d.getElementById(search);
  $search.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      var url = `${location.origin}/api/plant/filter/${e.target.value}`;
      if (e.target.value.length == 0) {
        location.replace(location.origin + "/plant");
      }
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
        .then(
          (x) => x.json()
        )
        .then((res) => {
          const plants = res["data"];
          console.log(plants);
          const $grid = d.getElementById(element);
          $plants = $grid.children;
          $grid.innerHTML = "";

          if (plants.length > 0) {
            plants.forEach((e) => {
              $grid.innerHTML += `
                        <tr id=${e.scientificname} >
                        <!-- <td>
                            <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox1" name="options[]" value="1">
                                <label for="checkbox1"></label>
                            </span>
                        </td> -->
                        <td>
                        ${e.scientificname}
                        </td>
                        <td>
                        ${e.name}
                        </td>
                        <td>
                            ${e.description}
                        </td>
                       

                        <td style="display: flex; justify-content: flex-end;">
                            <a href="/plant/edit/${e.scientificname} " id="btnEdit"
                                class="edit"><i style="color:burlywood;" class="material-icons"
                                    data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deletePlantModal" id="btnDelete"
                                onclick="setDeleteItem('${e.scientificname}')" class="delete"
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
          console.log(e);
        });
    }
  });
};

const setDeleteItem = (item, e) => {
  const $text = d.getElementById("plantDelete");
  $text.innerText = item;
  const $send = (d.getElementById("scientificname").value = item);
};

const DeleteItem = (form, scientificname) => {
  const $form = document.getElementById(form);
  const $eliminar = document.getElementById(scientificname);
  console.log("ttttttttttt: ", $eliminar.value);
  $form.onsubmit = (e) => {
    e.preventDefault();
    console.log($eliminar.value);
    try {
      fetch(`${location.origin}/api/plant/${$eliminar.value}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(async (x) => {
        console.log(x);
        $("#deletePlantModal").modal("hide");
        if (x.status != 200) {
          res = await x.json();
          console.log("entre al error");
          $("#problem").text(res.error.original.detail);
          $("#myModalE").modal("show");
        } else {
          const $eliminated = d.getElementById($eliminar.value);
          console.log($eliminated);
          $eliminated.parentElement.removeChild($eliminated);
          $("#case").text("eliminado");
          $("#myModalS").modal("show");
        }
      });
    } catch (error) {
      console.log("aaaaaaaaaaa");
    }
  };
};

d.addEventListener("DOMContentLoaded", () => {
  //funcionArrow('.user',".otp",".logout")
  // loadDates(".institution", ".nameuser")
  setDeleteItem("btnDelete");
  DeleteItem("deletePlant", "scientificname");

  search("search", "tablePlants");
  /*   setEmail(localStorage.getItem('email'), "email");
      insertar('email')
      openModal('insert', 'myModal');
      closeModal('close', 'myModal')
      viewImage('image', 'imgContent');
      viewImages('images', 'imgsContent');
  
      createPlant('images', 'image', 'namePlant', 'namescPlant', 'descrPlant', 'form-create') */
});
