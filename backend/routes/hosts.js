const express = require('express');
const {verifyuser} = require("./../middleware/verifyUser.js")
const { getHosts, getOneHost, updateOneHost, addOneHost, deleteOneHost } = require('../controllers/hosts.js');
const router = express.Router();

router.get("/", verifyuser, getHosts)
router.get("/:HostId", verifyuser, getOneHost)
router.post("/",verifyuser, addOneHost)
router.put("/:HostId", verifyuser, updateOneHost)
router.delete("/:HostId", verifyuser, deleteOneHost)

module.exports = router;