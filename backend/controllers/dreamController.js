const Dream = require('../models/dreamModel')
const mongoose = require('mongoose')

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const sentimentAnalysisPrompt = "Please classify the sentiment expressed in the following sentence as positive, neutral or negative. More information should be provided on the mood and tone: ";

// get dreams

const getDreams = async (req, res) => {
    const user_id = req.user._id

    const dreams = await Dream.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(dreams)
}


// get single dream

const getSingleDream = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such dream'})
    }

    const singleDream = await Dream.findById(id)

    if(!singleDream) {
        return res.status(404).json({error: 'No such dream'})
    }

    res.status(200).json(singleDream)
}

// create new dream

const createDream = async (req, res) => {
    const {title, description} = req.body

    let emptyFields = [];



    if(!title) {
        emptyFields.push('title')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {

      const response = await openai
      .completions.create({
        model: "text-davinci-003",
        prompt: sentimentAnalysisPrompt + description + ".",
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      console.log(response);
      // ((response) => {
      //   // Parse the sentiment from the API response
        const sentiment = response.choices[0]["text"];
      //   console.log(response);
  
      //   // Send the sentiment back to the client
      //   // res.send({ sentiment });
      // });

        const user_id = req.user._id
        const dream = await Dream.create({title, description, user_id, sentiment})
        res.status(200).json(dream)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete dream

const deleteDream = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such dream'})
    }

    const singleDream = await Dream.findOneAndDelete({_id: id})

    if(!singleDream) {
        return res.status(404).json({error: 'No such dream'})
    }

    res.status(200).json(singleDream)
}

// update dream

const updateDream = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such dream'})
    }

    const singleDream = await Dream.findByIdAndUpdate({_id: id},  {
        ...req.body
    })

    if(!singleDream) {
        return res.status(404).json({error: 'No such dream'})
    }

    res.status(200).json(singleDream)
}

module.exports = {
    createDream,
    getSingleDream,
    getDreams,
    deleteDream,
    updateDream
}