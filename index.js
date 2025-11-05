const fechaHoy = new Date();
const opciones= {day: '2-digit', month:'2-digit',year:'numeric'}
document.getElementById('fecha').textContent =fechaHoy.toLocaleDateString('es-Es',opciones)

let vuelos =JSON.parse(localStorage.getItem('vuelos'))||[]

function guardarVuelos(){
    localStorage.setItem('vuelos',JSON.stringify(vuelos))
}

function mostrarVuelos(){
    const lista = document.getElementById('listaVuelos')
    lista.innerHTML='';
    vuelos.forEach((vuelo,index) => {
        const div = document.createElement('div')
        div.className='card';
        div.innerHTML=`
        <span> Numero :${vuelo.numero} - Destino : ${vuelo.destino} -Estado: ${vuelo.estado}
         <div class="actions">
            <button onClick="editarVuelo(${index})"><i class="fa-solid fa-pencil"></i></button>
            <button onClick="eliminarVuelo(${index})"><i class="fa-solid fa-x"></i></button>
            <button onClick="cambiarEstado(${index})""><i class="fa-solid fa-rotate"></i></button>
        </div>
        `
        lista.appendChild(div);
    });
}

function agregarVuelo(){
    const numero = document.getElementById('mumeroRobot').value
    const destino = document.getElementById('tipo').value

    if(numero && destino){
        vuelos.push({numero,destino,estado:'programado'})
        guardarVuelos();
        mostrarVuelos();
        document.getElementById('numeroVuelo').value=''
        document.getElementById('destinoVuelo').value=''
    }
}

function editarVuelo(index){
    const vuelo= vuelos[index]
    const nuevoVuelo= prompt('Nuevo numero de vuelo', vuelo.numero)
    const nuevoDestino = prompt('Nuevo destino : ', vuelo.destino)
    if(nuevoDestino&& nuevoVuelo){
        vuelos[index].numero = nuevoVuelo;
        vuelos[index].destino =nuevoDestino;
        guardarVuelos()
        mostrarVuelos()
    }
}

function eliminarVuelo(index){
    if(confirm('Desea elminar el vuelo ?')){
        vuelos.splice(index,1)
        guardarVuelos();
        mostrarVuelos();
    }

}


function cambiarEstado(index){
    const estados =['programado','abordando','finalizado','cancelado']
    let estadoActual =vuelos[index].estado
    let nuevoEstado =estados[(estados.indexOf(estadoActual)+1) % estados.length]
    vuelos[index].estado=nuevoEstado
    guardarVuelos()
    mostrarVuelos()
}