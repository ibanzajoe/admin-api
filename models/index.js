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
    dialect: 'postgres'
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

//Tags to Lessons && Tags to Entries
db.Lessons.belongsToMany(db.Tags, { through: db.TagsTo, foreignKey: 'LessonsId', otherKey: 'TagsId' })
db.Entries.belongsToMany(db.Tags, { through: db.TagsTo, foreignKey: 'EntriesId', otherKey: 'TagsId' })



module.exports = db