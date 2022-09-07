import {DBStore} from "./Data.js";

const content_Products = document.querySelector(".contentProducts");

let sethtml = ``

// llenado de mi HTML dinamicamente con parametros que tengo en la base de datos que cree en Data.js
DBStore.forEach (({id, name, ImgProduct, stock, Price}) =>  {

    sethtml += `
    <div class="Products">
        <div class="contentProducts-img">
            <img src="${ImgProduct}" alt="${ImgProduct}">
        </div>
        <div class="contentProducts-features" id= "${id}">
            <h2 class="contentProducts-features-tittle">${name}</h2>
            <p>Stock: ${stock}</p>
            <p>Price: ${Price}</p>
            <button class="btn btn-add"> Agregar al carrito</button>
        </div>
    </div>
`
});
// Insercion de datos hacia el HTML con el innerHTML
content_Products.innerHTML = sethtml;

// Show or Hidden el contenedor del carrito
const iconCart = document.querySelector("#CartSvg");
const cartProducts = document.querySelector("#cartProducts");

iconCart.addEventListener ("click", () => {
    cartProducts.classList.toggle("cart-Products-show");
})