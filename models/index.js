const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

/* const sequelize = new Sequelize(config.db.dsn) */

/* const fs = require('fs'); */
/* const rdsCa = fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem'); */
const sequelize = new Sequelize('defaultdb', 'doadmin', 'kkaz0ar60xdk14j3', {
    host: 'nuxt-admin-db-do-user-1558822-0.a.db.ondigitalocean.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
});

fs.readdirSync(__dirname)
  .filter((file) => 
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

//ASSOCIATIONS





module.exports = db