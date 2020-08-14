//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
          
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <h4 class="mb-1">`+ product.description + `</h4>
                        <small class="text-muted">` + product.cost + ` </small>
                    </div>
                    <p>` +  product.currency + ` </p> 
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="">
                    </div>
                    <p>` + product.soldCount+ ` artículos</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
      
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
            
        }
        
    });

});