const { User, Pet, Campaign, Adoption, Message } = require("../db.js");
const transporter = require("../config/mailer");
const {Op} = require("sequelize");
const {eliminarRepetidos} = require("../utils/functions");

const createMessage = async (message, emisorId, receptorId) => {
    try {
        const emisor = await User.findByPk(emisorId)
        const receptor = await User.findByPk(receptorId)
        if (emisor && receptor) {
          const newMessage = await Message.create({message, emisorId, receptorId});
          newMessage.setEmisor(emisor);
          newMessage.setReceptor(receptor);
          return newMessage;
        }
        return {};
    } catch (error) {
        throw new Error(error)
    }
};

const getMessages = async (user1Id, user2Id) => {
    let messages = await Message.findAll({
      attributes: ["message", "EmisorId"],
      where: {EmisorId: [user1Id, user2Id], ReceptorId : [user1Id, user2Id]},
      order: [["createdAt", "DESC"]],
    });
    return messages;
  };

const getChats = async (emisorId) => {
  // obtenemos los ids con los que se mensajeo emisorId y el de el ya que no podemos distinguir.
  let receptoresId = await Message.findAll({
    attributes: ["ReceptorId", "EmisorId"],
    where: {[Op.or]: [{EmisorId: emisorId}, {ReceptorId: emisorId}]},
    order: [["createdAt", "DESC"]],
  })
  // dejamos solo los de la otra persona
  receptoresId = receptoresId.map(data => {
    let usuariosId = data.dataValues;
    if (usuariosId.EmisorId == emisorId) return usuariosId.ReceptorId;
    else return usuariosId.EmisorId;
  })
  // eliminamos repetidos.
  receptoresId = eliminarRepetidos(receptoresId);
  // traemos el ultimo mensaje e info de cada persona con la que se mensajeo.
  let chats = [];
  for (let i = 0; i < receptoresId.length; i++) {
    const receptorId = receptoresId[i];
    let chat = await Message.findOne({
      attributes: ["message"],
      where: {EmisorId: [receptorId, emisorId], ReceptorId : [receptorId,emisorId]},
      order: [["createdAt", "DESC"]],
      include: [{
        model: User,
        attributes: ["name", "image", "id"],
        as: "receptor",
        },
        {
          model: User,
          attributes: ["name", "image", "id"],
          as: "emisor",
        }]
    })
    chats.push(chat);
  }
  return chats;
}

module.exports = {createMessage, getMessages, getChats}