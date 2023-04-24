const express = require("express");
const router = express.Router();
const DataModel = require("../../models/db/schema");

/* Filter to find users which have income lower than 
$5 USD (or any amount given) and have a car of brand 
“BMW” or “Mercedes” (or any car list given). */

router.get("/", async (req, res) => {
  const incomeThreshold = req.query.income;
  const carList = req.query.cars;
  const limit = parseInt(req.query.limit || 10);
  try {
    const query = {};

    if (incomeThreshold) {
      query.income = { $gte: parseInt(incomeThreshold) };
    }

    if (carList) {
      query.car = { $in: carList.split(", ") };
    }
    const users = await DataModel.find(query).limit(limit).lean();
    const data = users.map((user) => {
      const { _id, createdAt, updatedAt, __v, ...rest } = user;
      return rest;
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users." });
  }
});

module.exports = router;
