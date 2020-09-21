var productComments = {};
var relatedList = {};

var products = {};
const maxScore = 5;


// agregar Comentario===========================================================================
document.getElementById("add-comment-btn").addEventListener("click", function() {
    //uso la clase Date de js para obtener la hora actual
    var today = new Date();
    var mes = parseInt(today.getMonth() + 1);
    var mes = parseInt(today.getMonth() + 1);

    if (mes < 10) {
        mes = "0" + mes
    }
    // separo la fecha para que me muestre en orden dd/mm/aaaa y hh/mm/ss
    today = today.getFullYear() + '-' + mes + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //obtengo el usuario del localstorage               
    let usuario = localStorage.getItem("usuario");

    let newComment = document.getElementById("add-comment-text").value;


    let newScore = htmlscore;
    //armo el html con estilos para q se vea bien
    let htmlContentToAppend = ` 
    <div class="d-flex w-100 ">  
            <h4 class="mb-1"> ` + usuario + `</h4> 
            <h6 id="estrellas">` + newScore + `</h6> <hr>
            
            <h6 class="text-muted">` + newComment + `</h6><hr>
            <p class="mb-6">` + today + `</p>  
    </div>    
    `
    document.getElementById("comentarios").innerHTML += htmlContentToAppend;


});


// funcion para mostrar los comentarios del Json////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showCommentsList() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
            let htmlComments = "";
            for (let i = 0; i < productComments.length; i++) {
                let comment = productComments[i];
                htmlComments += `
                 <div class="d-flex w-100 ">    
                    <h4 class="mb-1">` + comment.user + " " + `</h4>
                    <h6 id="estrellas">` + showScore(comment.score) + `</h6> <hr>
                    <h6 class="text-muted">` + comment.description + ` </h6><hr>
                    <p class="mb-6">` + comment.dateTime + `</p>
                 </div>
                `
            }
            document.getElementById("comentarios").innerHTML += htmlComments;
        }


    });
}
//funcion para elegir puntuacion en formato de estrellas============================================================
function add(score) {


    for (var i = 1; i <= maxScore; i++) {
        var cur = document.getElementById("star" + i)
        cur.className = "fa fa-star"
    }
    showScore(score)
    for (var i = 1; i <= score; i++) {
        var cur = document.getElementById("star" + i)
        if (cur.className == "fa fa-star") {
            cur.className = "fa fa-star checked"
        }

    }

    showScore(score);

}

//PRODUCTOS RELACIONADOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showRelatedProducts(relatedProductsArray) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            relatedList = resultObj.data;

            let htmlRelatedProducts = "";

            for (let i = 0; i < relatedProductsArray.length; i++) {
                let relatedProductsPosition = relatedProductsArray[i];
                let relatedProducts = relatedList[relatedProductsPosition];
                //creo la estructura de los relacionados con sus estilos
                htmlRelatedProducts += ` 
                <div class = "col-lg-3 col-md-4 col-6 border" >
                    <div id = "relatedProductsContainer"class = "row" >
                     <img class = "img-fluid p-2" src = "` + relatedProducts.imgSrc + `" >
                    </div>
                                        
                    <div id = "relatedProductsContainer"class = "row p-2" >
                        <p>` + relatedProducts.name + ` </p>  
                        <p>` + relatedProducts.description + ` </p>
                    </div> 
                    <div class = "row p-2">
                        <a href = "product-info.html" > Ver </a> 
                    </div>   
                </div>`
            }
            document.getElementById("relatedProductsContainer").innerHTML = htmlRelatedProducts;
        }
    })
}


//muestra toda la info del JSon sobre el producto===================================================================
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");


            // muestro la info que esta en el Json de products_info_url
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCurrencyHTML.innerHTML = product.currency;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.cost;

            //Muestro los productos relacionados y los comentarios

            showRelatedProducts(product.relatedProducts);
            showCommentsList(productComments)
        }

    })
});


//funcion q muestra las estrellas e interpreta cuantas se seleccionaron cuando se hace un comentario===================================================================================================================================
function showScore(score) {

    let stars = "";


    for (let i = 1; i <= maxScore; i++) {
        if (i <= score) {
            stars += '<i class="fa fa-star checked"></i>';

        } else {
            stars += '<i class="fa fa-star"></i>';

        }

    }



    htmlscore = `<span>  ${stars} </span>`
    return htmlscore;


}