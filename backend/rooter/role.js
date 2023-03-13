const express = require('express');
const router = express.Router();

const {
    getAllRole
} = require('../controller/role')

router.route('/').get(getAllRole)

module.exports = router;