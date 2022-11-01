let filesList = [{ id: "000", list: [] }];
const d = document;
export function verificaReference(container, valProvince, valCanton) {
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
const clear = (element) => {
  //const $e = d.getElementById(element);
  ////console.log("lo que me llega:", element);
  while (element.firstChild) {
    //The list is LIVE so it will re-index each call
    element.removeChild(element.firstChild);
  }
};

function deleteArrayElementByIndex(list, index) {
  return list.filter((item, itemIndex) => itemIndex !== index);
}

function arrayFilesToFileList(filesList) {
  return filesList.reduce(function (dataTransfer, file) {
    dataTransfer.items.add(file);
    return dataTransfer;
  }, new DataTransfer()).files;
}
async function encodeFileToText(file) {
  return file.text().then((text) => {
    return text;
  });
}
async function getUniqFiles(newFiles, currentListFiles) {
  return new Promise((resolve) => {
    Promise.all(newFiles.map((inputFile) => encodeFileToText(inputFile))).then(
      (inputFilesText) => {
        // Check all the files to save
        Promise.all(
          currentListFiles.map((savedFile) => encodeFileToText(savedFile))
        ).then((savedFilesText) => {
          let newFileList = currentListFiles;
          inputFilesText.forEach((inputFileText, index) => {
            if (!savedFilesText.includes(inputFileText)) {
              newFileList = newFileList.concat(newFiles[index]);
            }
          });
          resolve(newFileList);
        });
      }
    );
  });
}
export function renderPreviews(currentFileList, target, inputFile, id) {
  //console.log("renderPreviews");
  //
  clear(target);
  currentFileList.forEach((file, index) => {
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function (e) {
      const $div = document.createElement("div");
      $div.classList.add("divImg");
      const $img = document.createElement("img");
      $img.classList.add("imgs");
      $img.src = this.result;
      const $close = document.createElement("div");
      //  $close.style="position: absolute; top:0px; right:10px"
      $close.innerText = "X";
      $close.style = "color:white;";

      $close.addEventListener("click", (e) => {
        currentFileList = deleteArrayElementByIndex(currentFileList, index);

        inputFile.files = arrayFilesToFileList(currentFileList);
        filesList.find((element) => element.id == id).list = currentFileList;
        return renderPreviews(
          filesList.find((element) => element.id == id).list,
          target,
          inputFile,
          id
        );
      });
      $div.appendChild($close);
      $div.appendChild($img);
      target.appendChild($div);
    };
  });
}
export function viewImages(fileu, imgu, id) {
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

function ElemetPartDinamic(modal = null,container,name,description) {
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

export function addPart(modal, form, container, name, description) {
  const $form = d.getElementById(form);
  $form.onsubmit = (e) => {
    e.preventDefault();
    ElemetPartDinamic(modal,container,name,description);
  };
}
export function addreference(
  modal,
  btn,
  container,
  province,
  canton,
  locality
) {
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
export const otivek = () => {
  //console.log("kevito 98");
};
