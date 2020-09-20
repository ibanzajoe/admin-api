const router = require('express').Router();
const { Courses } = require('../models');
const Op = require('sequelize').Op


router.use(function (req, res, next) {
  console.log('courses')
  next()
})


// CREATE COURSE
router.post(
  '/create',
  async (req, res) => {
    const {name, description, images, main_image} = req.body

    try {
      const newCourse = await Courses.create({
        name,
        description,
        images,
        main_image
      })

      if (newCourse) {
        await newCourse.save()
        return res.status(200).send({
          status: `Course: ${name} created`,
          code: 200,
          course: newCourse
        })
      }
      return res.send({
        status: 'Unabled to create course',
        code: 400
      })
    } catch (err) {
      res.send({
        code: 405,
        status: `Unable to create course: ${name}`,
        message: err,
        params: req.body
      })
    }
  }
)

/* GET - All Courses
** RETURN courses
*/
router.get(
  '/all',
  async (req, res) => {
    const courses = await Courses.findAll()

    res.send({
      status: 200,
      courses
    })
  }
)

// GET by id
// RETURN: course
router.post(
  '/byId/:id',
  async (req, res) => {
    const course = await Courses.findOne({ where: { id } })

    if (course) {
      return res.send({
        status: 200,
        message: `Course ${id} found!`,
        course
      })
    }
  }
)

// Update by id: takes id params and body data to update
// RETURNS: updated data
// ERROR: course does not exist; course cannot be updated
router.post(
  '/update/:id', 
  async (req, res) => {
    const id = req.params.id
    const course = req.body.course

    const updateCourse = await Courses.findOne({ where: { id } })

    if (!updateCourse) {
      return res.send({ status: 404, message: `no course by id: ${id}` })
    }

    try {
      await updateCourse.update(course)
      res.send({ status: 200, message: 'okay', course: updateCourse })
    } catch (err) {
      res.send({ status: 400, message: 'did not update', error: err })
    }
  }
)

//DELETE USER: by id
//RETURNS: id of deleted course
router.post(
  '/delete/:id',
  async (req, res) => {
    const id = req.params.id

    const deleteCourse = await Courses.findOne({ where: { id } })
    
    if (!deleteCourse) {
      return res.send({ status: 404, message: `no course by id: ${id}` })
    }

    try {
      await deleteCourse.destroy()
      return res.send({ status: 200, message: `Course: ${id} deleted`, id })
    } catch (error) {
      return res.send({ status: 500, message: `Unable to delete course`, error})
    }
  }
)

module.exports = router