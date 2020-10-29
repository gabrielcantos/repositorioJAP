let arrayArticulos = [];
let subtotaltotal = 0;
let NTarjeta = false;
let TBancaria = false;
let totalMasEnvio = 0;
var Checked = 0;

let NT = document.getElementById("Ntarjeta");
let Cod = document.getElementById("Seguridad");
let Ven = document.getElementById("Vencimiento");
let NC = document.getElementById("Ncuenta");

let calle = document.getElementById("calle");
let esquina = document.getElementById("esq");
let numero = document.getElementById("num");

// hace la operacion correspondiente para calcular el subtotal de los productos y tambien la conversion de dolares a pesos uruguayos
function calcularSubTotal(cantidad, index) {
    let sub = 0;
    if (arrayArticulos[index].currency === "USD") {
        sub = arrayArticulos[index].unitCost * cantidad;

    } else {
        sub = arrayArticulos[index].unitCost * cantidad;
    }
    return sub;
}


//cada vez q cambia algo en el input llama a las funciones de calcular el subtotal y el total nuevamente para actualizar a tiempo real
function addEventCount() {
    let subtotalArray = document.getElementsByClassName("cantidadProducto");
    for (let i = 0; i < subtotalArray.length; i++) {
        subtotalArray[i].addEventListener("change", function() {
            document.getElementById("productoSubTotal-" + i).innerHTML = arrayArticulos[i].currency + " " + subtotalArray[i].value * arrayArticulos[i].unitCost;
            updateAllSubTotal();
            calcularTotal();
        });

    }


}

// calcula el subtotal de todos los productos juntos y los ingresa en la parte inferior del html
function updateAllSubTotal() {
    let subtotalArray = document.getElementsByClassName("cantidadProducto");
    let subtotal = 0;
    for (let i = 0; i < subtotalArray.length; i++) {
        subtotal += calcularSubTotal(subtotalArray[i].value, i);
    }
    document.getElementById("subtotal").innerHTML = "USD " + subtotal;
    subtotaltotal = subtotal;

}


//calcula el total de todos los productos juntos y los ingresa en la parte inferior del html
function calcularTotal() {
    let total = subtotaltotal;
    document.getElementById("total").innerHTML = "USD " + total;
}



// muestra los productos del Json y llama las funciones de calcular total de todos los productos, calcular subtotal de todos los productos y la de actualizar en tiempo real el subtotal y total
function showArticulos(array) {
    let htmlToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];
        htmlToAppend += `
        <div >
            <tr id="productos${i}">
                <td><img src="` + producto.src + `" width="100px"></td>
                <td> ` + producto.name + ` </td>
                <td> ` + producto.currency + producto.unitCost + ` </td>
                <td> <input class= "cantidadProducto" type="number" min="1"  id="productCount-${i}" value="` + producto.count + `"style="width:47px"> </td>
                <td> <span id= "productoSubTotal-${i}">` + producto.currency + producto.unitCost * producto.count + `</span>    </td>
               <td>  <img style= "height:50px" src="images/icons/papelera.png"  class="borrar">  </td>
            </tr>
          
        
        </div>
        `

    }
    document.getElementById("cart-products").innerHTML = htmlToAppend;
    addEventCount();
    updateAllSubTotal();
    calcularTotal();
    borrarArticulos();

}

//llama al Json y a la funcion que muestra los productos
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) { //cambié el link del json q estaba en el init por el que pasaron en el desafiante
        if (resultObj.status === "ok") {
            arrayArticulos = resultObj.data.articles;
            showArticulos(arrayArticulos);
        }
    })

});
//INTENTO DE DESAFIANTE
function borrarArticulos() {
    var eliminar = document.getElementsByClassName("borrar");
    var p = " "
    for (let i = 0; i < eliminar.length; i++) {
        eliminar[i].addEventListener("click", function() {
            document.getElementById("productos" + i).innerHTML = p;

        })
    }
}

