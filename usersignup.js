const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/signuplogin');

router.post('/userregister', Controllers.postuserdata);

module.exports = router;