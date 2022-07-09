let lista = document.getElementById("todoList");

let arreglo_items = [];

class Recordatorio {
    constructor(titulo, fecha, detalles) {
        this.titulo = titulo
        this.fecha = fecha;
        this.detalles = detalles
    }
    
}

(function eventListener(){
    let boton = document.getElementById("agregar");

    if(boton){
        boton.addEventListener('click', () => {
            let titulo = document.getElementById("titulo").value;
            let fecha = document.getElementById("fecha").value;
            let detalles = document.getElementById("descripcion").value;
            let rec = new Recordatorio(titulo, fecha, detalles)
            
            arreglo_items = [...arreglo_items, rec]
            arreglo_items.forEach((item, index) => item.id = Date.now());
        
            console.log(arreglo_items)
           
            agregar_item();
        
            localStorage.setItem('recordatorios', JSON.stringify(arreglo_items));
        
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Creaste un nuevo recordatorio',
                showConfirmButton: false,
                timer: 1500
              })
        
        });
    } else {
        return
    }

})()




document.addEventListener('DOMContentLoaded', () => {
    arreglo_items = JSON.parse(localStorage.getItem('recordatorios')) || [];
    agregar_item();
})




function agregar_item(){
    let liste = document.getElementById('todoList')
    liste.innerHTML = ``;
    if(arreglo_items.length > 0) {
        arreglo_items.forEach(item => {
            
        
            let elementito = document.createElement('li'); 
            elementito.classList.add('recordCard');
            elementito.addEventListener('click', () => {
                elementito.classList.toggle('checked')
            })
            elementito.innerHTML = 
            `
            <div class="datos" itemId="${item.id}">
                <p class="titulo">${item.titulo}</p>
                <p class="fecha">${item.fecha}</p>
                <p class="descripcion">${item.detalles}</p>
            </div>
            <div class="checkbox" style="width: 40px; height: 40px; background: #fff; margin-right: 4rem;border:1px solid #000;border-radius: 50%;"></div>
        
            `
            liste.appendChild(elementito);

   
        })
    }

}




document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });


//Fetch Weather API

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '258e751b72msh28144c8dc4161b8p10a5f5jsn342f1088c947',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Argentina', options)
	.then(response => response.json())
	.then(response => {console.log(response)
    const weatherContainer = document.querySelector('.weather .contenedor');

    weatherContainer.innerHTML = 
    `
        <h2>${response.current.condition.text}</h2>
        <img src="${response.current.condition.icon}" />
        <p>${response.location.name}</p>
        <p>${response.location.localtime}</p>
    `

    })
	.catch(err => console.error(err));


