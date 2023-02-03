const { User, Pet, Campaign, Adoption } = require('../db.js');
const {petsData,usersData,campaignsData} = require("../utils/data.js")

const loadUsers= async (data=usersData)=>{
    for (const user of data) {
        const newUser=await User.create(user);
    }
};

const loadPets= async (data=petsData)=>{
    for (const pet of data) {
        const newPet=await Pet.create(pet);
        await newPet.setUser(pet.userId)
    }
};

const loadCampaigns= async (data=campaignsData)=>{
    for (const campaign of data) {
        const newCampaign=await Campaign.create(campaign);
        await newCampaign.setUser(campaign.userId)
    }
};



module.exports={loadUsers,loadPets,loadCampaigns}
