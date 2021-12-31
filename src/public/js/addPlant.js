d = document;
const addreference = (btn, container, province, canton, locality) => {
  const $add = d.getElementById(btn);

  $add.addEventListener("click", (e) => {
    const $container = d.getElementById(container);
    const $row = d.createElement("div");
    $row.classList.add('row', 'bg-secondary', 'text-light', 'rounded', 'm-2', 'd-flex', 'justify-content-between')
    $row.innerHTML = `
      <div class="col-3 ">  
          <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${$(province + " option:selected").text()}</label>
          <input type="text" name="" id="" value=${$(province).val()} hidden>
      </div>
      <div class="col-4 ">
          <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${$(canton + " option:selected").text()} </label>
          <input type="text" name="" id="" value=${$(canton).val()} hidden>
      </div>
      <div class="col-3 ">
          <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${$(locality).val()} </label>
          <input type="text" name="" id="" value='${$(locality).val()}' hidden>
      </div>
    `
    const $close = document.createElement('div',);
    $close.classList.add('col-2', 'd-flex', 'justify-content-center', 'align-items-center')
    // $close.style = "position: absolute; top:0px; right:10px"
    $close.innerHTML = ` <i 
    class="material-icons text-danger"
    title="Delete">&#xE872;</i>`;



    $close.addEventListener("click", (e) => {
      // console.log(e.target.parentElement);
      $container.removeChild($row);

    })
    $row.appendChild($close)
    $container.appendChild($row);

  })
}
const addPart = (form, container, name, description) => {
  const $form = d.getElementById(form);


  $form.onsubmit = (e) => {
    e.preventDefault();
    const $container = d.getElementById(container);
    const $part = d.createElement('div');
    $part.classList.add('form-group')
    const $row = d.createElement("div");
    $row.classList.add('row', 'bg-secondary', 'text-light', 'rounded', 'm-2', 'd-flex', 'justify-content-between')
    $row.innerHTML = `
      <div class="col-4 ">  
          <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${$(name).val()}</label>
          <input type="text" name="" id="" value=${$(name).val()} hidden>
      </div>
      <div class="col-6 ">
          <label class="col-sm h-100  d-flex justify-content-right align-items-center " for="">${$(description).val()} </label>
          <input type="text" name="" id="" value='${$(description).val()}' hidden>
      </div>
      
    `
    const $close = document.createElement('div',);
    $close.classList.add('col-2', 'd-flex', 'justify-content-center', 'align-items-center')
    // $close.style = "position: absolute; top:0px; right:10px"
    $close.innerHTML = ` <i class="material-icons text-danger"
    title="Delete">&#xE872;</i>`;



    $close.addEventListener("click", (e) => {
      // console.log(e.target.parentElement);
      $container.removeChild($part);

    })
    $row.appendChild($close)
    $part.appendChild($row);
    const $imagesPart = d.createElement('div');
    $imagesPart.classList.add('form-group', 'moreImages')
    $imagesPart.innerHTML = `
      <label class="form-row form-label" for="">Imagenes para ${$(name).val()}</label>
      <input class="form-row form-control" type="file" name="image" id="images${$(name).val()}"
        accept="image/jpg, image/png, image/jpeg" multiple>
      <div class="images" id="imgsContent${$(name).val()}"></div>
    
    `
    $part.appendChild($imagesPart);
    $container.appendChild($part)
    viewImages(`images${$(name).val()}`, `imgsContent${$(name).val()}`)

  };
}

