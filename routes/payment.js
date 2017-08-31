var express = require('express');
var router = express.Router();
var qr = require('../models/payment')
var paypal = require('paypal-rest-sdk');

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'ATEk11ib9Qp290VqN340NlzvbpZmCxkkAq5Wz8EHRF0biLfqKBD8YZWVNbsSjz6l2peyDFUsGma-rjgf',
    'client_secret': 'EHEkkhUXCjnzg8l6c8kDcZ7o3pC895EdmqUR3hhTRbltfwRRa5Rc7ujTH3C48f54gpreruYtR_NkZlvN'
};
/* GET home page. */

module.exports = function(app,passport){

  router.post('/', function(req, res, next) {
        if(req.body.option_payment == 'VISA'){
          res.render('./index/payment',{message:''})
        }
  });

  router.post('/handling', function(req, res, next) {
    var arrItem = JSON.parse(req.body.items);
    var total=0;
    var data = [];
    var dataPayment = [];
    qr.getProductDetailForPayment(arrItem,function(result){
      for(var i=0;i<arrItem.length;i++){
        for(var j=0;j<result.length;j++){
          if(arrItem[i].id==result[j].id){
            total += arrItem[i].sl*result[j].price;
            var obj = {'id':result[j].id,'name':result[j].name,'img':result[j].img,'price':result[j].price,'sl':arrItem[j].sl};
            dataPayment.push(obj);
            break;
          }
        }
      }
      var items='[';
      for(var i=0;i<dataPayment.length;i++){
        if(i==dataPayment.length-1){
          items+=`{"name": "${dataPayment[i].name}","quantity": "${dataPayment[i].sl}","price": "${dataPayment[i].price}","currency": "USD"}`
        }else{
          items+=`{"name": "${dataPayment[i].name}","quantity": "${dataPayment[i].sl}","price": "${dataPayment[i].price}","currency": "USD"},`

        }
      }
      items+=']';
      items = JSON.parse(items);
      var cardType = GetCardType(req.body.card_number);
      cardType = cardType.toLowerCase();
      var create_payment_json = {
        "intent": "sale",
        "payer": {
          "payment_method": "credit_card",
          "funding_instruments": [{
            "credit_card": {
              "number": req.body.card_number,
              "type": cardType,
              "expire_month": req.body.expMM,
              "expire_year": `20${req.body.expYY}`,
              "cvv2": req.body.card_cvv,
              "first_name": "abc ",
              "last_name": req.body.card_holder
            }
          }]
        },
        "transactions": [{
          "amount": {
            "total": total,
            "currency": "USD",
          },
          "description": "paypal payment",
          "item_list": {
                  "items": items
              },
        }]
      };
      paypal.payment.create(create_payment_json, config_opts, function (err, response) {
          if (err) {
              res.render('./index/payment',{message:'Some thing wrong'})
          }

          if (response) {
            var data = [];
              data.push(JSON.stringify(dataPayment));
              var d = new Date().toLocaleString();
              data.push(d);
              data.push(total);
              data.push('visa');
              data.push(response.id);
              data.push(0);
              qr.insertPayment(data,function(data){
                if(data===0){
                  res.redirect('/error');
                }else{
                  res.render('./index/success',{message:'Thanh toán thành công'})
                }
              })
          }
      });
    });


  })


  function GetCardType(number)
{
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
        return "Mastercard";


    return "";
}

  app.use('/payment', router);

}
