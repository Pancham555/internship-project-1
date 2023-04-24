const express = require("express");
const router = express.Router();
const DataModel = require("../../models/db/schema");

/* Filter to find male users (or any gender given) which 
have phone price greater than 10,000 (or any phone number given).*/

router.get("/", async (req, res) => {
  const phone_price = req.query.phone_price;
  const gender = req.query.gender;
  const limit = parseInt(req.query.limit || 10);
  try {
    let filter = {};
    if (gender) {
      filter.gender = gender;
    } else {
      filter.gender = { $exists: true };
    }
    if (phone_price) {
      filter.phone_price = { $gte: Number(phone_price) };
    } else {
      filter.phone_price = { $exists: true };
    }
    const users = await DataModel.find(filter).limit(limit).lean();
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
