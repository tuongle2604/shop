module.exports =function(io,app){
  io.of('/').on('connection', function(socket) {

   })

  io.of('/cart').on('connection', function(socket) {
    socket.on('getCartData',function(cart){

    })


   })
}
