module.exports = {
  development: {
    username: 'postgres',
    password: 'nn51qwerasdf',
    database: 'app',
    host: 'admin-db-postgres.chx4dnjntuyc.us-west-1.rds.amazonaws.com',
    dialect: 'postgres',
    operatorsAliases: '0'
  },
  test: {
    username: 'postgres',
    password: 'nn51qwerasdf',
    database: 'app',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: '0'
  },
  production: {
    username: 'postgres',
    password: 'nn51qwerasdf',
    database: 'app',
    host: 'admin-db-postgres.chx4dnjntuyc.us-west-1.rds.amazonaws.com',
    dialect: 'postgres',
    operatorsAliases: '0'
  },
  port: process.env.PORT || 8081,
  db: {
    dsn: 'postgresql://doadmin:kkaz0ar60xdk14j3@nuxt-admin-db-do-user-1558822-0.a.db.ondigitalocean.com:25060/defaultdb?sslmode=require'
  },
  dialect: 'postgres',
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'li#223GX3$2'
  }
}