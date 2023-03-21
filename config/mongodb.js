const mongoose = require("mongoose");
const { MONGO_URL } = require("./db");

mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");
});

mongoose.connection.on("error", () => {
  console.log("Error");
});

