const { Donation, User, Campaign } = require("../db.js");

const createDonation = async ({ status, amount, userId, campaignId }) => {
  const newDonation = await Donation.create({ amount, status });
  await newDonation.setUser(userId);
  await newDonation.setCampaing(campaignId);
  return newDonation;
};


const putCollected = async (req) => {
  const { id } = req.params;
  const { collected } = req.body;
  
  let edit = Campaign.increment(
    {
       collected,
      
    },
    {
      where: { id },
    }
  );
  return edit;
};

module.exports = {
  createDonation,
  putCollected
};
