const express = require('express');
const router = express.Router();
const {checkToken, isHR} = require('../config/tokenValidation')

const {
    getAllReimburtmen,
    getById,
    addReimburtment,
    approveReimburtmentRequest,
    rejectReimburtmentRequest
} = require('../controller/reimburstmen')

router.route('/').get(checkToken, getAllReimburtmen).post(addReimburtment)
router.route('/:id').get(checkToken, getById)
router.route('/approve').post(isHR, approveReimburtmentRequest)
router.route('/reject').post(isHR, rejectReimburtmentRequest)

module.exports = router;