var productComments = {};
var relatedList = {};

var products = {};
const maxScore = 5;


//funcion para agregar Comentario() {
document.getElementById("add-comment-btn").addEventListener("click", function() {

    var today = new Date();
    var mes = parseInt(today.getMonth() + 1);

    if (mes < 10) {
        mes = "0" + mes
    }

    today = today.getFullYear() + '-' + mes + '-' + today.getDate() + '  ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let usuario = localStorage.getItem("usuario");

    let newComment = document.getElementById("add-comment-text").value;


    let newScore = htmlscore;

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
//funcion para mostrar la imagenes en formato de galería ////////////////////////////////////////////////////////////////////////////////////////
function showProductsInfo(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imagesSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div>
                <img class="img-fluid img-thumbnail" src="` + imagesSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesWrapper").innerHTML = htmlContentToAppend;
    }


}
// funcion para mostrar los comentarios////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function add(score) {


    for (var i = 1; i <= maxScore; i++) {
        var cur = document.getElementById("star" + i)
        cur.className = "fa fa-star"
    }

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

                htmlRelatedProducts += ` 
                <div class = "col-lg-3 col-md-4 col-6 border" >
                    <div id = "relatedProductsContainer"class = "row" >
                     <img class = "img-fluid p-2" src = "` + relatedProducts.imgSrc + `" >
                    </div>
                                        
                    <div id = "relatedProductsContainer"class = "row p-2" >
                        <p>` + relatedProducts.name + ` </p>  
                        <p> ` + relatedProducts.description + ` </p>
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


//
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

            //Muestro las imagenes y los productos relacionados 
            showProductsInfo(product.images);
            showRelatedProducts(product.relatedProducts);
            showCommentsList(productComments)
        }
    })
});


//¡¡¡¡ESTRELLAS!!!!===================================================================================================================================
function showScore(score) {

    let stars = "";


    for (let i = 1; i <= maxScore; i++) {
        if (i <= score) {
            stars += '<i class="fa fa-star checked"></i>';
        } else {
            stars += '<i class="fa fa-star"></i>';
        }
    }

    htmlscore = `<span>  ${stars}</span>`
    return htmlscore;




}