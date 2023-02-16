require("dotenv").config();
const { Sequelize } = require("sequelize"); 
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY} = process.env;

/* OPCION 1: Descomentar esta opción para hacer los pedidos localmente*/

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

/* OPCION 2: Descomentar esta opción para hacer los pedidos a railway(server deployado) */

// const sequelize = new Sequelize(DB_DEPLOY,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Pet, Campaign, Adoption, Message, Donation, Favorite } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.hasMany(Favorite, {as: "seguidor", foreignKey: 'userId'});
Favorite.belongsTo(User, {as: "seguidor", foreignKey: 'userId'});
Pet.hasMany(Favorite, {as: "seguido", foreignKey: 'petId'});
Favorite.belongsTo(Pet, {as: "seguido", foreignKey: "petId"});

User.hasMany(Message, {as: "emisor", foreignKey: 'EmisorId'});
Message.belongsTo(User, {as: "emisor", foreignKey: 'EmisorId'});
User.hasMany(Message, {as: "receptor", foreignKey: 'ReceptorId'});
Message.belongsTo(User, {as: "receptor", foreignKey: "ReceptorId"})

User.hasMany(Campaign);
Campaign.belongsTo(User);

User.hasMany(Pet);
Pet.belongsTo(User);

User.hasOne(Adoption);
Adoption.belongsTo(User);

Pet.hasOne(Adoption);
Adoption.belongsTo(Pet);

User.hasMany(Donation, {as: "donante", foreignKey: 'userId'});
Donation.belongsTo(User, {as: "donante", foreignKey: 'userId'});
Campaign.hasMany(Donation, {as: "campania", foreignKey: 'campaignId'});
Donation.belongsTo(Campaign, {as: "campania", foreignKey: "campaignId"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
