const express = require('express')
const Dream = require('../models/dreamModel')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: "GET all dreams"})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single dream'});
})

router.post('/', async (req, res) => {
    const {title, description} = req.body
    try {
        const dream = await Dream.create({title, description})
        res.status(200).json(dream)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a dream'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a dream'})
})

module.exports = router