//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// document.addEventListener("DOMContentLoaded", function(e) {

// });

var usuarioA = "Anonimo"

//funcion para guardar el usuario ingresado
function guardar(user) {
    if (user.trim() === "") {
        document.getElementById("registro").innerHTML = usuarioA

    } else {
        localStorage.setItem("usuario", user.trim());

    }

}