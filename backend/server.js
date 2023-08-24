require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dreamRoutes = require("./routes/dreams");

// express app
const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/dreams", dreamRoutes);

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
