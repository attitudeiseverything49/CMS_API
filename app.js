const express = require('express');
const db = require('./models');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const routesReader = [];
fs.readdirSync(path.join(__dirname,'/routes')).forEach((file) =>{
    routesReader.push(require(path.join(__dirname,'/routes/',file)));
});

for(let route of routesReader){
    route();
}

console.log(routesReader);
app.listen(PORT, async() => {
    try{
        await db.sequelize.sync({force: true});
        console.log('connected and server running on port -', + PORT)
    }
    catch(err){
        console.error('Error -',err)
    }
})