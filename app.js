const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const cors = require('cors')

const {sequelize} = require('./models/index')
const { populateJWTUser, loggedIn } = require('./lib/middlewares')

const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}))
app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(cors())
app.use(populateJWTUser)

app.use('/', require('./routes/index'))

sequelize.sync({force: true})
  .then(() => {
    app.listen(config.port || 8081)
    console.log(`Server started on port ${config.port}`)
  })
  .catch(err => {
    console.log('some error happened: ', err)
  })
