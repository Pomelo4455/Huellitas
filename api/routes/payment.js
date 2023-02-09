const { Router } = require("express");
const mercadopago = require("mercadopago");
const { MERCADOPAGO_KEY } = process.env;




const router = Router();


mercadopago.configure({access_token: MERCADOPAGO_KEY})

router.post("/", async (req, res) => {
       try {
const donation = req.body;
let preference = {
    items:[{
        id: donation.id,
        title: donation.title,
        currency_id: 'ARS',
        picture_url: donation.image,
        description: donation.description,
        category_id: 'don',
        quantity: 1,
        unit_price: donation.quantity
}],
back_urls:{
    success: 'http://localhost:3000/gracias',
    failure: '',
    pending:'',
},
auto_return: 'approved',
binary_mode: true,
}
mercadopago.preferences.create(preference).then((response)=>res.status(200).send({response}).send(console.log(response)))
console.log(response);
    } catch (error) {
      res.status(404).send({error:error.message});
    }
  });


module.exports = router;