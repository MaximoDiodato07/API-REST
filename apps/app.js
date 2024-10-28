// ---------------------------------------------------------------------------------------------------------//
// -------------------------------------------- > CLIENTES < -----------------------------------------------//
// ---------------------------------------------------------------------------------------------------------//

// Campos:  id_cliente [int], razon_social [varchar(60)], direccion [varchar(100)], habilitado [bit(1)]

// Metodos de cliente: 
//                     - get (filtros opcionales)
//                     - insertClient (requiere array con campos asociativos)
//                     - updateClient (requiere array con campos asociativos)
//                     - deleteClient (array con campos asociativos opcional, solo lee el 'id' a borrar)

let aClients = [];
let modal = new bootstrap.Modal(changeModal);
// URL general de la API con los clientes.
const urlApis = "./apis" // tambien serviria con: http://localhost/PHP/apis/clientes.php/
// no le concatene el metodo, porque eso se hace dependiendo la situacion (asi lo reutilizo para llamar los distintos metodos).

// Manejo las apis como un array de objetos.
const APIs = {
    getCliente: urlApis + "/clientes.php/get",
    insertCliente: urlApis + "/clientes.php/insertClient",
    updateCliente: urlApis + "/clientes.php/updateClient",
    deleteCliente: urlApis + "/clientes.php/deleteClient"
};


// ------------------------ PETICIONES. -------------------------------

// Peticion get con async-await, y manejo de errores con try-catch
async function request() {
    try {
        // Hago la petición y espero la respuesta
        const response =    await fetch(APIs.getCliente, {
                                method: "GET",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });

        // Convierto la respuesta a JSON
        const json = await response.json(); 
        
        // Devuelvo la respuesta en formato JSON
        console.log(json.data)
        return json.data;
    } catch (error) {
        // En caso de error
        console.error('Error:', error);
        return null;
    }
    
}

