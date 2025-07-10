const btnBuscarClase = document.querySelector(".btn-primary");
const btnSoyProfe = document.querySelector(".btn-secondary");

btnBuscarClase.addEventListener("click", function () {
    window.location.href = 'clases.html'; // redirige a otra página
  });


btnSoyProfe.addEventListener("click", function () {
  window.location.href = 'profes.html'; // redirige a otra página
});



