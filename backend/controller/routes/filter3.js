const express = require("express");
const router = express.Router();
const DataModel = require("../../models/db/schema");

/*Filter to find users whose last name starts with 
“M” (or any letter or a set of letters given) and has 
a quote character length greater than 15 (or any length number given)
 and email includes his/her last name.*/

router.get("/", async (req, res) => {
  const letter = req.query.letter;
  const ql = parseInt(req.query.ql);
  const limit = parseInt(req.query.limit || 10);
  try {
    let query = {};

    if (ql) {
      query.$expr = { $gt: [{ $strLenCP: "$quote" }, ql] };
    }

    if (letter) {
      query.email = { $regex: `.*${letter}.*`, $options: "i" };
      query.last_name = { $regex: `^${letter}`, $options: "i" };
    } else {
      query.email = { $exists: true };
      query.last_name = { $exists: true };
    }

    const users = await DataModel.find(query).limit(limit).lean();
    const data = users.map((user) => {
      const { _id, createdAt, updatedAt, __v, ...rest } = user;
      return rest;
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving users." });
  }
});

module.exports = router;