// Peticion Insert
async function insert(xData) {
    const data = JSON.stringify(xData); // datos traido del form

    fetch(APIs.insertCliente, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(()=>{
        // vuelvo a escribir con los cambios.
        writeClients();
    })
    .catch((error) => console.error('Error:', error));
}

// Peticion update
async function edit(xData) {
    const data = JSON.stringify(xData); // datos traido del form

    fetch(APIs.updateCliente, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(()=>{
        // vuelvo a escribir con los cambios.
        writeClients();
    })
    .catch((error) => console.error('Error:', error));
}

// Peticion delete
async function delet(xData) {
    const data = JSON.stringify(xData); // datos traido del form

    fetch(APIs.deleteCliente, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(()=>{
        // vuelvo a escribir con los cambios.
        writeClients();
    })
    .catch((error) => console.error('Error:', error));
}


// ------------------------------------ GENERALES.
//------------------------- Cargo clientes y los muestro al cargar la pagina
document.addEventListener('DOMContentLoaded', writeClients);    

// ------------------------------------ FUNCIONES REUTILIZABLES
// ------------------------------------ Limpiar campos.
function cleanFields(){
    document.getElementById('modalForm').reset();
}

// ------------------------------------ Escribir Clientes.
async function writeClients(){
    // Consulto por los datos.
    aClients = await request();
    // Contenedor clientes.
    let clients = document.getElementById("clientsContainer");
    clients.innerHTML= "";
    
    //------------ Reccoro el array de los clientes.
    aClients.forEach(client => {
        // Creo la carta.
        let card = document.createElement('div');
        card.classList.add('clientsCard');

        //------- Campo id
        let idCliente = document.createElement('p');
        idCliente.classList.add('clientsID');
        idCliente.innerText = "#" + client.id_cliente;

        //------- Campo Razon Social
        let razonSocial = document.createElement('p');
        razonSocial.classList.add('clientsName');
        razonSocial.innerText = client.razon_social;

        //------- Campo Direccion
        let direccion = document.createElement('p');
        direccion.classList.add('clientsDirection');    
        direccion.innerText = client.direccion;

        //------- Agrego los hijos del div
        card.appendChild(idCliente);
        card.appendChild(razonSocial);
        card.appendChild(direccion);


        //------- Añado la carta al contenedor de clientes.
        clients.appendChild(card);

        //-------------- opciones de la carta
        let edit = document.createElement('btn');
        edit.innerHTML = `<svg width="25px" height="40px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--primary-color)"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        edit.classList.add('optionsIcons')
        edit.classList.add('editAction')
        //-------------- concateno los datasets.
        edit.dataset.id = client.id_cliente;
        edit.dataset.razonSocial = client.razon_social;
        edit.dataset.direccion = client.direccion;
        edit.dataset.habilitado = client.habilitado;


        let dele = document.createElement('btn')
        dele.innerHTML = `<svg width="25px" height="40px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--primary-color)"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        dele.classList.add('optionsIcons')
        dele.classList.add('deleteAction')
        //-------------- concateno id para buscar cual eliminar.
        dele.dataset.id = client.id_cliente;

        let options = document.createElement('div');
        options.classList.add('clientsOptions');

        options.appendChild(edit)
        options.appendChild(dele)
        
        //------- Añado la carta opciones de clientes.
        card.appendChild(options);

        
    });

     //------- Llamo funcion que añade acciones.
    addOptions();

}

// ------------------------------------ FUNCIONES PARA EL A/B/M
//------- Manejo para abrir el modal de agregar Cliente.
btnAdd = document.getElementById("openAddClient");
btnAdd.addEventListener("click", ()=>{
    cleanFields();
    document.getElementById("idInput").value = 0;
})

//------- Funcion que añade acciones edit.
function addOptions(){
    // Editar.
    let editBtns = document.getElementsByClassName('editAction');
    //Convierto en nodo la coleccion HTML para su manejo en forEach.
    Array.from(editBtns).forEach(element => {
        element.addEventListener('click', ()=>{
            cleanFields();
            document.getElementById("idInput").value = element.dataset.id;
            razonSocialForm = document.getElementById("razonSocialInput").value = element.dataset.razonSocial;
            direccionForm = document.getElementById("direccionInput").value = element.dataset.direccion;
            
            if(element.dataset.habilitado == 1){
                document.getElementById("habilitadoInput").checked = true
            }else{
                document.getElementById("habilitadoInput").checked = false
            }
            
            // Manejo el JS de bootstrap, y lo muestro "forzadamente"
            modal.show();
        })     
    });

    //------- Funcion que añade acciones delete.
    let deleteBtns = document.getElementsByClassName('deleteAction');
    Array.from(deleteBtns).forEach(element => {
        element.addEventListener('click', ()=>{
            // Genero alertas
            Swal.fire({
                title: '¿Desea eliminar el cliente?',
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
                    // paso array, donde leo el id_cliente desde php
                    formData = {
                        id_cliente: element.dataset.id
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

//------- Manejo para el sumbit de boton cliente.
btnForm = document.getElementById("formBtn")
btnForm.addEventListener("click", (e)=>{
    e.preventDefault()   
    //obtengo el valor de los elementos del form.
    idForm = parseInt(document.getElementById("idInput").value);
    razonSocialForm = document.getElementById("razonSocialInput").value;
    direccionForm = document.getElementById("direccionInput").value;
    if(document.getElementById("habilitadoInput").checked){
        habilitadoForm = 1;
    }else{
        habilitadoForm = 0;
    }
    
    let validate = 0;
    if (razonSocialForm == "" || direccionForm == ""){
        validate = 1
    }

    //Verifico que no haya ningun campo vacio del form.
    if (validate == 0){
        //obtengo Llamo el metodo segun se requiera.
        if (idForm == 0){
            let formData = {
                razon_social : razonSocialForm,
                direccion : direccionForm,
                habilitado: habilitadoForm
            };
            insert(formData);
        }else{
            let formData = {
                id_cliente : idForm,
                razon_social : razonSocialForm,
                direccion : direccionForm,
                habilitado: habilitadoForm
            };
            edit(formData);
        }

        modal.hide();
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Rellene todo los campos',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
    
})

