const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: "GET all dreams"})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single dream'});
})

router.post('/', (req, res) => {
    res.json({mssg: 'POST a new dream'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a dream'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a dream'})
})

module.exports = router