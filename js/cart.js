let arrayArticulos = [];
let subtotaltotal = 0;
// hace la operacion correspondiente para calcular el subtotal de los productos y tambien la conversion de dolares a pesos uruguayos
function calcularSubTotal(cantidad, index) {
    let sub = 0;
    if (arrayArticulos[index].currency === "USD") {
        sub = arrayArticulos[index].unitCost * cantidad * 40;

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
    document.getElementById("subtotal").innerHTML = "UYU" + subtotal;
    subtotaltotal = subtotal;

}


//calcula el total de todos los productos juntos y los ingresa en la parte inferior del html
function calcularTotal() {
    let total = subtotaltotal;
    document.getElementById("total").innerHTML = "UYU" + total;
}



// muestra los productos del Json y llama las funciones de calcular total de todos los productos, calcular subtotal de todos los productos y la de actualizar en tiempo real el subtotal y total
function showArticulos(array) {
    let htmlToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];
        htmlToAppend += `
        <div>
            <tr>
                <td><img src="` + producto.src + `" width="100px"></td>
                <td> ` + producto.name + ` </td>
                <td> ` + producto.currency + producto.unitCost + ` </td>
                <td> <input class= "cantidadProducto" type="number" min="1"  id="productCount-${i}" value="` + producto.count + `"style="width:47px"> </td>
                <td> <span id= "productoSubTotal-${i}">` + producto.currency + producto.unitCost * producto.count + `</span> </td>
            </tr>
        
        </div>
        `

    }
    document.getElementById("cart-products").innerHTML = htmlToAppend;
    addEventCount();
    updateAllSubTotal();
    calcularTotal();

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