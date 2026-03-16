const firebaseConfig = {

apiKey: "AQUI",
authDomain: "AQUI",
databaseURL: "AQUI",
projectId: "AQUI"

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
