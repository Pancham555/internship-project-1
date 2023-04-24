const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./models/sample_data.json");
require("./models/db/connection");

app.use(cors({ origin: "*" }));

const DataModel = require("./models/db/schema");

// Initialising data
const Initialise = async () => {
  const existingUsers = await DataModel.find();
  if (existingUsers.length > 0) {
    console.log("Data already initialized in database");
    return;
  }

  // If no data exists, initialize data in the database
  const updatedData = data.map((user) => {
    const updatedIncome = parseFloat(user.income.replace("$", ""));
    return { ...user, income: updatedIncome };
  });

  try {
    const result = await DataModel.insertMany(updatedData, { ordered: false });
    console.log(`${result.length} users added to the database`);
  } catch (err) {
    console.log(err);
  }
};
Initialise();

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// Get all the users
app.get("/users", async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  try {
    const users = await DataModel.find().limit(limit).lean();
    const data = users.map((user) => {
      const { _id, createdAt, updatedAt, __v, ...rest } = user;
      return rest;
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving users." });
  }
});

// Get all the headings of tables
app.get("/headers", (req, res) => {
  const model = Object.keys(DataModel.schema.obj).filter(
    (key) => !["_id", "createdAt", "updatedAt", "__v"].includes(key)
  );
  res.json(model);
});

// Get the list of all car names
app.get("/cars", async (req, res) => {
  try {
    const model = await DataModel.find().distinct("car");
    res.json(model);
  } catch (error) {
    console.log(error);
  }
});

// Gateway to all APIs
app.use("/filters/", require("./controller/routes/filters"));

app.listen(5000, () => console.log("listening to port:5000"));
