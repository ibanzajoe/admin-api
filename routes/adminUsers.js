const router = require('express').Router();
const { Users } = require('../models');
const Op = require('sequelize').Op


router.use(function (req, res, next) {
  console.log('admin-users')
  next()
})

// CREATE USER
router.post(
  '/create',
  async (req, res) => {
    const {email, password} = req.body

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
      const newUser = await Users.buildNewUser({
        email: email,
        password: password
      })

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
  }
)

/* GET - All Users
** RETURN users
*/
router.get(
  '/allUsers', 
  async (req, res) => {
    const users = await Users.findAll()

    res.send({
      status: 200,
      users
    })
  }
)

// Update by id: takes id params and body data to update
// RETURNS: updated data
// ERROR: user does not exist; user cannot be updated
router.post(
  '/update/:id', 
  async (req, res) => {
    const id = req.params.id
    const user = req.body.user

    const updateUser = await Users.findOne({ where: { id } })

    if (!updateUser) {
      return res.send({ status: 404, message: `no user by id: ${id}` })
    }

    try {
      await updateUser.update(user)
      res.send({ status: 200, message: 'okay', user: updateUser })
    } catch (err) {
      res.send({ status: 400, message: 'did not update', error: err })
    }
  }
)

//DELETE USER: by id
//RETURNS: id of deleted user
router.post(
  '/delete/:id',
  async (req, res) => {
    const id = req.params.id

    const deleteUser = await Users.findOne({ where: { id } })
    
    if (!deleteUser) {
      return res.send({ status: 404, message: `no user by id: ${id}` })
    }

    try {
      await deleteUser.destroy()
      return res.send({ status: 200, message: `User: ${id} deleted`, id })
    } catch (error) {
      return res.send({ status: 500, message: `Unable to delete user`, error})
    }
  }
)



/* requires body params: {pagination} */
router.post('/bySearch', async(req, res) => {
  console.log(req.body.pagination)
  const { page, itemsPerPage, sortBy, sortDesc, search, status } = req.body.pagination

  console.log('params: ', page, itemsPerPage, sortBy, sortDesc, search, status)

  const s_page = page || 1
  const per_page = itemsPerPage || 20
  const s_status = status || 'All'
  let result
  const offset = (s_page - 1) * per_page
  let sortType, sortMethod = ''
  sortType = sortBy || 'created_at'
  sortDesc ? sortMethod = 'DESC' : sortMethod = 'ASC'

  let query = null
  if (search) {
    if (s_status != 'All') {
      query = { [Op.or]: [{first_name: { [Op.iLike]: `%${search}%`} }, {last_name: { [Op.iLike]: `%${search}%`} }, {email: { [Op.iLike]: `%${search}%`}}, {phone: { [Op.iLike]: `%${search}%`}}], status: s_status }
    } else {
      query = { [Op.or]: [{first_name: { [Op.iLike]: `%${search}%`} }, {last_name: { [Op.iLike]: `%${search}%`} }, {email: { [Op.iLike]: `%${search}%`}}, {phone: { [Op.iLike]: `%${search}%`}}]}
    }
  }
  if (!search && s_status != 'All') {
    query = { status: s_status }
  }

  try {
    if (query) {
      result = await users.findAndCountAll({
        where: query,
        limit: per_page,
        order: [[sortType, sortMethod]],
        offset: offset
      })
    } else {
      result = await users.findAndCountAll({
        limit: per_page,
        order: [[sortType, sortMethod]],
        offset: offset
      })
    }
    
    res.status(200).send({ users: result.rows, count: result.count })
  } catch (err) {
    res.status(400).send({
      error: `Can't get users by search: ${err}`
    })
  }
})


module.exports = router