const input = document.getElementById("tareainput");
const boton = document.getElementById("agregar");
const lista = document.getElementById("lista-tareas");
const contador = document.getElementById("contador");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function actualizarContador() {
  contador.textContent = `Tareas: ${tareas.length}`;
}

function crearTarea(tarea, index) {
  const li = document.createElement("li");
  li.textContent = tarea.texto;

  if (tarea.completada) {
    li.classList.add("completada");
  }

  li.addEventListener("click", () => {
    tareas[index].completada = !tareas[index].completada;
    guardarTareas();
    mostrarTareas();
  });

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "❌";
  btnBorrar.style.marginLeft = "10px";

  btnBorrar.addEventListener("click", (e) => {
    e.stopPropagation();
    tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
  });

  li.appendChild(btnBorrar);
  lista.appendChild(li);
}

function mostrarTareas() {
  lista.innerHTML = "";
  tareas.forEach((tarea, index) => crearTarea(tarea, index));
  actualizarContador();
}

boton.addEventListener("click", () => {
  if (input.value === "") return;

  tareas.push({
    texto: input.value,
    completada: false
  });

  input.value = "";
  guardarTareas();
  mostrarTareas();
});

mostrarTareas();