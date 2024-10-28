//CAMPOS:
// - id_articulo <- Hidden
// - id_categoria <- Select.
// - codigo <- input
// - descripcion <- input
// - descripcion_larga. <- input
// - precio <- input (2 decimales)
// - alicuota_iva <- input
// - habilitado <- checkbox

let modal = new bootstrap.Modal('#articleModal');

// - Al cargar la pagina
document.addEventListener('DOMContentLoaded', ()=>{
    writeProducts();
    writeCategories();
    // modal.show();
})



let aCategories = [];
let aProducts = [];
const urlApi = "../apis" // <-- URL de las APIs. ()

const APIs = {
    getCategories : urlApi + "/categorias.php/getAll",
    getArticles : urlApi + "/articulos.php/getAll",
    insertArticle : urlApi + "/articulos.php/insertArticle",
    editArticle : urlApi + "/articulos.php/updateArticle",
    deleteArticle : urlApi + "/articulos.php/deleteArticle"
}

//------------------> Categorias.<-------------------//
async function getCategories() {
    try {
        // Hago la petición y espero la respuesta
        const response =    await fetch(APIs.getCategories, {
                                method: "GET",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });

        // Convierto la respuesta a JSON
        const json = await response.json(); 
        
        // Devuelvo la respuesta en formato JSON
        return json;
    } catch (error) {
        // En caso de error
        console.error('Error:', error);
        return null;
    }
    
}

//------------------> Articulos<-------------------//
async function getArticles() {
    try {
        // Hago la petición y espero la respuesta
        const response =    await fetch(APIs.getArticles, {
                                method: "GET",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });

        // Convierto la respuesta a JSON
        const json = await response.json(); 
        
        // Devuelvo la respuesta en formato JSON
        return json.data;
    } catch (error) {
        // En caso de error
        console.error('Error:', error);
        return null;
    }
    
}

