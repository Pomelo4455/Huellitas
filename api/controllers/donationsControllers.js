const { Donation, User, Campaign } = require("../db.js");

const createDonation = async (status, amount, userId, campaignId) => {
  const newDonation = await Donation.create({ amount, status });
  await newDonation.setDonante(userId);
  await newDonation.setCampania(campaignId);
  return newDonation;
};


const putCollected = (id, collected) => {
  console.log(collected, id)
  if (id != "undefined") Campaign.increment({collected},{where: { id }});
  else throw new Error("No hay id")
};

module.exports = {
  createDonation,
  putCollected
};
