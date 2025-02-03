const express = require('express');
const { getCreds, getOneCred, updateOneCred, addCred, deleteOneCred } = require('../controllers/credentials.js');
const { verifyuser } = require('../middleware/verifyUser.js');
const router = express.Router();

router.get("/", verifyuser, getCreds)
router.get("/:credId", verifyuser, getOneCred)
router.post("/",verifyuser, addCred)
router.put("/:credId", verifyuser, updateOneCred)
router.delete(":/credId", verifyuser, deleteOneCred)

module.exports = router;