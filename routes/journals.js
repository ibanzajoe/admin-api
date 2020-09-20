const router = require('express').Router();
const { Journals } = require('../models');
const Op = require('sequelize').Op


router.use(function (req, res, next) {
  console.log('journals')
  next()
})


// CREATE JOURNAL
router.post(
  '/create',
  async (req, res) => {
    const {name, description, images, main_image} = req.body

    try {
      const newJournal = await Journals.create({
        name,
        description,
        images,
        main_image
      })

      if (newJournal) {
        await newJournal.save()
        return res.status(200).send({
          status: `Journal: ${name} created`,
          code: 200,
          journal: newJournal
        })
      }
      return res.send({
        status: 'Unabled to create journal',
        code: 400
      })
    } catch (err) {
      res.send({
        code: 405,
        status: `Unable to create journal: ${name}`,
        message: err,
        params: req.body
      })
    }
  }
)

/* GET - All Journals
** RETURN journals
*/
router.get(
  '/all',
  async (req, res) => {
    const journals = await Journals.findAll()

    res.send({
      status: 200,
      journals
    })
  }
)

// GET by id
// RETURN: journal
router.post(
  '/byId/:id',
  async (req, res) => {
    const journal = await Journals.findOne({ where: { id } })

    if (journal) {
      return res.send({
        status: 200,
        message: `Journal ${id} found!`,
        course
      })
    }
  }
)

// Update by id: takes id params and body data to update
// RETURNS: updated data
// ERROR: jouranl does not exist; journal cannot be updated
router.post(
  '/update/:id', 
  async (req, res) => {
    const id = req.params.id
    const journal = req.body.journal

    const updateJournal = await Journals.findOne({ where: { id } })

    if (!updateJournal) {
      return res.send({ status: 404, message: `no journal by id: ${id}` })
    }

    try {
      await updateJournal.update(journal)
      res.send({ status: 200, message: 'okay', course: updateJournal })
    } catch (err) {
      res.send({ status: 400, message: 'did not update', error: err })
    }
  }
)

//DELETE USER: by id
//RETURNS: id of deleted journal
router.post(
  '/delete/:id',
  async (req, res) => {
    const id = req.params.id

    const deleteJournal = await Journals.findOne({ where: { id } })
    
    if (!deleteJournal) {
      return res.send({ status: 404, message: `no journal by id: ${id}` })
    }

    try {
      await deleteJournal.destroy()
      return res.send({ status: 200, message: `Journal: ${id} deleted`, id })
    } catch (error) {
      return res.send({ status: 500, message: `Unable to delete journal`, error})
    }
  }
)

module.exports = router