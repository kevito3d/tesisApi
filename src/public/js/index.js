// import {insertar,setEmail} from'./index/nav.js';
// import {getCookie,setCookie} from './cookie'

const d = document;

const insertar = (btn) => {
    const $insert = d.getElementById(btn);
    $insert.addEventListener("click", (e) => {

    })
}
const setEmail = (email, element) => {
    console.log(email);
    d.getElementById(element).innerText = email;

}

const search = (search, element) => {
    console.log("search");
    const $search = d.getElementById(search);
    $search.addEventListener("keydown", (e) => {
        if(e.key=='Enter'){
            var url = `${location.origin}/api/plant/filter/${e.target.value}`;
            if (e.target.value.length==0){
                url = `${location.origin}/api/plant`
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
                const $grid = d.getElementById('grid');
                $grid.innerHTML = "";
                if (plants.length > 0) {
                    plants.forEach(e => {
                        $grid.innerHTML += `<div class="cardPlant">
                    <div>
                        <div class="name">
                            ${e.name}
                        </div>
                        <div class="scientific_name">
                        ${e.scientific_name}
                        </div>
                       <!--  <div class="description">
                        </div> -->
                        <img src=${e.url} alt="">
                    </div>
                
                </div>`
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


const openModal = (btn, modal) => {
    const $modal = d.getElementById(modal);
    const $btn = d.getElementById(btn);
    $btn.addEventListener('click', (e) => {
        $modal.style = "display:flex"
    })
}

const viewImage = (fileu, imgu) => {
    document.getElementById(fileu).addEventListener('change', function () {
        var file = document.getElementById(fileu).files[0]
        var fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = function (e) {
            var img = document.getElementById(imgu)
            const $img = document.createElement('img');
            $img.classList.add("imgp")
            $img.src = this.result
            if (img.lastElementChild) {
                img.removeChild(img.lastElementChild);
            }
            img.appendChild($img)
        }
    })
}

const viewImages = (fileu, imgu) => {
    document.getElementById(fileu).addEventListener('change', function () {
        var files = document.getElementById(fileu).files
        console.log(files);

        Array.from(files).forEach(element => {
            var fr = new FileReader()
            fr.readAsDataURL(element)
            fr.onload = function (e) {
                var img = document.getElementById(imgu)
                console.log(this.result);
                const $div = document.createElement('div');
                $div.classList.add('divImg')
                const $img = document.createElement('img');
                $img.classList.add("imgs");
                $img.src = this.result
                const $close = d.createElement('div');
                //  $close.style="position: absolute; top:0px; right:10px"
                $close.innerText = 'X';
                $close.style = 'color:white;'

                $close.addEventListener("click", (e) => {
                    // console.log(e.target.parentElement);
                    console.log($div);
                    img.removeChild($div);

                })

                $div.appendChild($close);
                $div.appendChild($img)
                img.appendChild($div)
            }
        });

    })
}

const closeModal = (close, modal) => {
    const $modal = d.getElementById(modal);
    const $btn = d.getElementById(close);
    $btn.addEventListener('click', (e) => {
        $modal.style = "display:none"
    })
    window.onclick = function(event) {
        if (event.target == $modal) {
          $modal.style.display = "none";
        }
      }
}
/* FileList.prototype.toArray = function () {
    return Array.from(this).map(function (file) {
      return file.toObject()
    })
  } */

const createPlant = (imgs,img, name, scn, desc, form) => {
    const $form = document.getElementById(form);

    $form.onsubmit = (e) => {
        const file = d.getElementById(img);
        console.log(file);
        
        const formData = new FormData();
        console.log(file.files[0]);
        formData.append('image', file.files[0]);
        formData.append('name', d.getElementById(name).value);
        formData.append('scientific_name', d.getElementById(scn).value);
        formData.append('description', d.getElementById(desc).value);
        
        e.preventDefault();
        fetch(`${location.origin}/api/plant`, {
            method: 'POST',
            
            body: formData
        }).then(async x => {
            if (x.status == 200) {
                const res = await x.json();
                console.log(res.data.id);
                const filex = d.getElementById(imgs).files;
                const formData2 = new FormData();
                formData2.append('plant_id', res.data.id)
                // console.log(filex.files);
                ;
                for(var x = 0; x<filex.length; x++) {
                    formData2.append('images', filex[x]);
                }
                

                // formData2.append('images', filex.files)
                fetch(`${location.origin}/api/image`, {
                    method: 'POST',
                    
                    body: formData2
                })

                
            }
        })
    }
}


d.addEventListener('DOMContentLoaded', () => {
    // funcionArrow('.user',".otp",".logout",".oscuro")
    // loadDates(".institution", ".nameuser") 
    setEmail(localStorage.getItem('email'), "email");
    insertar('email')
    search('search', 'grid');
    openModal('insert', 'myModal');
    closeModal('close', 'myModal')
    viewImage('image', 'imgContent');
    viewImages('images', 'imgsContent');

    createPlant('images','image', 'namePlant', 'namescPlant', 'descrPlant', 'form-create')

})