module.exports = {
  port: process.env.PORT || 8081,
  db: {
    dsn: 'postgresql://doadmin:kkaz0ar60xdk14j3@nuxt-admin-db-do-user-1558822-0.a.db.ondigitalocean.com:25060/defaultdb?sslmode=require&ssl=true'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'li#223GX3$2'
  }
}