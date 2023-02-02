const { User, Campaign } = require('../db.js');
//const { postCampaign } = require('../controllers/campaignControllers');


const getCampaign = async () => {
    const allCampaigns = await Campaign.findAll({
        where:{status: "activo"}
    });
    return allCampaigns;
}

const postCampaign = async ({ title, reason, description, goal, userId }) => {
    let newCampaign = await Campaign.create({ title, reason, description, goal });
    return newCampaign;
}

const putCampaign = async (req)=>{
    const {id} = req.params;
    const { title, reason, description, goal } = req.body;
    let edit = Campaign.update({ 
        title, reason, description, goal 
    }, {
        where: {id}
    })
    return edit;
}

const deleteCampaign = async (req) => {
    const { id } = req.params;
    const { title, reason, description, goal, status } = req.body;
    let deleted = Campaign.update({
        title, reason, description, goal, status: "inactivo"
    }, {
        where: {id}
    })

    return deleted;
}

module.exports = {
    getCampaign,
    postCampaign,
    putCampaign,
    deleteCampaign
}