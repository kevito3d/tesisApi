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
    $search.addEventListener("change", (e) => {

        fetch(`${location.origin}/api/plant/${e.target.value}`, {
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
            console.log(this.result);
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
                $close.innerText='X';
                $close.style='color:white;'

                $close.addEventListener("click", (e)=>{
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
}
d.addEventListener('DOMContentLoaded', () => {
    /* funcionArrow('.user',".otp",".logout",".oscuro")
    loadDates(".institution", ".nameuser") */
    setEmail(localStorage.getItem('email'), "email");
    insertar('email')
    search('search', 'grid');
    openModal('insert', 'myModal');
    closeModal('close', 'myModal')
    viewImage('image', 'imgContent');
    viewImages('images', 'imgsContent');

})