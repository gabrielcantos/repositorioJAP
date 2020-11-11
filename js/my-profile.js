//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function(e) {
//     
// });

function DatosPerfil() {

    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let apellidoUsuario = document.getElementById("apellidoUsuario").value;
    let edadUsuario = document.getElementById("edadUsuario").value;
    let emailUsuario = document.getElementById("emailUsuario").value;
    let celularUsuario = document.getElementById("celularUsuario").value;

    let perfil =
        '{' +
        '"nombreUsuario":"' + nombreUsuario + '",' +
        '"apellidoUsuario":"' + apellidoUsuario + '",' +
        '"edadUsuario":"' + edadUsuario + '",' +
        '"emailUsuario":"' + emailUsuario + '",' +
        '"celularUsuario":"' + celularUsuario +
        '"}';
    window.localStorage.setItem("perfil", perfil);
}

document.addEventListener("DOMContentLoaded", function(e) {

    document.getElementById("guardarCambios").addEventListener("click", function() {
        DatosPerfil();
    })

    let perfilUsuario = JSON.parse(localStorage.getItem("perfil"));

    document.getElementById("nombreUsuario").value = perfilUsuario.nombreUsuario;
    document.getElementById("apellidoUsuario").value = perfilUsuario.apellidoUsuario;
    document.getElementById("edadUsuario").value = perfilUsuario.edadUsuario;
    document.getElementById("emailUsuario").value = perfilUsuario.emailUsuario;
    document.getElementById("celularUsuario").value = perfilUsuario.celularUsuario;




});