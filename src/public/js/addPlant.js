import { addPart, verificaReference, viewImages } from "./plant/utils.js";

const d = document;


const addreference = (modal, btn, container, province, canton, locality) => {
  const $add = d.getElementById(btn);

  $add.addEventListener("click", (e) => {
    const $province = d.getElementById(province);
    const $canton = d.getElementById(canton);
    if (
      !verificaReference(
        container,
        $province.options[$province.selectedIndex].value,
        $canton.options[$canton.selectedIndex].value
      )
    ) {
      const $locality = d.getElementById(locality);
      const $container = d.getElementById(container);
      const $row = d.createElement("div");
      $row.classList.add(
        "row",
        "bg-secondary",
        "text-light",
        "rounded",
        "m-2",
        "d-flex",
        "justify-content-between"
      );
      $row.innerHTML = `
        <div class="col-3 ">  
            <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${
              $province.options[$province.selectedIndex].text
            }</label>
            <input type="text" name="" id="" value=${
              $province.options[$province.selectedIndex].value
            } hidden>
        </div>
        <div class="col-4 ">
            <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${
              $canton.options[$canton.selectedIndex].text
            } </label>
            <input type="text" name="" id="" value=${
              $canton.options[$canton.selectedIndex].value
            } hidden>
        </div>
        <div class="col-3 ">
            <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${
              $locality.value
            } </label>
            <input type="text" name="" id="" value='${$locality.value}' hidden>
        </div>
      `;
      const $close = document.createElement("div");
      $close.classList.add(
        "col-2",
        "d-flex",
        "justify-content-center",
        "align-items-center"
      );
      // $close.style = "position: absolute; top:0px; right:10px"
      $close.innerHTML = ` <i 
      class="material-icons text-danger"
      title="Delete">&#xE872;</i>`;

      $close.addEventListener("mouseenter", () => {
        $close.style.cursor = "pointer";
        // $close.textContent = '🤣'
      });
      /* $close.addEventListener('mouseleave', () => {
        $close.textContent = '🙂'
      }); */

      $close.addEventListener("click", (e) => {
        // //console.log(e.target.parentElement);
        $container.removeChild($row);
      });
      $row.appendChild($close);
      $container.appendChild($row);
      $(modal).modal("hide");
    }
  });
};


