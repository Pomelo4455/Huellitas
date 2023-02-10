const { User, Pet, Campaign, Adoption, Message } = require("../db.js");
const transporter = require("../config/mailer");

const createMessage = async (message, emisorId, receptorId) => {
    try {
        const newMessage = await Message.create({message, emisorId, receptorId});
        const emisor = await User.findByPk(emisorId)
        const receptor = await User.findByPk(receptorId)
        newMessage.setEmisor(emisor);
        newMessage.setReceptor(receptor);
        return newMessage;
    } catch (error) {
        throw new Error(error)
    }
};

const getMessages = async (user1Id, user2Id) => {
    let messages = await Message.findAll({
      attributes: ["message", "EmisorId"],
      where: {EmisorId: [user1Id, user2Id], ReceptorId : [user1Id, user2Id]},
      order: [["createdAt", "ASC"]],
    });
    return messages;
  };

module.exports = {createMessage, getMessages}