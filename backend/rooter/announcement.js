const express = require('express');
const router = express.Router();
const {checkToken, isHR} = require('../config/tokenValidation')

const {
    getAllMenu,
    getById,
    addAnnouncement,
    editAnnouncement,
    deleteAnnouncement
} = require('../controller/announcement')

router.route('/').get(checkToken, getAllMenu).post(isHR, addAnnouncement)
router.route('/:id').get(checkToken, getById).put(isHR, editAnnouncement).delete(isHR, deleteAnnouncement)

module.exports = router;