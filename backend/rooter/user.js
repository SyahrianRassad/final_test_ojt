const express = require('express');
const router = express.Router();
const {checkToken, isHR} = require('../config/tokenValidation')

const {
    getAllUser,
    addUser,
    login,
    getProfile
} = require('../controller/user')

router.route('/').get(getAllUser).post(isHR, addUser)
router.route('/login').post(login)
router.route('/:id').get(getProfile)

module.exports = router;