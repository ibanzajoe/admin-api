const router = require('express').Router()
const { Users } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Op = require('sequelize').Op
const sequelize = require('sequelize')
const Joi = require('joi')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

router.use(function (req, res, next) {
  console.log('root')
  next()
})

router.get('/currentUser', async (req, res) => {
  return res.send(req.$current_user)
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const findEmail = email.toLowerCase()

    const currentUser = await Users.findOne({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('email')), findEmail)
    })

    if (!currentUser) {
      return res.send({
        status: 403,
        error: 'No user by that email'
      })
    }

    const isPasswordValid = await currentUser.comparePassword(password)
    if (!isPasswordValid) {
      return res.send({
        status: 403,
        error: 'Password is incorrect'
      })
    }

    const userJson = currentUser.toJSON()

    res.send({
      user: userJson,
      accessToken: jwtSignUser(userJson)
    })
  } catch (err) {
    res.status(500).send({
      error: `Error occurred trying to log in: ${err}`
    })
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })

  const value = await schema.validateAsync({
    email,
    password
  })

  if (value.error) {
    return res.send({
      code: 400,
      status: `Please check your form to see you have input all the fields correctly`,
      error: error,
      params: req.params,
      payload: user
    })
  }

  try {
    console.log('email , password: ', email, ' ' , password)
    const newUser = await Users.buildNewUser({
      email: email,
      password: password
    })

    console.log('this is new user: ', newUser)

    if (newUser) {
      await newUser.save()
      return res.status(200).send({
        status: 'User created',
        code: 200,
        user: newUser
      })
    }
    return res.send({
      status: 'Unabled to create user',
      code: 400
    })
  } catch (err) {
    res.send({
      code: 405,
      status: `Sorry, a user with the same email already exists, please try again with a different email address`,
      message: err,
      params: req.body
    })
  }



})

/* router.post('/send_reset_password', async (req, res) => {
  const email = req.body.email

  let n = 32
  let hex = ''
  while(n--) {
    hex += Math.floor(Math.random()*16).toString(16).toUpperCase()
  }

  const user = await Users.findOne({
    where: { email: { [Op.iLike]: `${email}`}}
  })

  if (!user) {
    return res.send({code: 400, error: 'No one registered with Email'})
  }

  await user.update({
    reset_password_token: hex
  })


  const from = 'contact@listicleclothing.com'
  const subject = 'Listicle! Reset your password'

  let body = []
  body.push(`Hi ${user.first_name}, <br><br>`)
  body.push(`Here is the reset password activation link.  Click the link below to reset your password: <br><br>`)
  body.push(`<a href=\"http://www.listicleclothing.com/reset-password?token=${user.reset_password_token}\" target=\"_blank\">http://www.listicleclothing.com/reset-password?token=${user.reset_password_token}</a><br><br>`)
  body.push(`Thank you, <br>ListicleClothing.com`)

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    from: from,
    to: user.email,
    cc: 'contact@listicleclothing.com',
    subject: subject,
    html: body.join('')
  }

  sgMail.send(msg)

  return res.send({code: 200, message: `reset password email sent`})
})

router.post('/getUserByPassToken', async (req, res) => {
  const token = req.body.token
  try {
    const user = await Users.findOne({
      where: { reset_password_token: token }
    })

    if (user) {
      return res.send({user, code: 200})
    } else {
      return res.send({code: 400, status: `Invalid Token`})
    }
  } catch (err) {
    res.status(500).send({error: err})
  }
})

router.post('/update_password', async (req, res) => {
  const resetToken = req.body.token
  const newPassword = req.body.password
  const confirmPassword = req.body.password_confirmation

  console.log('params: ', resetToken, newPassword, confirmPassword)
  try {
    const user = await Users.findOne({
      where: { reset_password_token: resetToken } 
    })

    if (newPassword == confirmPassword) {
      user.password = newPassword
      user.reset_password_token = null

      await user.save()

      console.log('this is user: ', user)

      return res.send({code: 200, status: 'Password Updated'})
    }

    res.send({code: 400, status: `Password did not match`})
  } catch (err) {
    res.status(500).send({ error: `unable to update password: ${err}`})
  }

}) */

module.exports = router