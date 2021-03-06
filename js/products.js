//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const PRODUCTS_AS = "Ascendente";
const PRODUCTS_DES = "Descendente";
const PROD_RE = "Relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//funcion q ordena los productos en AS, DES y RE===========================================================================
function sortProducts(criteria, array) {
    let result = [];

    if (criteria === PRODUCTS_AS) {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost)
            let bCost = parseInt(b.cost)
            return aCost - bCost;
        });

    } else if (criteria === PRODUCTS_DES) {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost)
            let bCost = parseInt(b.cost)
            return bCost - aCost;


        });
    } else if (criteria === PROD_RE) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;

        });

    };
    return result;
};
//funcion q muestra los productos q estan en le Json====================================================================
function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
            <div class="col-lg-3 col-sm-12">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail card-img-top">
                    <div class="card-body">
                        <div class="d-flex w-100 justify-content-between">    
                          <h4 class="mb-1">` + product.name + `</h4>
                        </div>
                        <div>
                         <p class="card-text">` + product.description + ` </p>
                        </div>


                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                 <h3>` + product.currency + " " + product.cost + `</h3>
                             </div>
                            <small class="text-muted">` + product.soldCount + `vendidos</small>
                        </div>
                    </div>
                </a>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
};

//funcion q muestra los productos ordenados////////////////////////////////////////////////////////////////////////////////////////////////
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList(currentProductsArray);
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(PRODUCTS_AS, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(PRODUCTS_AS);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(PRODUCTS_DES);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(PROD_RE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
});
document.getElementById("rangeFilterCount").addEventListener("click", function() {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    } else {
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    } else {
        maxCount = undefined;
    }

    showProductsList();
});