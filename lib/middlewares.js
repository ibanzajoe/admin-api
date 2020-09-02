const {users} = require('../models')
const jwt = require('jsonwebtoken')

exports.loggedIn = (req, res, next) => {
  if (!req.$current_user) return next(new Error("Not logged in"))
  next()
}

exports.populateJWTUser = async (req,res,next) => {
  let auth = req.get('authorization')

  if (!auth) return next()

  let token = auth.split(" ").pop()

  try {
    const decoded = jwt.decode(token)

    let id
    if (decoded.id) {
      id = decoded.id
    }
    if (decoded.user_id) {
      id = decoded.user_id
    }

    const user = await users.findOne({
      where: {
        id: id
      }
    })

    req.$current_user = user
    return next()

  } catch (err) {
    console.error(err)
    return next()
  }
}