import {DBStore} from "./Data.js";

// hago busqueda de mis clases para poder utilizarlas en JS
const content_Products = document.querySelector(".contentProducts");
const CartProductsBody = document.querySelector(".cartProducts-body")


let sethtml = ``;
let Cart = {};

// voy a agregar los productos a mi contenedor del carro

function ProductsinMyCar() {
    const counting =document.querySelector("#Counting")
    const TotalProducts = document.querySelector(".Total_Products")
    let sethtml = ""; 
    let CountingCart = 0;
    let TotalSum = 0;
    // Convierto en arreglo mi Objeto para poderlo recorrerlo 
    const ArrayCart = Object.values(Cart);

    ArrayCart.forEach(({id, name, ImgProduct, amount, Price}) => {
        CountingCart +=amount;
        TotalSum += amount *Price;
        sethtml += 
        `
        <div class="item_cart">
            <div class="cartProduct-img">
                <img src="${ImgProduct}" alt="${ImgProduct}">
            </div>
            <h3>${name}</h3>
            <div class="cartProduct-DeleteOrAdd" id="${id}">
                <i class='bx bxs-no-entry bx-flip-horizontal' ></i>
                <span id="amount">${amount}</span>
                <i class='bx bx-cart-add bx-burst' ></i>                
                <i class='bx bxs-trash bx-tada' ></i>
            </div>
        </div>
        `
    });

    counting.textContent = CountingCart;
    TotalProducts.innerHTML = 
    `
    <h3>Total: </h3>
    <h3>$ ${TotalSum} COP</h3>
    `;
    CartProductsBody.innerHTML = sethtml;
}
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
const lowercontainer = document.querySelector("#container");
const footer = document.querySelector("#footeer");


iconCart.addEventListener ("click", () => {
    cartProducts.classList.toggle("cartProducts-show");
    lowercontainer.classList.toggle("container-show");
    footer.classList.toggle("footer-show")
});

content_Products.addEventListener("click", (e)=>{
    let idProduct ;
    let findProduct;
    if (e.target.classList.contains("btn-add")){
        idProduct = Number(e.target.parentElement.id);
        findProduct = DBStore.find((item) => item.id === idProduct);

        if (Cart[idProduct] ) {
            Cart[idProduct].amount++;
        } else{
            Cart[idProduct] = findProduct;
            Cart[idProduct].amount = 1;
        }
        if (Cart[idProduct].amount > Cart[idProduct].stock ) {
            return alert ("Oye ya no tengo mas en stock, revisa otros productos de nuestra tienda. 👍")
        } 
        ProductsinMyCar();
    }
})

CartProductsBody.addEventListener("click", (e)=>{
    let idProduct;
    if (e.target.classList.contains("bxs-no-entry")) {
        idProduct = e.target.parentElement.id;
        if (Cart[idProduct].amount === 1) {
            delete Cart[idProduct];
        } else {
            Cart[idProduct].amount--;
        }
    }
    if (e.target.classList.contains("bx-cart-add")) {
        const idProduct = e.target.parentElement.id;
        if (Cart[idProduct].amount >= Cart[idProduct].stock ) {
            alert ("Oye ya no tengo mas en stock, revisa otros productos de nuestra tienda. 👍")
        } else {
            Cart[idProduct].amount++;
        }
    }
    if (e.target.classList.contains("bxs-trash")) {
        const idProduct = e.target.parentElement.id;
        delete Cart[idProduct];
    }
    ProductsinMyCar()
})