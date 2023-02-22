const { Router } = require("express");
const { createMessage, getMessages, getChats, updateMessage } = require("../controllers/messageControllers.js");

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { message, emisorId, receptorId } = req.body;
        const newMessage = await createMessage(message, emisorId, receptorId);
        res.status(200).send(newMessage);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const { emisorId, receptorId } = req.query;
        const messages = await getMessages( emisorId, receptorId);
        res.status(200).send(messages);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/chats", async (req, res) => {
    try {
        const { emisorId } = req.query;
        const chats = await getChats( emisorId);
        res.status(200).send(chats);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.get("/noleidos", async (req, res) => {
    try {
        let {userId} = req.query;
        let chats = await getChats(userId);
        let chatsNoLeidos = chats.filter(chat => {
            return chat.leido === false && chat.emisor.id != userId;
        })
        res.status(200).send({cantidad : chatsNoLeidos.length});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// marca como leidos los mensajes de emisorId hacia receptorId (se usa cuando receptorId lee los mensajes de emisorId en el front)
router.put("/leido", async (req, res) => {
    try {
        let {emisorId, receptorId} = req.query
        await updateMessage(emisorId, receptorId);
        res.status(200).send("Actualizado");
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;
