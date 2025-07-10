const selectProv = document.getElementById("selectProvincia")
const inpMateria = document.getElementById("inpMateria")
const checkPresencial = document.getElementById("presencial")
const checkVirtual = document.getElementById("virtual")
const btnBuscar = document.getElementById("btnBuscar")
const provinciasArr = ["Mendoza","Buenos Aires"]
const resultadosSect = document.getElementById("resultados")

const createSearch = () => {
    const search = {
        provincia: selectProv.value,
        materia: inpMateria.value.toLowerCase().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        presencial: checkPresencial.checked,
        virtual: checkVirtual.checked
    }
    try {
        const clases = JSON.parse(localStorage.getItem("clases")) || [];


        const coincidencias = clases.filter((clase) => {
            return (
                clase.provincia === search.provincia &&
                clase.materia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.materia) &&
                ((search.presencial && clase.presencial) || (search.virtual && clase.virtual) || (!search.presencial && !search.virtual))
            );
        });

        // Limpia resultados anteriores
        resultadosSect.innerHTML = "";

        if (coincidencias.length === 0) {
            resultadosSect.innerHTML = "<p>No se encontraron clases.</p>";
        } else {
            coincidencias.forEach(coincidencia => {
                const div = document.createElement("div");
                div.className = "clase";
                div.innerHTML = `
                    <div class="clase-header">
                        <div>
                            <h4 class="clase-titulo">${coincidencia.materia}</h4>
                            <div class="clase-location">
                                <i class="fa fa-user"></i>
                                <span>Prof. ${coincidencia.profesor}</span>
                            </div>
                            <div class="clase-location">
                                <i class="fa fa-map-marker"></i>
                                <span>${coincidencia.provincia}</span>
                            </div>
                        </div>
                        <div class="clase-price">
                            <span class="price-amount">$${coincidencia.precio}</span>
                            <span class="price-period">por clase</span>
                        </div>
                    </div>
                    
                    <div class="clase-description">
                        <p>${coincidencia.descripcion}</p>
                    </div>
                    
                    <div class="clase-details">
                        <div class="detail-item">
                            <i class="fa fa-clock-o"></i>
                            <span>Duración: ${coincidencia.duracion}</span>
                        </div>
                        <div class="clase-modality">
                            ${coincidencia.presencial ? '<span class="modality-tag modality-presencial">Presencial</span>' : ''}
                            ${coincidencia.virtual ? '<span class="modality-tag modality-virtual">Virtual</span>' : ''}
                        </div>
                    </div>
                    
                    <div class="clase-footer">
                        <a href="https://wa.me/${coincidencia.telefono}?text=Hola vengo de BuscaTuProfe! Me interesa la clase de ${coincidencia.materia}" target="_blank" class="whatsapp-btn">
                            <i class="fa fa-whatsapp"></i>
                            Contactar por WhatsApp
                        </a>
                    </div>
                `;
                resultadosSect.appendChild(div);
            });
        }
    } catch (error) {
        console.error("Error al leer el JSON:", error);
        resultadosSect.innerHTML = "<p>Error al cargar las clases.</p>";
    }

    console.log(search);
}

document.getElementById("inpMateria").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita el submit automático
      createSearch(); // Ejecuta tu búsqueda
    }
  });
  

selectProv.addEventListener("change", (event) => {
    console.log(event.target.value);
})

inpMateria.addEventListener("change", (event) => {
    console.log(event.target.value);
})

checkVirtual.addEventListener("change", (event) => {
    console.log(event.target.checked);
})

checkPresencial.addEventListener("change", (event) => {
    console.log(event.target.checked);
})

btnBuscar.addEventListener("click", createSearch)

