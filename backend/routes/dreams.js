const express = require('express')
const {
    createDream,
    getSingleDream,
    getDreams,
    deleteDream,
    updateDream,
} = require('../controllers/dreamController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getDreams)

router.get('/:id', getSingleDream)

router.post('/', createDream)

router.delete('/:id', deleteDream)

router.patch('/:id', updateDream)

module.exports = router
