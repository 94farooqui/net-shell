const express = require('express');
const { getCommands, getOneCommand, updateOneCommand, addCommand, deleteOneCommand } = require('../controllers/commands');
const router = express.Router();

router.get("/", getCommands)
router.get("/:commandId", getOneCommand)
router.post("/",addCommand)
router.put("/:commandId", updateOneCommand)
router.delete(":/commandId", deleteOneCommand)

module.exports = router;