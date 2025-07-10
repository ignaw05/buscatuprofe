const btnAgregar = document.querySelector(".btn-add-class")
const btnCerrar = document.querySelector(".btn-close")
const modalContainer = document.querySelector(".modal-container")
const btnGuardar = document.getElementById("btn-guardar")
const matInp = document.getElementById("matInp")
const priceInp = document.getElementById("priceInp")
const descInp = document.getElementById("descInp")
const presencial = document.getElementById("presencial")
const virtual = document.getElementById("virtual")

//funciones
const guardarClase = () => {
    if (matInp && descInp && priceInp){
        const clase = {
            "provincia": "Mendoza",
            "materia": matInp.value,
            "precio": priceInp.value,
            "presencial": presencial.checked,
            "virtual": virtual.checked,
            "duracion": "1h",
            "profesor": "Ignacio W.",
            "descripcion": descInp.value,
            "telefono": "+5492612514127"
        }
        console.log(clase)
    }
}

btnAgregar.addEventListener("click",()=>{
    modalContainer.style.display = "flex";
    console.log("Modal abierto")
})

btnCerrar.addEventListener("click",()=>{
    modalContainer.style.display = "none"
})

btnGuardar.addEventListener("click",guardarClase)

// const agregarClase = () => {

// }