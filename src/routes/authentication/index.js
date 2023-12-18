const express = require("express");
const createJWT = require("../../api/authentication/controllers/createJWT");
const router = express.Router();

router.post("/jwt", createJWT);

module.exports = router;
