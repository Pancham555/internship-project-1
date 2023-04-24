const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: { type: Number, unique: true },
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    income: String,
    city: String,
    car: String,
    quote: String,
    phone_price: String,
  },
  { timestamps: true }
);
// Compile model from schema
var DataModel = mongoose.model("DataModel", DataSchema);

module.exports = DataModel;
