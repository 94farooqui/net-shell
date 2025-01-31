const express = require('express');
const { getHosts, getOneHost, updateOneHost, addOneHost, deleteOneHost } = require('../controllers/hosts.js');
const router = express.Router();

router.get("/", getHosts)
router.get("/:HostId", getOneHost)
router.post("/",addOneHost)
router.put("/:HostId", updateOneHost)
router.delete(":/HostId", deleteOneHost)

module.exports = router;