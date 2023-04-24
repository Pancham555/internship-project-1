const express = require("express");
const router = express.Router();
const DataModel = require("../../models/db/schema");

/* Filter to find users which have a car of brand “BMW”, “Mercedes”
 or “Audi” (or any list of cars given) and whose email does not
  include any digit (you can customize if you need email that 
  include or doesn't include any digit). */

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  const carList = req.query.cars;
  const emailDigit = Number(req.query.email_not_num) === 1 ? true : false;
  try {
    let filter = {};

    if (carList) {
      filter.car = { $in: carList.split(", ") };
    } else {
      filter.car = { $exists: true };
    }
    if (emailDigit) {
      filter.email = { $not: /\d/ };
    } else {
      filter.email = { $exists: true };
    }
    const users = await DataModel.find(filter).limit(limit).lean();
    const data = users.map((user) => {
      const { _id, createdAt, updatedAt, __v, ...rest } = user;
      return rest;
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving users." });
  }
});

module.exports = router;
