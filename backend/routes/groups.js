const express = require('express');
const { getGroups, getOneGroup, updateOneGroup, addOneGroup, deleteOneGroup } = require('../controllers/groups.js');
const router = express.Router();

router.get("/", getGroups)
router.get("/:GroupId", getOneGroup)
router.post("/",addOneGroup)
router.put("/:GroupId", updateOneGroup)
router.delete(":/GroupId", deleteOneGroup)

module.exports = router;