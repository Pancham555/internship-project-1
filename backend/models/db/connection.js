const mongoose = require("mongoose");
//Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/table";
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log("Connection successful"));
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
