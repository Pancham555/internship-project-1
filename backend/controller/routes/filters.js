const express = require("express");
const router = express.Router();

// Route to different filters

router.use("/filter1", require("./filter1"));
router.use("/filter2", require("./filter2"));
router.use("/filter3", require("./filter3"));
router.use("/filter4", require("./filter4"));
router.use("/filter5", require("./filter5"));

module.exports = router;
