const fechaHoy = new Date();
const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
document.getElementById('fecha').textContent = fechaHoy.toLocaleDateString('es-ES', opciones);

let robots = JSON.parse(localStorage.getItem('robots')) || [];

function guardarRobots() {
    localStorage.setItem('robots', JSON.stringify(robots));
}

function mostrarRobots() {
    const lista = document.getElementById('listaRobots');
    lista.innerHTML = '';
    robots.forEach((robot, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <span>Código: ${robot.codigo} - Tipo: ${robot.tipo} - Estado: ${robot.estado}</span>
        <div class="actions">
            <button onClick="editarRobot(${index})"><i class="fa-solid fa-pencil"></i></button>
            <button onClick="eliminarRobot(${index})"><i class="fa-solid fa-x"></i></button>
            <button onClick="cambiarEstadoRobot(${index})"><i class="fa-solid fa-rotate"></i></button>
        </div>
        `;
        lista.appendChild(div);
    });
}

function registrarRobot() {
    const codigo = document.getElementById('codigoRobot').value;
    const tipo = document.getElementById('tipoRobot').value;

    if (codigo && tipo) {
        robots.push({ codigo, tipo, estado: 'activo' });
        guardarRobots();
        mostrarRobots();
        document.getElementById('codigoRobot').value = '';
        document.getElementById('tipoRobot').value = '';
    }
}

function editarRobot(index) {
    const robot = robots[index];
    const nuevoCodigo = prompt('Nuevo código del robot:', robot.codigo);
    const nuevoTipo = prompt('Nuevo tipo de robot:', robot.tipo);
    if (nuevoCodigo && nuevoTipo) {
        robots[index].codigo = nuevoCodigo;
        robots[index].tipo = nuevoTipo;
        guardarRobots();
        mostrarRobots();
    }
}

function eliminarRobot(index) {
    if (confirm('¿Desea eliminar este robot?')) {
        robots.splice(index, 1);
        guardarRobots();
        mostrarRobots();
    }
}

function cambiarEstadoRobot(index) {
    const estados = ['activo', 'en mantenimiento', 'inactivo'];
    let estadoActual = robots[index].estado;
    let nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];
    robots[index].estado = nuevoEstado;
    guardarRobots();
    mostrarRobots();
}
mostrarRobots();

//usuario

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function guardarUsuario() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function mostrarUsuario() {
    const lista = document.getElementById('listaUsuario');
    lista.innerHTML = '';
    usuarios.forEach((usuario, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <span>Nombre: ${usuario.nombre} - Especialidad: ${usuario.especialidad} - Estado: ${usuario.estado}</span>
        <div class="actions">
            <button onClick="editarUsuario(${index})"><i class="fa-solid fa-pencil"></i></button>
            <button onClick="eliminarUsuario(${index})"><i class="fa-solid fa-x"></i></button>
            <button onClick="cambiarEstadoUsuario(${index})"><i class="fa-solid fa-rotate"></i></button>
        </div>
        `;
        lista.appendChild(div);
    });
}

function registrarUsuario() {
    const nombre  = document.getElementById('nombreIng').value;
    const especialidad = document.getElementById('EspecialidadIng').value;

    if (nombre && especialidad) {
        usuarios.push({ nombre , especialidad , estado: 'Activo' });
        guardarUsuario();
        mostrarUsuario();
        document.getElementById('nombreIng').value = '';
        document.getElementById('EspecialidadIng').value = '';
    }
}

function editarUsuario(index) {
    const usuario = usuarios[index];
    const nuevoNombre = prompt('Nuevo nombre del usuario:', usuario.nombre);
    const nuevaEspecialidad  = prompt('Nuevo tipo de usuario:', usuario.especialidad);
    if (nuevoNombre  && nuevaEspecialidad) {
        usuarios[index].nombre = nuevoNombre;
        usuarios[index].especialidad = nuevaEspecialidad;
        guardarUsuario();
        mostrarUsuario();
    }
}

function eliminarUsuario(index) {
    if (confirm('¿Desea eliminar este usuario?')) {
        usuarios.splice(index, 1);
        guardarUsuario();
        mostrarUsuario();
    }
}

function cambiarEstadoUsuario(index) {
    const estados = ['activo', 'inactivo'];
    let estadoActual = usuarios[index].estado;
    let nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];
    usuarios[index].estado = nuevoEstado;
    guardarUsuario();
    mostrarUsuario();
}
mostrarUsuario();
