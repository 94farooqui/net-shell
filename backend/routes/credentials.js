const express = require('express');
const { getCreds, getOneCred, updateOneCred, addCred, deleteOneCred } = require('../controllers/credentials.js');
const router = express.Router();

router.get("/", getCreds)
router.get("/:credId", getOneCred)
router.post("/",addCred)
router.put("/:credId", updateOneCred)
router.delete(":/credId", deleteOneCred)

module.exports = router;