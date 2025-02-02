const express = require('express');
const { verifyuser} = require('./../middleware/verifyUser.js')
const { getGroups, getOneGroup,getGroupNames, updateOneGroup, addOneGroup, deleteOneGroup } = require('../controllers/groups.js');
const router = express.Router();

router.get("/", verifyuser, getGroups)
router.get("/names", verifyuser, getGroupNames)
router.get("/:GroupId", verifyuser, getOneGroup)
router.post("/", verifyuser,addOneGroup)
router.put("/:GroupId", verifyuser, updateOneGroup)
router.delete("/:GroupId",  verifyuser,deleteOneGroup)

module.exports = router;