//obtengo el valor del input elegido y realizo la respectiva cuenta para calcular el envio
document.getElementById("formularioEnvio").addEventListener("click", function(e) {
    Checked = document.querySelector('input[name="envio"]:checked');
    let Cenvio = 0

    if (Checked == Premium) {
        Cenvio = subtotaltotal * 0.15;
        totalMasEnvio = Cenvio;
        //actualiza el costo total en tiempo real al seleccionar un input diferente
        document.getElementById("total").innerHTML = "USD " + Cenvio;
    } else if (Checked == Express) {
        Cenvio = subtotaltotal * 0.07;
        totalMasEnvio = Cenvio;
        //actualiza el costo total en tiempo real al seleccionar un input diferente
        document.getElementById("total").innerHTML = "USD " + Cenvio;
    } else {
        Cenvio = subtotaltotal * 0.05;
        totalMasEnvio = Cenvio;
        //actualiza el costo total en tiempo real al seleccionar un input diferente
        document.getElementById("total").innerHTML = "USD " + Cenvio;
    }

});
// valida q uno d los radio buttons sea seleccionado 
document.getElementById("acepto").addEventListener("click", function() {
    if (NTarjeta == false && TBancaria == false) {
        document.getElementById("mensaje").innerHTML =
            `<div class="alert alert-danger alert-dismissable" id="alerta" style="width:36.5%; text-align:center;">
         <button type="button" class="close" data-dismiss="alert">&times;</button>
             <strong>¡ERROR!</strong> Seleccione una forma de pago.
                </div>`

    }
})






//bloquea los inputs de transferencia bancaria y verifica q el campo este con datos
document.getElementById("Tarjeta").addEventListener("click", function() {
        NTarjeta = true;
        TBancaria = false;
        NC.disabled = true;
        NT.disabled = false;
        Cod.disabled = false;
        Ven.disabled = false;
        document.getElementById("acepto").addEventListener("click", function() {
            if (NT.value != "" && Cod.value != "" && Ven.value != null) {
                document.getElementById("mensaje").innerHTML = `<div class="alert alert-success alert-dismissable" id="alerta" style="width:36.5%; text-align:center;">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>¡Felicitaciones!</strong> Datos completados con éxito.
              </div>`

            } else {
                document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger alert-dismissable" id="alerta" style="width:36.5%; text-align:center;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>¡ERROR!</strong> Complete todos los campos.
      </div>`

            }

        })
    })
    //bloquea los inputs de tarjeta de credito y verifica q el campo este con datos
document.getElementById("Trans").addEventListener("click", function() {
    NTarjeta = false;
    TBancaria = true;
    NC.disabled = false;
    NT.disabled = true;
    Cod.disabled = true;
    Ven.disabled = true;
    document.getElementById("acepto").addEventListener("click", function() {
        if (NC.value != "") {
            document.getElementById("mensaje").innerHTML = `<div class="alert alert-success alert-dismissable" id="alerta" style="width:36.5%; text-align:center;">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>¡Felicitaciones!</strong> Datos completados con éxito.
          </div>`

        } else {
            document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger alert-dismissable" id="alerta" style="width:36.5%; text-align:center;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>¡ERROR!</strong> Complete todos los campos.
         </div>`

        }

    })
})




//validacion de forms de direccion de envio


function validarEnvio() {
    if (calle.value == "" || esquina.value == "" || numero.value == "" || Checked == "") {
        document.getElementById("cartel").innerHTML = `<div class="alert alert-danger alert-dismissable" id="alerta" style="width:36.5%; text-align:center;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>¡ERROR!</strong> Termine de rellenar los campos.  
     </div>`

    } else {
        document.getElementById("cartel").innerHTML = `<div class="alert alert-success alert-dismissable" id="alerta" style="width:36.5%; text-align:center;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>¡Felicitaciones!</strong>  Datos completados con éxito.
      </div>`

    }

}

// function validaciontotal() {
//     if (calle.value == "" || esquina.value == "" || numero.value == "" || Checked == "" || TBancaria == false || NC.value != "") {
//         alert("sjnck bnksb n")
//     }

// }