const { Router } = require('express');
const { User, Pet } = require("../db.js");
const router = Router();
const transporter = require("../config/mailer.js");

router.post("/", async (req, res)=> {
    try {
        const userId = req.body.idUser;
        const giverId = req.body.idGiver;
        const petId = req.body.idPet;
        let giverEmail = await User.findOne({attributes:["email"], where: {id: giverId}});
        giverEmail = giverEmail.dataValues.email;
        let userInfo = await User.findOne({ where: {id: userId}});
        userInfo = userInfo.dataValues;
        let petInfo = await Pet.findOne({ where: {id: petId}});
        petInfo = petInfo.dataValues;
        await transporter.sendMail({
            from: '"Huellitas 🐾" <tmsalbanesi@gmail.com>', // sender address
            to: giverEmail, // list of receivers
            subject: "¡Dueño Encontrado!",
            html: `
                <h1>${userInfo.name} quiere adoptar a ${petInfo.name}</h1>
                <h3>Puede contactarse por:</h3>
                <ul>
                    <li>Email: ${userInfo.email}</li>
                    <li>Phone: ${userInfo.phone}</li>
                    <li>Facebook: ${userInfo.facebook}</li>
                </ul>
            `
        });
        res.status(200).send("Email Enviado");
    } catch (error) {
        res.status(404).send(error.message);
    }
    
})

module.exports = router;


