const Dream = require("../models/dreamModel");
var Sentiment = require("sentiment");
const mongoose = require("mongoose");
var Sentiment = require("sentiment");

const calculateSentimentScore = (text) => {
  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);
  console.dir(result.score);
  return result.score;
};

// get dreams

const getDreams = async (req, res) => {
  const user_id = req.user._id;

  const dreams = await Dream.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(dreams);
};

// get single dream

const getSingleDream = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such dream" });
  }

  const singleDream = await Dream.findById(id);

  if (!singleDream) {
    return res.status(404).json({ error: "No such dream" });
  }

  res.status(200).json(singleDream);
};

// create new dream

const createDream = async (req, res) => {
  const { title, description } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const sentimentScore = calculateSentimentScore(`${description} ${title}`);

    const dream = await Dream.create({
      title: title,
      description: description,
      user_id: user_id,
      sentimentScore: sentimentScore,
    });
    res.status(200).json(dream);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete dream

const deleteDream = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such dream" });
  }

  const singleDream = await Dream.findOneAndDelete({ _id: id });

  if (!singleDream) {
    return res.status(404).json({ error: "No such dream" });
  }

  res.status(200).json(singleDream);
};

// update dream

const updateDream = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such dream" });
  }

  const singleDream = await Dream.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!singleDream) {
    return res.status(404).json({ error: "No such dream" });
  }

  res.status(200).json(singleDream);
};

module.exports = {
  createDream,
  getSingleDream,
  getDreams,
  deleteDream,
  updateDream,
};
