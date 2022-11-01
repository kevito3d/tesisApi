const d = document;

const updatePlant = (
  imgs,
  name,
  scn,
  desc,
  descriptionalumnos,
  partsContainer,
  references,
  form
) => {
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
    fetch(
      `${location.origin}/api/plant/${window.location
        .toString()
        .split("/")
        .at(-1)}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: "PUT",

        body: JSON.stringify(data),
      }
    ).then(async (x) => {
      const res = await x.json();
      const sc = res.data.scientificname;
      //console.log("token: ", localStorage.getItem("token"));
      if (x.status == 200) {
        const respuestaP = await fetch(`${location.origin}/api/plant/${sc}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: "get",
        });
        let plant = await respuestaP.json();
        plant = plant.data;
        //console.log(plant);
        //console.log("planta actualizada correctamente :3");
        // //console.log(res.data.scientificname);
        // const $imgChange =
        //   d.getElementById(name).parentElement.parentElement.lastElementChild;

        // if ($imgChange.checked) {
        const filex = d.getElementById(imgs).files;
        if (filex.length > 0) {
          const formData2 = new FormData();
          formData2.append("scientificname", sc);
          // //console.log(filex.files);
          for (var x = 0; x < filex.length; x++) {
            formData2.append("images", filex[x]);
          }
          for (const images of plant.images) {
            await fetch(`${location.origin}/api/image/${images.id}`, {
              headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              method: "DELETE",
              body: JSON.stringify({ url: images.url }),
              headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
              },
            });
            //console.log("imagen borrada");
          }

          // formData2.append('images', filex.files)
          fetch(`${location.origin}/api/image`, {
            method: "POST",
            body: formData2,
            headers: {
              authorization: localStorage.getItem("token"),
            },
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
        // }

        // const $PartChange = d.getElementById(parts).parentElement.parentElement.lastElementChild;

        const $partsContainer = d.getElementById(partsContainer);
        const $parts = $partsContainer.children;
        let parts = [];
        //console.log({ $parts });

        Array.from($parts).forEach(async (element) => {
          let part = {};
          const $partText = element.firstElementChild;
          const $name = $partText.children[0];
          part.name = $name.lastElementChild.value;
          part.id = $name.firstElementChild
            ? $name.firstElementChild.value
            : null;
          //console.log("id: ", $name.firstElementChild);
          const $description = $partText.children[1];
          part.description = $description.lastElementChild.value;
          part.scientificname = sc;
          part.isAlter = $partText.lastElementChild.checked;
          part.images = element.children[1].children[1].files;
          parts.push(part);
        });
        //console.log("parts: ", parts);
        //console.log("plant: ", plant);
        for (let index = 0; index < plant.partplants.length; index++) {
          const find = parts.find(
            (part) => part.id == plant.partplants[index].id
          );
          //console.log("find: ", find);
          //console.log("find: ", find);
          if (find) {
            //console.log("isAlter: ", find.isAlter);
            if (find.isAlter) {
              /* plant.partplants.slice(index,1);
              index --; */
              for (const imagespart of plant.partplants[index].images) {
                await fetch(`${location.origin}/api/image/${imagespart.id}`, {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),

                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  method: "DELETE",
                  body: JSON.stringify({ url: imagespart.url }),
                });
              }
              const formData2 = new FormData();
              formData2.append("idpartplant", parts[index].id);
              // //console.log(filex.files);
              for (var x = 0; x < parts[index].images.length; x++) {
                formData2.append("images", parts[index].images[x]);
              }
              await fetch(`${location.origin}/api/image/`, {
                method: "POST",
                body: formData2,
                headers: {
                  authorization: localStorage.getItem("token"),
                },
              });
            }
            //console.log("supongo : ", parts);
            //console.log(parts.indexOf(find));
            parts.splice(parts.indexOf(find), 1);
            //console.log("eliminado");
            //console.log("nada : ", parts);
          } else {
            await fetch(
              `${location.origin}/api/partplant/${plant.partplants[index].id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  authorization: localStorage.getItem("token"),
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: "DELETE",
              }
            );
          }
        }
        //console.log("nada : ", parts);
        for (const part of parts) {
          await fetch(`${location.origin}/api/partplant/`, {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token"),
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: "POST",
            body: JSON.stringify({
              name: part.name,
              description: part.description,
              scientificname: part.scientificname,
            }),
          })
            .then((x) => x.json())
            .then(async (x) => {
              //console.log("jeje: ", x);
              const formData2 = new FormData();
              formData2.append("idpartplant", x.data.id);
              // //console.log(filex.files);
              for (var x = 0; x < part.images.length; x++) {
                formData2.append("images", part.images[x]);
              }
              await fetch(`${location.origin}/api/image/`, {
                method: "POST",
                body: formData2,
                headers: {
                  authorization: localStorage.getItem("token"),
                },
              });
            });
        }

        for (const reference of plant.plantsreferences) {
          //console.log("cs reference: ", reference.scientificname);
          await fetch(
            `${location.origin}/api/plantreference/${reference.scientificname}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              method: "DELETE",
            }
          );
        }
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
                authorization: localStorage.getItem("token"),
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
        $("#case").text("actualizado");
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
const verifica = (container, text) => {
  const $parts = d.getElementById(container).children;
  let bandera = false;
  Array.from($parts).forEach((part) => {
    if (
      part.firstElementChild.firstElementChild.firstElementChild.innerText ==
      text
    ) {
      bandera = true;
    }
  });
  return bandera;
};
function ElemetPartDinamicHome(modal = null, container, name, description) {
  const $name = d.getElementById(name);
  if (!verifica(container, $name.value)) {
    const $description = d.getElementById(description);
    const $container = d.getElementById(container);
    const $part = d.createElement("div");
    $part.classList.add("form-group");
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
    $row.id = Date.now();
    $row.innerHTML = `
          <div class="col-4 ">  
              <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${$name.value}</label>
              <input type="text" name="" id="" value=${$name.value} hidden>
          </div>
          <div class="col-6 ">
              <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${$description.value} </label>
              <input type="text" name="" id="" value='${$description.value}' hidden>
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
    $close.innerHTML = ` <i class="material-icons text-danger"
        title="Delete">&#xE872;</i>`;

    $close.addEventListener("mouseenter", () => {
      $close.style.cursor = "pointer";
      // $close.textContent = '🤣'
    });

    $close.addEventListener("click", (e) => {
      // //console.log(e.target.parentElement);
      $container.removeChild($part);

      //splice the array filesList
      filesList.splice(
        filesList.findIndex((element) => element.id === $row.id),
        1
      );
      //console.log(filesList);
      //delete item to array from index

      //filesList.splice(aux , 1);
    });
    $row.appendChild($close);
    $part.appendChild($row);
    filesList.push({ id: $row.id, list: [] });
    const $imagesPart = d.createElement("div");
    $imagesPart.classList.add("form-group", "moreImages");
    $imagesPart.innerHTML = `
          <label class="form-row form-label" for="">Imagenes para ${$name.value}</label>
          <input class="form-row form-control" type="file" name="image" id="images${$name.value}"
            accept="image/jpg, image/png, image/jpeg" multiple>
          <div class="images" id="imgsContent${$name.value}"></div>
        
        `;
    const $descriptionImages = d.createElement("div");
    $descriptionImages.innerHTML = `
        
          <label for="descriptionImages" class="form-row">Descripcion para alumnos</label>
          <input type="text"  id="">
        
        `;
    $part.appendChild($imagesPart);
    $part.appendChild($descriptionImages);
    $container.appendChild($part);
    $(modal).modal("hide");
    viewImages(`images${$name.value}`, `imgsContent${$name.value}`, $row.id);
    //console.log(filesList.length);
    $name.value = "";
    $description.value = "";
  }
}

function addPart(modal, form, container, name, description) {
  const $form = d.getElementById(form);
  $form.onsubmit = (e) => {
    e.preventDefault();
    ElemetPartDinamicHome(modal, container, name, description);
  };
}
function viewImages(fileu, imgu, id) {
  const fileInputMulti = document.getElementById(fileu);
  const multiSelectorUniqPreview = document.getElementById(imgu);

  fileInputMulti.addEventListener("input", async function () {
    const newFilesList = Array.from(fileInputMulti.files);
    ////console.log("files nuevo: ", newFilesList);
    // Update list files
    //console.log("files actual: ", filesList);
    //console.log(
    //   "files: **",
    //   filesList.find((element) => element.id == id).list
    // );
    filesList.find((element) => element.id == id).list = await getUniqFiles(
      newFilesList,
      filesList.find((element) => element.id == id).list
    );
    //console.log(
    //   "files: ",
    //   filesList.find((element) => element.id == id)
    // );
    ////console.log("files antiguos: ", filesList[indexList].list);
    // Only DEMO. Redraw
    renderPreviews(
      filesList.find((element) => element.id == id).list,
      multiSelectorUniqPreview,
      fileInputMulti,
      id
    );
    // Set data to input
    fileInputMulti.files = arrayFilesToFileList(
      filesList.find((element) => element.id == id).list
    );
  });
}

function addreference(modal, btn, container, province, canton, locality) {
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
}
function verificaReference(container, valProvince, valCanton) {
  const $parts = d.getElementById(container).children;
  let bandera = false;
  Array.from($parts).forEach((part) => {
    //console.log(part.firstElementChild.lastElementChild.value);
    if (part.firstElementChild.lastElementChild.value == valProvince) {
      //console.log("prvince igual");
      //console.log(part.children[1]);
      if (part.children[1].lastElementChild.value == valCanton) {
        //console.log("canton igual");
        bandera = true;
      }
    }
  });
  return bandera;
}
/* const clearContainerImages = (element) => {
  const $e = d.getElementById(element);
  while ($e.firstChild) {
    //The list is LIVE so it will re-index each call
    $e.removeChild($e.firstChild);
  }
} */
/* const viwImagesDinamic = (files, img) => {
  const $files = document.querySelectorAll('.' + files);
  //console.log(files);
  //console.log($files);
  const $imgs = document.querySelectorAll('.' + img);
  //console.log(img);
  //console.log($imgs);
  for (let index = 0; index < $files.length; index++) {
    //console.log("test: ", $files[index].id);
    viewImages($files[index].id, $imgs[index].id);
  }
} */

d.addEventListener("DOMContentLoaded", () => {
  viewImages("images", "imgsContent", "000");

  //viwImagesDinamic("imagesDinamic", "imgsContentDinamic");
  updatePlant(
    "images",
    "name",
    "scientificname",
    "description",
    "descriptionImages",
    "parts",
    "references",
    "editPlant"
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
