const path = require('path');
const dbConfig = require("../config/config");
const fs = require('fs');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USERNAME, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    } });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

let modelsReader = []
fs.readdirSync(__dirname).filter((file) =>{
    return (file !== path.basename(__filename))
}).forEach((file) => {
    modelsReader.push(require(path.join(__dirname,file)))
});

for(let modelReader of modelsReader){
    modelReader(sequelize)
};

const models = db.sequelize.models;
Object.keys(models).forEach(name => {
  if ('associate' in models[name]) {
    models[name].associate(models);
  }});

module.exports = db;
