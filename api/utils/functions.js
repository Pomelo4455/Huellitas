const {Op}=require("sequelize")

const createFilters =(name,species,sex,size)=>{
    let filters={deleted: false}
    if (species)filters.species=species
    if (sex)filters.sex=sex
    if (size)filters.size=size
    if (name)filters.name={[Op.iLike]:`%${name}%`}
    return filters
}

const setOrder=(order) => {
    if (!order) return [];
    else {
        let orden = order.split("_");
        console.log(orden);
        return [orden];
    }
}

module.exports={createFilters,setOrder};