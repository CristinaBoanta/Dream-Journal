require("dotenv").config();

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const dreamRoutes = require("./routes/dreams");
const userRoutes = require("./routes/user");

// express app
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// routes
app.use("/api/dreams", dreamRoutes);
app.use("/api/user", userRoutes);

// database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // requests listener
    app.listen(process.env.PORT, () => {
      console.log("connected to db, listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
