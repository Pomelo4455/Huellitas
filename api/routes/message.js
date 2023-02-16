const { Router } = require("express");
const { createMessage, getMessages, getChats } = require("../controllers/messageControllers.js");

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

module.exports = router;
