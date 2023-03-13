const express = require('express');
const router = express.Router();
const {checkToken, isHR} = require('../config/tokenValidation')

const {
    getAllOvertime,
    getById,
    addOvertime,
    approveOvertimeRequest,
    rejectOvertimeRequest
} = require('../controller/overtime')

router.route('/').get(checkToken, getAllOvertime).post(addOvertime)
router.route('/:id').get(checkToken, getById)
router.route('/approve').post(isHR, approveOvertimeRequest)
router.route('/reject').post(isHR, rejectOvertimeRequest)

module.exports = router;