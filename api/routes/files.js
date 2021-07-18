const express = require('express');

const controller = require("../controllers/fileController");

const router = express.Router();

router.get("/", controller.getListFiles);

router.get("/:name", controller.download);

module.exports = router;

