const express = require('express');
const router = express.Router();
const {checkToken, isHR} = require('../config/tokenValidation')

const {
    getAllAttendance,
    getById,
    addAttendance,
    check_in,
    check_out
} = require('../controller/attendance')

router.route('/').get(checkToken, getAllAttendance).post(isHR, addAttendance)
router.route('/:id').get(checkToken, getById)
router.route('/check_in/:id').put(checkToken, check_in)
router.route('/check_out/:id').put(checkToken, check_out)

module.exports = router;