const btnAgregar = document.querySelector(".btn-add-class")
const btnCerrar = document.querySelector(".btn-close")
const modalContainer = document.querySelector(".modal-container")
const btnGuardar = document.getElementById("btn-guardar")
const matInp = document.getElementById("matInp")
const priceInp = document.getElementById("priceInp")
const descInp = document.getElementById("descInp")
const presencial = document.getElementById("presencial")
const virtual = document.getElementById("virtual")
const clasesProf = document.getElementById("professor-classes")
const panelHeader = document.querySelector("panel-header")

//funciones
const guardarClase = () => {
    // Validar que todos los campos estén completos
    if (
      !matInp.value.trim() ||
      !descInp.value.trim() ||
      !priceInp.value.trim() ||
      (!presencial.checked && !virtual.checked)
    ) {
      alert("Completa todos los campos");
      return;
    }
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    
    const clase = {
      provincia: user.ubicacion,
      materia: matInp.value,
      precio: priceInp.value,
      presencial: presencial.checked,
      virtual: virtual.checked,
      duracion: "1h",
      profesor: user.nombre,
      descripcion: descInp.value,
      telefono: user.phone
    };
    
    // Obtener clases existentes del localStorage o crear un array vacío
    const clasesGuardadas = JSON.parse(localStorage.getItem("clases")) || [];

    // Agregar la nueva clase
    clasesGuardadas.push(clase);

    // Guardar en localStorage
    localStorage.setItem("clases", JSON.stringify(clasesGuardadas));
    mostrarClases();

    console.log("Clase guardada:", clase);
    modalContainer.style.display = "none"
  }

const mostrarClases = () => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));

    const clasesGuardadas = JSON.parse(localStorage.getItem("clases")) || [];
    // Filtrar solo las clases del profesor actual
    const clasesDelProfesor = clasesGuardadas.filter(clase => clase.profesor === user.nombre);

    // Limpiar el contenedor antes de mostrar
    clasesProf.innerHTML = "";

    if (clasesDelProfesor.length === 0) {
        clasesProf.innerHTML = "<p>No se encontraron clases.</p>";
    } else {

    // Mostrar cada clase
    clasesDelProfesor.forEach(clase => {
      const claseDiv = document.createElement("div");
      claseDiv.className = "clase";
      claseDiv.innerHTML = `
      <div class="clase-header">
        <div>
            <h4 class="clase-titulo">${clase.materia}</h4>
        </div>
        <div class="clase-price">
            <span class="price-amount">$${clase.precio}</span>
            <span class="price-period">por clase</span>
        </div>
    </div>
    <div class="clase-description">
        <p>${clase.descripcion}</p>
    </div>
    <div class="clase-details">

        <div class="detail-item">
            <i class="fa fa-clock-o"></i>
            <span>Duración: ${clase.duracion}</span>
        </div>
        <div class="clase-modality">
            ${clase.presencial ? '<span class="modality-tag modality-presencial">Presencial</span>' : ''}
            ${clase.virtual ? '<span class="modality-tag modality-virtual">Virtual</span>' : ''}
        </div>
    </div>
      `;
      clasesProf.appendChild(claseDiv);
    });
    }
};

const borrarClases = () => {
    localStorage.removeItem("clases");
    mostrarClases();
}

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('loggedUser');
  window.location.href = 'login.html';
});


btnAgregar.addEventListener("click",()=>{
    modalContainer.style.display = "flex";
    console.log("Modal abierto")
})

btnCerrar.addEventListener("click",()=>{
    modalContainer.style.display = "none";
    borrarClases()
})

btnGuardar.addEventListener("click",guardarClase)

document.addEventListener("DOMContentLoaded", mostrarClases);