const createPlant = (imgs, name, scn, desc,descriptionalumnos, parts, references, form) => {
  //console.log("creando planta");
  let errors = [];
  const $form = document.getElementById(form);

  $form.onsubmit = (e) => {
    e.preventDefault();

    const data = {};
    $("#loading").modal("show");
    data.name = d.getElementById(name).value;
    data.scientificname = d.getElementById(scn).value;
    data.description = d.getElementById(desc).value;
    data.descriptionalumnos = d.getElementById(descriptionalumnos).value;

    fetch(`${location.origin}/api/plant`, 
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "POST",

      body: JSON.stringify(data),
    }).then(async (x) => {
      //console.log(x);
      const res = await x.json();
      const sc = res.data.scientificname;
      if (x.status == 200) {
        //console.log("planta insertada correctamente :3");
        //console.log(res.data.scientificname);

        const filex = d.getElementById(imgs).files;
        if (filex.length > 0) {
          const formData2 = new FormData();
          formData2.append("scientificname", sc);
          if(d.getElementById('descriptionImages').value.length>0){
            formData2.append("descriptionalumnos", d.getElementById('descriptionImages').value);
            
          }
          // //console.log(filex.files);
          for (var x = 0; x < filex.length; x++) {
            formData2.append("images", filex[x]);
          }

          // formData2.append('images', filex.files)
          fetch(`${location.origin}/api/image`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            method: "POST",
            body: formData2,
          }).then(async (x) => {
            if (x.status == 200) {
              //console.log("imagenes de planta insertadas correctamente :3");
            } else {
              const respu = x.json();
              var text;
              if (respu.si.length > 0)
                text = "algunas imagenes de planta no se pudieron insertar";
              else text = "no se pudieron insertar imagenes de planta";
              errors.push(text);
            }
          });
        }

        const $partsContainer = d.getElementById(parts);
        const $parts = $partsContainer.children;
        //console.log("parts: " + $parts);
        let part = {};
        Array.from($parts).forEach(async (element) => {
          const $partText = element.firstElementChild;
          const $name = $partText.children[0];
          part.name = $name.lastElementChild.value;
          const $description = $partText.children[1];
          part.description = $description.lastElementChild.value;
          //console.log("lo que tiene cientificname: " + sc);
          part.scientificname = sc;
          const $descriptionAlumnos = element.lastElementChild;
          if($descriptionAlumnos.lastElementChild.value.length>0){
            part.descriptionalumnos = $descriptionAlumnos.lastElementChild.value;
          }
          //console.log("lo que se va para part: " + part);

          const partResp = await fetch(`${location.origin}/api/partplant`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            method: "POST",
            body: JSON.stringify(part),
          });
          //console.log(partResp);
          if (partResp.status == 200) {
            const resp = await partResp.json();
            //console.log("respuesta despues de insertar part: " + resp.data.id);
           //aqui tomamos las el input de imagenes de las partes
            const $ContainerImages = element.lastElementChild.previousElementSibling;
            const $imgsPart = $ContainerImages.children[1];
            //aqui las imagenes de las partes
            const filexPart = $imgsPart.files;
            if (filexPart.length > 0) {
              const formData2 = new FormData();
              formData2.append("idpartplant", resp.data.id);
              for (var x = 0; x < filexPart.length; x++) {
                formData2.append("images", filexPart[x]);
              }

              // formData2.append('images', filex.files)
              fetch(`${location.origin}/api/image`, {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },

                method: "POST",
                body: formData2,
              }).then(async (x) => {
                if (x.status == 200) {
                  //console.log("todo ready ! :3");
                } else {
                  errors.push("imagen de parte de planta no insertada");
                }
              });
            }
          } else {
            errors.push(`parte de planta ${part.name} no insertada`);
          }
        });

        const $referenceContainer = d.getElementById(references);
        const $reference = $referenceContainer.children;
        //console.log("parts: " + $reference);
        let reference = {};
        Array.from($reference).forEach(async (element) => {
          const $canton = element.children[1];
          reference.idcanton = $canton.lastElementChild.value;
          const $locality = element.children[2];
          reference.locality = $locality.lastElementChild.value;
          //console.log("lo que tiene cientificname: " + sc);
          reference.scientificname = sc;
          //console.log("lo que se va para part: " + reference);

          //todo part an references
          const referenceResp = await fetch(
            `${location.origin}/api/plantreference`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              method: "POST",
              body: JSON.stringify(reference),
            }
          );
          //console.log(referenceResp);
          if (referenceResp.status == 200) {
            //console.log("referencia de planta insertada correctamente :3");
          } else {
            errors.push("referencia de planta no se inserto ! :c");
          }
        });

        $("#loading").modal("hide");
        $("#case").text("agregado");
        $("#myModalS").modal("show");
        setInterval(() => {
          location.replace(`${location.origin}`);
        }, 1000);
      } else {
        $("#loading").modal("hide");
        //console.log("entre al error");
        $("#problem").text(res.message);
        $("#myModalE").modal("show");
      }
    });
  };
};





d.addEventListener("DOMContentLoaded", () => {
  viewImages("images", "imgsContent", "000");

  createPlant(
    "images",
    "name",
    "scientificname",
    "description",
    "descriptionImages",
    "parts",
    "references",
    "addPlant"
  );
  addreference(
    "#openaddReference",
    "addReference",
    "references",
    "province",
    "canton",
    "locality"
  );
  addPart(
    "#openaddPartPlant",
    "addPart",
    "parts",
    "namePart",
    "partDescripcion"
  );
});
