// var socket = io('/cart');
//       socket.on('connect',function(){

        if (typeof(Storage) !== "undefined") {
          if(localStorage.getItem('cart')){
            var retrievedObject = localStorage.getItem('cart');
            var arrCart = JSON.parse(retrievedObject);
            var html ='';
            var totalAmount=0;
            for(var i=0;i<arrCart.length;i++){
              // var phonePrice = arrCart[i].price.slice(0,arrCart[i].price.length-1);
              // phonePrice = parseFloat(phonePrice)*1000000;
              totalAmount+=arrCart[i].price*arrCart[i].sl;
              html+=`<tbody>
                  <tr class="cart_item">
                      <td class="product-remove">
                          <a title="Remove this item" class="remove" onclick=RemoveCart(this)>×</a>
                      </td>

                      <td class="product-thumbnail">
                          <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="${arrCart[i].img}"></a>
                      </td>

                      <td class="product-name">
                          <a href="/dien-thoai/${arrCart[i].name}">${arrCart[i].name}</a>
                      </td>

                      <td class="product-price">
                          <span class="amount">${arrCart[i].price}</span>
                      </td>

                      <td class="product-quantity">
                          <div class="quantity buttons_added">
                              <input onchange="UpdateAmount(this)" type="number" size="4" class="input-text qty text" title="Qty" value="${arrCart[i].sl}" min="0" step="1">
                          </div>
                      </td>

                      <td class="product-subtotal">
                          <span class="amount">${arrCart[i].price*arrCart[i].sl} $</span>
                      </td>
                  </tr>

              </tbody>`
            }

            var tb = document.getElementById("shoppingCart");
            document.getElementById("total_amount").innerHTML=totalAmount +' $';
            tb.innerHTML=html;
          }else{
            alert('chua them san pham nao')
          }
        } else {
          alert("trinh duyet khong ho tro");
        }


        function RemoveCart(x){
          var obj =  x.parentNode.parentNode.parentNode;
          var name = obj.firstElementChild.children[2].firstElementChild.innerHTML;
          if(localStorage.getItem('cart')){
            var retrievedObject = localStorage.getItem('cart');
            var arrCart = JSON.parse(retrievedObject);
            for(var i=0;i<arrCart.length;i++){
              if(arrCart[i].name==name){
                arrCart.splice(i,i+1);
                break;
              }
            }
            localStorage.setItem('cart', JSON.stringify(arrCart));
          }
          obj.remove();
          UpdateTotalAmount();
        }

        function UpdateAmount(x){
          var price =  x.parentNode.parentNode.parentNode.children[3].firstElementChild.innerHTML;
          price=price.slice(0,price.length-1);
          var name = x.parentNode.parentNode.parentNode.children[2].firstElementChild.innerHTML;
          var retrievedObject = localStorage.getItem('cart');
          var arrCart = JSON.parse(retrievedObject);
          for(var i=0;i<arrCart.length;i++){
            if(arrCart[i].name==name){
              arrCart[i].sl=x.value;
            }
          }
          localStorage.setItem('cart', JSON.stringify(arrCart));
          var amount = price*x.value;
          x.parentNode.parentNode.parentNode.lastElementChild.firstElementChild.innerHTML=amount + ' $';
          UpdateTotalAmount();
        }

        function UpdateTotalAmount(){
          var amountClass = document.getElementsByClassName("cart_item");
          var amount;
          var totalAmount=0;
          console.log(totalAmount)
          for(var i = 0; i < amountClass.length; i++)
          {
            amount= amountClass[i].lastElementChild.firstElementChild.innerHTML;
            amount=amount.slice(0,amount.length-1);
            totalAmount+=Number(amount);
          }
          document.getElementById("total_amount").innerHTML=totalAmount+' $';
        }

      // })
