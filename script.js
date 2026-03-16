<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCAH-sgIsTke35M1WZE5mZqUu4OnxoYETw",
    authDomain: "registro-tareas-1915d.firebaseapp.com",
    databaseURL: "https://registro-tareas-1915d-default-rtdb.firebaseio.com",
    projectId: "registro-tareas-1915d",
    storageBucket: "registro-tareas-1915d.firebasestorage.app",
    messagingSenderId: "125646839483",
    appId: "1:125646839483:web:7a94914e78bc8aa00a139e",
    measurementId: "G-ES1PMTGN9T"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

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

db.push(tarea);

}

db.on("value", snapshot=>{

let datos = snapshot.val();

let tabla = document.getElementById("tabla");

tabla.innerHTML="";

for(let id in datos){

let t = datos[id];

tabla.innerHTML += `
<tr>

<td>
<input type="checkbox" class="check" value="${id}">
</td>

<td>${t.dia}</td>

<td contenteditable="true"
onblur="editar('${id}','tarea',this.innerText)">
${t.tarea}
</td>

<td contenteditable="true"
onblur="editar('${id}','descripcion',this.innerText)">
${t.descripcion}
</td>

<td contenteditable="true"
onblur="editar('${id}','inicio',this.innerText)">
${t.inicio}
</td>

<td contenteditable="true"
onblur="editar('${id}','fin',this.innerText)">
${t.fin}
</td>

<td>
<button onclick="eliminar('${id}')">Eliminar</button>
</td>

</tr>
`;

}

});

function editar(id,campo,valor){

db.child(id).update({
[campo]:valor
});

}

function eliminar(id){

db.child(id).remove();

}

function eliminarSeleccionadas(){

let checks = document.querySelectorAll(".check:checked");

checks.forEach(c=>{

db.child(c.value).remove();

});

}

function eliminarTodas(){

if(confirm("Eliminar todas las tareas?")){

db.remove();

}

}
