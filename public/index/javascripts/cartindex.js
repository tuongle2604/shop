$(document).ready(function(){
  var elems = document.querySelectorAll('.add-to-cart-link');
  for (var i=elems.length; i--;) {
      elems[i].addEventListener('click', myFunc, false);
  }

  function myFunc() {
      if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem('cart')){
          var retrievedObject = localStorage.getItem('cart');
          var arrCart = JSON.parse(retrievedObject);
          var flag = 0;
          var name = this.parentNode.parentNode.parentNode.children[1].children[0].innerHTML;
          for(var i=0;i<arrCart.length;i++){
            if(arrCart[i].name==name){
              flag=1;
            }
          }
          if(flag==0){
            var price = this.parentNode.parentNode.parentNode.children[2].children[0].innerHTML;
            price = price.slice(0,price.length-1);
            var img = this.parentNode.parentNode.parentNode.children[0].children[0].getAttribute("src");
            var id = this.parentNode.parentNode.parentNode .children[1].children[0].getAttribute("product-id");
            var cart = {'name':name,'price':price,'img':img,'sl':1,'id':id};
            arrCart.push(cart);
            localStorage.setItem('cart', JSON.stringify(arrCart));
          }
          this.innerHTML = 'đã thêm vào giỏ hàng';

          //cart icon
          var cart = document.getElementById("cartIcon");
          console.log(cart.children[2].innerHTML);
          cart.children[2].innerHTML=Number(cart.children[2].innerHTML)+1;
        }else{
          var arrCart = [];
          var name = this.parentNode.parentNode.parentNode .children[1].children[0].innerHTML;
          var price = this.parentNode.parentNode.parentNode.children[2].children[0].innerHTML;
          price = price.slice(0,price.length-1);
          var img = this.parentNode.parentNode.parentNode.children[0].children[0].getAttribute("src");
          var id = this.parentNode.parentNode.parentNode .children[1].children[0].getAttribute("product-id");
          var cart = {'name':name,'price':price,'img':img,'sl':1,'id':id};
          arrCart.push(cart)
          localStorage.setItem('cart', JSON.stringify(arrCart));
          this.innerHTML = 'đã thêm vào giỏ hàng';

          //cart icon
          var html =`<span class="product-count">1</span>`;
          var cart = document.getElementById("cartIcon");
          cart.innerHTML+=html;
        }
      }else {
        alert("trinh duyet khong ho tro");
      }
  }
});