async function insert(xData) {
    const data = JSON.stringify(xData); // datos traido del form

    console.log(data)

    fetch(APIs.insertArticle, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(()=>{
        // vuelvo a escribir con los cambios.
        writeProducts();
    })
    .catch((error) => console.error('Error:', error));
}

// Peticion update
async function edit(xData) {
    const data = JSON.stringify(xData); // datos traido del form

    fetch(APIs.editArticle, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(()=>{
        // vuelvo a escribir con los cambios.
        writeProducts();
    })
    .catch((error) => console.error('Error:', error));
}

// Peticion delete
async function delet(xData) {
    const data = JSON.stringify(xData); // datos traido del form
    
    fetch(APIs.deleteArticle, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(()=>{
        // vuelvo a escribir con los cambios.
        writeProducts();
    })
    .catch((error) => console.error('Error:', error));
}




//------------------> Funciones reutilizables.<-------------------//
async function writeProducts() {
    aProducts = await getArticles();
   
    let tableBody = document.getElementById('productTable')
    tableBody.innerHTML = '';

    

    aProducts.forEach(product => {
        
        // Creo una fila
        let row = document.createElement('tr');
    
        //---------- Celda de codigo
        let code = document.createElement('th');
        code.scope = 'row'; // Doy el tamaño del encabezado
        code.textContent = product.codigo;
        code.classList.add('bodyTable');
    
        //---------- Celda de codigo
        let description = document.createElement('td');
        description.textContent = product.descripcion;
        description.classList.add('bodyTable');
        description.classList.add('fw-semibold')
    
        //---------- Celda de codigo
        let category = document.createElement('td');
        category.textContent = product.categoria_descripcion;
        category.classList.add('bodyTable');
    
        //---------- Celda de codigo
        let price = document.createElement('td');
        price.textContent = product.precio;
        price.classList.add('bodyTable');
        price.classList.add('fst-italic')
    
        // ------------ Manejo de botones de opciones ----------.
        let options = document.createElement('td');
        options.classList.add('bodyTable');
    
        // Botones
        let edit = document.createElement('btn');
        edit.innerHTML = `<svg width="24px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-4)"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="var(--color-4)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        edit.classList.add('editBtns')
        edit.dataset.id = product.idarticulo;
        edit.dataset.idCategorie = product.idcategoria;
        edit.dataset.code = product.codigo;
        edit.dataset.description = product.descripcion;
        edit.dataset.extendDescription = product.descripcion_larga;
        edit.dataset.price = product.precio;
        edit.dataset.iva = product.alicuota_iva;
        edit.dataset.enabled = product.habilitado;

        let dele = document.createElement('btn')
        dele.innerHTML = `<svg width="24px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-4)"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="var(--color-4)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="var(--color-4)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        dele.classList.add('deletBtns');
        dele.dataset.id = product.idarticulo;

        let optionsDiv = document.createElement('div');
        optionsDiv.classList.add('optionsDiv')

        optionsDiv.appendChild(edit);
        optionsDiv.appendChild(dele);
        
        options.appendChild(optionsDiv);
    
        // Añado las celdas a la columna
        row.appendChild(code);
        row.appendChild(description);
        row.appendChild(category);
        row.appendChild(price);
        row.appendChild(options);
        // Añado la fila a la tabla
        tableBody.appendChild(row)
    });

    addOptions(); // Concateno acciones de los botones.
}

async function writeCategories() {
    let categoriesInput = document.getElementById('articleCategorie');
    aCategories = await getCategories();
    // console.log(aCategories)

    aCategories.forEach(categorie => {
        let option = document.createElement('option')
        option.value= categorie.idcategoria;
        option.textContent = categorie.descripcion;

        categoriesInput.appendChild(option)
    });

}

//------ Evento modal Agregar.
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', ()=>{
    //Limpio el form
    document.getElementById('modalForm').reset();
    document.getElementById("idInput").value = 0;
    document.getElementById("modalHeader").innerText = "Agregar producto"
})


//-------------- Agrego opciones.
function addOptions(){
    let editBtns = document.getElementsByClassName('editBtns')

    Array.from(editBtns).forEach(element => {
        element.addEventListener('click', ()=>{
        document.getElementById("modalHeader").innerText = "Editar producto"

            document.getElementById('modalForm').reset();
            document.getElementById('idInput').value = element.dataset.id;
            document.getElementById('articleCode').value = element.dataset.code;
            document.getElementById('articleDescription').value = element.dataset.description; 
            document.getElementById('articlePrice').value = element.dataset.price;
            document.getElementById('articleIva').value = element.dataset.iva ;
            document.getElementById('articleCategorie').value = element.dataset.idCategorie;
            if(element.dataset.enabled == 1){
                document.getElementById("articleEnabled").checked = true;
            }else{
                document.getElementById("articleEnabled").checked = false;
            }
            if(element.dataset.extendDescription == "null"){
                document.getElementById('articleExtendDescription').value = "";
            }else{
                document.getElementById('articleExtendDescription').value = element.dataset.extendDescription;
            }


    
            // Manejo el JS de bootstrap, y lo muestro "forzadamente"
            modal.show();
        })     
    });
    
    let deleteBtns = document.getElementsByClassName('deletBtns');
    Array.from(deleteBtns).forEach(element => {
        element.addEventListener('click', ()=>{
           
            // Genero alertas
            Swal.fire({
                title: '¿Desea eliminar el Articulo?',
                showDenyButton: true,
                confirmButtonText: 'SI',
                denyButtonText: 'NO',
                customClass: {
                  actions: 'my-actions',
                  confirmButton: 'order-2',
                  denyButton: 'order-3',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    // paso array, donde leo el id_articulo desde php
                    let formData = {
                        id_articulo: element.dataset.id
                    }
                    // Llamo al metodo que elimina el cliente
                    delet(formData)
                    Swal.fire('Borrado!', '', 'success')
                } else if (result.isDenied) {
                    // Cancelo la operacion.
                    Swal.fire('Cancelado con exito', '', 'info')
                }
            })
        })
    })

}

//----- Evento de boton enviar form.
let formBtn = document.getElementById('formBtn');
formBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    //---- Obtengo los valores requeridos para enviar al abm.
    let idArticle = parseInt(document.getElementById('idInput').value);
    let articleCode = document.getElementById('articleCode').value;
    let articleDescription = document.getElementById('articleDescription').value; 
    //--- lo convierto el Float, para utilizat "toFixed" y limitar decimales.
    let articlePrice = parseFloat(document.getElementById('articlePrice').value).toFixed(2)   ;
    let articleIva = parseInt(document.getElementById('articleIva').value) ;
    let enabled = "";
    if(document.getElementById("articleEnabled").checked){
        enabled = 1;
    }else{
        enabled = 0;
    }
    let idCategorie = document.getElementById('articleCategorie').value;
    let articleExtendDescription = document.getElementById('articleExtendDescription').value;

    let validate = 0;
    
    if(articleCode == "" || articleDescription == "" || isNaN(articlePrice) || isNaN(articleIva)){
        validate = 1
    }

    if(validate == 0){
        if (idArticle == 0){
            let formData = {
                id_categoria : idCategorie,
                codigo: articleCode,
                descripcion: articleDescription,
                descripcion_larga: articleExtendDescription,
                precio: articlePrice,
                alicuota_iva: articleIva,
                habilitado: enabled
            };
            insert(formData);
        }else{
            let formData = {
                id_articulo : idArticle,
                id_categoria : idCategorie,
                codigo: articleCode,
                descripcion: articleDescription,
                descripcion_larga: articleExtendDescription,
                precio: articlePrice,
                alicuota_iva: articleIva,
                habilitado: enabled
            };
            edit(formData);
        }

        modal.hide();
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Rellene los campos obligatorios',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }


})