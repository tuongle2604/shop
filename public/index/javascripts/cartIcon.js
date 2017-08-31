$(document).ready(function(){
  if(localStorage.getItem('cart')){
    var retrievedObject = localStorage.getItem('cart');
    var arrCart = JSON.parse(retrievedObject);
    var html =`<span class="product-count">${arrCart.length}</span>`;
    var cart = document.getElementById("cartIcon");
    cart.innerHTML+=html;
  }
})
