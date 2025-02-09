const express = require('express');
const {verifyuser} = require("./../middleware/verifyUser")
const { getCommands, getOneCommand, updateOneCommand, addCommand, deleteOneCommand } = require('../controllers/commands');
const router = express.Router();

router.get("/",verifyuser, getCommands)
router.get("/:commandId",verifyuser, getOneCommand)
router.post("/",verifyuser,addCommand)
router.put("/:commandId",verifyuser, updateOneCommand)
router.delete("/:commandId",verifyuser, deleteOneCommand)

module.exports = router;