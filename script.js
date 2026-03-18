const firebaseConfig = {
  apiKey: "AIzaSyCAH-sgIsTke35M1WZE5mZqUu4OnxoYETw",
  authDomain: "registro-tareas-1915d.firebaseapp.com",
  databaseURL: "https://registro-tareas-1915d-default-rtdb.firebaseio.com/",
  projectId: "registro-tareas-1915d",
  storageBucket: "registro-tareas-1915d.appspot.com",
  messagingSenderId: "125646839483",
  appId: "1:125646839483:web:7a94914e78bc8aa00a139e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("tareas");

function guardar(){

let tarea = {
dia: document.getElementById("dia").value,
tarea: document.getElementById("tarea").value,
descripcion: document.getElementById("descripcion").value,
inicio: document.getElementById("inicio").value,
fin: document.getElementById("fin").value
};

if(editandoId){

db.child(editandoId).update(tarea);
editandoId = null;

}else{

db.push(tarea);

}

limpiarFormulario();

}

function limpiarFormulario(){

document.getElementById("dia").value="";
document.getElementById("tarea").value="";
document.getElementById("descripcion").value="";
document.getElementById("inicio").value="";
document.getElementById("fin").value="";

}

function formatoHora(hora){

if(!hora) return "";

let [h,m] = hora.split(":");
h = parseInt(h);

let ampm = h >= 12 ? "PM" : "AM";
h = h % 12 || 12;

return `${h}:${m} ${ampm}`;
}

function calcularHoras(inicio,fin){

if(!inicio || !fin) return "";

let [h1,m1] = inicio.split(":").map(Number);
let [h2,m2] = fin.split(":").map(Number);

let inicioMin = h1*60 + m1;
let finMin = h2*60 + m2;

let diff = finMin - inicioMin;

let horas = Math.floor(diff/60);
let min = diff % 60;

return `${horas}h ${min}m`;
}

db.on("value", snapshot=>{

let datos = snapshot.val();

let tabla = document.getElementById("tabla");

tabla.innerHTML="";
  
let totalMinutos = 0;
  
for(let id in datos){

let t = datos[id];

if(t.inicio && t.fin){

  let [h1,m1] = t.inicio.split(":").map(Number);
  let [h2,m2] = t.fin.split(":").map(Number);

  let inicioMin = h1 * 60 + m1;
  let finMin = h2 * 60 + m2;

  let diferencia = finMin - inicioMin;

  totalMinutos += diferencia;
}

tabla.innerHTML += `
<tr>

<td>${t.dia}</td>
<td>${t.tarea}</td>
<td>${t.descripcion}</td>
<td>${formatoHora(t.inicio)}</td>
<td>${formatoHora(t.fin)}</td>
<td>${calcularHoras(t.inicio,t.fin)}</td>

<td>
<button onclick="cargarEditar('${id}')">Editar</button>
<button onclick="eliminar('${id}')">Eliminar</button>
</td>

</tr>
`;

}

  let horas = Math.floor(totalMinutos / 60);
let minutos = totalMinutos % 60;

document.getElementById("totalHoras").innerText =
  horas + " h, " + minutos + " min";

});

function editar(id,campo,valor){

db.child(id).update({
[campo]:valor
});

}

function eliminar(id){

db.child(id).remove();

}

let editandoId = null;

function cargarEditar(id){

db.child(id).once("value", snap=>{

let t = snap.val();

document.getElementById("dia").value = t.dia;
document.getElementById("tarea").value = t.tarea;
document.getElementById("descripcion").value = t.descripcion;
document.getElementById("inicio").value = t.inicio;
document.getElementById("fin").value = t.fin;

editandoId = id;

});

}