const createPlant = (imgs, name, scn, desc, parts, references, form) => {
  console.log("creando planta");
  let errors = [];
  const $form = document.getElementById(form);

  $form.onsubmit = (e) => {
    e.preventDefault();




    data = {};
    $("#loading").modal('show')
    data.name = d.getElementById(name).value;
    data.scientificname = d.getElementById(scn).value;
    data.description = d.getElementById(desc).value;
    console.log("data: ", data);

    fetch(`${location.origin}/api/plant`, {
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',

      body: JSON.stringify(data)
    }).then(async x => {
      console.log(x);
      const res = await x.json();
      const sc = res.data.scientificname;
      if (x.status == 200) {
        console.log("planta insertada correctamente :3");
        console.log(res.data.scientificname);

        const filex = d.getElementById(imgs).files;
        if (filex.length > 0) {
          const formData2 = new FormData();
          formData2.append('scientificname', sc)
            // console.log(filex.files);
            ;
          for (var x = 0; x < filex.length; x++) {
            formData2.append('images', filex[x]);
          }


          // formData2.append('images', filex.files)
          fetch(`${location.origin}/api/image`, {
            method: 'POST',
            body: formData2
          }).then(async x => {
            if (x.status == 200) {
              console.log("imagenes de planta insertadas correctamente :3");

            } else {
              const respu = x.json();
              var text;
              if (respu.si.length > 0)
                text = "algunas imagenes de planta no se pudieron insertar";
              else text = 'no se pudieron insertar imagenes de planta'
              errors.push(text);
            }
          })
        }

        const $partsContainer = d.getElementById(parts);
        const $parts = $partsContainer.children;
        console.log('parts: ' + $parts);
        let part = {}
        Array.from($parts).forEach(async (element) => {
          const $partText = element.firstElementChild;
          const $name = $partText.children[0];
          part.name = $name.lastElementChild.value
          const $description = $partText.children[1];
          part.description = $description.lastElementChild.value
          console.log("lo que tiene cientificname: " + sc);
          part.scientificname = sc;
          console.log('lo que se va para part: ' + part);


          //todo part an references
          const partResp = await fetch(`${location.origin}/api/partplant`, {
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: JSON.stringify(part)
          });
          console.log(partResp);
          if (partResp.status == 200) {
            console.log(`parte de planta '${part.name}' insertada correctamente :3`);

            const resp = await partResp.json();
            console.log('respuesta despues de insertar part: ' + resp.data.id);
            const $partText = element.lastElementChild;
            const $imgsPart = $partText.children[1];
            const filexPart = $imgsPart.files;
            if (filexPart.length > 0) {
              const formData2 = new FormData();
              formData2.append('idpartplant', resp.data.id);
              for (var x = 0; x < filexPart.length; x++) {
                formData2.append('images', filexPart[x]);
              }


              // formData2.append('images', filex.files)
              fetch(`${location.origin}/api/image`, {
                method: 'POST',
                body: formData2
              }).then(async x => {
                if (x.status == 200) {
                  console.log("todo ready ! :3");

                } else {
                  errors.push("imagen de parte de planta no insertada")
                }
              })

            }

          }else {
            errors.push(`parte de planta ${part.name} no insertada`)
          }

        })


        const $referenceContainer = d.getElementById(references);
        const $reference = $referenceContainer.children;
        console.log('parts: ' + $reference);
        let reference = {}
        Array.from($reference).forEach(async (element) => {
          const $canton = element.children[1];
          reference.idcanton = $canton.lastElementChild.value
          const $locality = element.children[2];
          reference.locality = $locality.lastElementChild.value
          console.log("lo que tiene cientificname: " + sc);
          reference.scientificname = sc;
          console.log('lo que se va para part: ' + reference);


          //todo part an references
          const referenceResp = await fetch(`${location.origin}/api/plantreference`, {
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: JSON.stringify(reference)
          });
          console.log(referenceResp);
          if (referenceResp.status == 200) {
            console.log("referencia de planta insertada correctamente :3");

          } else {
            errors.push("referencia de planta no se inserto ! :c")
          }
        })

        $("#loading").modal('hide');
        $('#case').text('agregado')
        $("#myModalS").modal("show")
        


      } else {

        $("#loading").modal('hide');
        console.log("entre al error");
        $("#problem").text(res.message)
        $("#myModalE").modal("show")
      }
    })
  }
}
const clear = (element) => {
  const $e = d.getElementById(element);
  while ($e.firstChild) {
    //The list is LIVE so it will re-index each call
    $e.removeChild($e.firstChild);
  }
}
const viewImages = (fileu, imgu) => {
  document.getElementById(fileu).addEventListener('change', function () {
    let files = document.getElementById(fileu).files
    clear(imgu);
    let cont = 0;
    Array.from(files).forEach(element => {
      var fr = new FileReader()
      fr.readAsDataURL(element)
      fr.onload = function (e) {
        var img = document.getElementById(imgu)
        const $div = document.createElement('div');
        $div.classList.add('divImg')
        const $img = document.createElement('img');
        $img.classList.add("imgs");
        $img.src = this.result
        /* const $close = document.createElement('div');
        //  $close.style="position: absolute; top:0px; right:10px"
        $close.innerText = 'X';
        $close.style = 'color:white;'

        $close.addEventListener("click", (e) => {
          // console.log(e.target.parentElement);
          console.log($div);
          img.removeChild($div);
          console.log(files);
          
          Array.from(files).forEach(file=>{
            console.log(file);
          })
          console.log(files);

        })

        $div.appendChild($close); */
        $div.appendChild($img)
        img.appendChild($div)
      }
      cont++;
    });

  })
}

d.addEventListener('DOMContentLoaded', () => {
  viewImages('images', 'imgsContent')

  createPlant('images', 'name', 'scientificname', 'description', 'parts', 'references', 'addPlant');
  addreference("addReference", "references", "#province", "#canton", "#locality");
  addPart("addPart", "parts", "#namePart", "#partDescripcion");


})