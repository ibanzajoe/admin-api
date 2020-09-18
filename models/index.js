const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

/* const sequelize = new Sequelize(config.db.dsn) */

/* const fs = require('fs'); */
/* const rdsCa = fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem'); */
const sequelize = new Sequelize('app', 'postgres', 'nn51qwerasdf', {
    host: 'admin-db-postgres.chx4dnjntuyc.us-west-1.rds.amazonaws.com',
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