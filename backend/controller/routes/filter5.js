const express = require("express");
const router = express.Router();
const DataModel = require("../../models/db/schema");

/* Filter to show the data of top 10 (or any number given) 
cities which have the highest number of users and their
 average income. */

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  try {
    const result = await DataModel.aggregate([
      {
        $addFields: {
          incomeNumber: { $toDouble: "$income" },
        },
      },
      {
        $group: {
          _id: "$city",
          totalUsers: { $sum: 1 },
          averageIncome: { $avg: "$incomeNumber" },
        },
      },
      {
        $sort: { totalUsers: -1 },
      },
      {
        $limit: limit,
      },
    ])
      .limit(limit)
      .exec();

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "An error occurred while retrieving the top cities data.",
    });
  }
});

module.exports = router;
