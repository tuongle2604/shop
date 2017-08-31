
$(document).ready(function(){
  var modal = document.getElementById('myModal');
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

});
function getData(){
  str=$('#searchInput').val();
  var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            if(this.responseText.length>0){
                var response = JSON.parse(this.responseText);
                var config = response.config;
                var arr = config.split(';')
                var configHtml=''
                for(var i=0;i<arr.length;i++){
                  configHtml+=`<p> ${arr[i]} </p>`
                }
                var html=`            <div class="col-md-3 col-sm-6">
                                <div class="single-shop-product">
                                    <div class="product-upper">
                                      <span class="closeItem" onclick="close123(this)">&times;</span>
                                        <img src="${response.img}" alt="">
                                    </div>
                                    <h2>${response.name}</h2>
                                    <div class="product-carousel-price">
                                        <ins>${response.price}</ins>
                                    </div>
                                    <div class="config">
                                      ${configHtml}
                                    </div>
                                </div>
                            </div>`;
              var display = document.getElementById("display");
              display.innerHTML+=html;
              if(display.children.length==4){
                var search = document.getElementById("search");
                search.style.display = "none";
            }
          }else{
            alert('không tìm thấy sản phẩm')
          }
        }else{

          }
      };
      xmlhttp.open("GET", "/api/" + str, true);
      xmlhttp.send();

}

function close123(x){
  var obj =  x.parentNode.parentNode.parentNode;
  var display = document.getElementById("display");
  obj.remove();
  if(display.children.length!=4){
    var search = document.getElementById("search");
    search.style.display = "block";
  }
}
