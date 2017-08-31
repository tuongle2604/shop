$(document).ready(function(){

  if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem('cart')){
      var retrievedObject = localStorage.getItem('cart');
      var arrCart = JSON.parse(retrievedObject);
      var totalAmount=0;
      for(var i=0;i<arrCart.length;i++){
        totalAmount+=arrCart[i].price*arrCart[i].sl;
      }
      $('span').text(totalAmount+'$')
    }else{
      alert('chua them san pham nao')
    }
  } else {
    alert("trinh duyet khong ho tro");
  }

  $('#btnPay').click(function(){
    if(localStorage.getItem('cart')){
          var items = localStorage.getItem('cart');
          var arrItems = [];
          var arrCart = JSON.parse(retrievedObject);
          arrCart.forEach(function(e){
            var obj ={'id':e.id,'sl':e.sl}
            arrItems.push(obj);
          })
          arrItems = JSON.stringify(arrItems);
          $("input[name~='items']").val(arrItems);
          $("#mondidopayform").submit();
    }else{
      alert('không có sản phẩm nào');
    }
  })
});
