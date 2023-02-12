const { User, Campaign } = require("../db.js");
//const { postCampaign } = require('../controllers/campaignControllers');

const getCampaign = async () => {
  const allCampaigns = await Campaign.findAll({
    where: { status: "activo" },
  });
  return allCampaigns;
};

const getCampaignAdm = async () => {
  const allCampaignsAdm = await Campaign.findAll({
    where: {},
  });
  return allCampaignsAdm;
};

const postCampaign = async ({
  title,
  reason,
  description,
  goal,
  userId,
  image,
  collected,
}) => {
  let newCampaign = await Campaign.create({
    title,
    reason,
    description,
    goal,
    image,
    collected,
  });
  await newCampaign.setUser(userId);
  return newCampaign;
};

const putCampaign = async (req) => {
  const { id } = req.params;
  const { title, reason, description, goal, collected, image } = req.body;
  
  let edit = Campaign.update(
    {
      title,
      reason,
      description,
      goal,
      collected,
      image,
    },
    {
      where: { id },
    }
  );
  return edit;
};

const deleteCampaign = async (id, status) => {
  let deleted = Campaign.update({ status: status }, { where: { id } });

  return deleted;
};

module.exports = {
  getCampaign,
  postCampaign,
  putCampaign,
  deleteCampaign,
  getCampaignAdm,
};
