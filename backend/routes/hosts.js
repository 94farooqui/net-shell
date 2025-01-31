const express = require('express');
const { getAllHosts } = require('../controllers/hosts');
const router = express.Router();

router.get("/", getAllHosts)
module.exports = router;