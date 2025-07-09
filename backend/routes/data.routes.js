const express = require('express');
const { userUpdate, AdminUpdate, adminDelete, getallUsers, history, getallAdmins, feedback, addFeedback,userDelete } = require('../controllers/data.controller');
const { protect, verify } = require('../utils/auth');
const router = express.Router();
//base => /api/data
router.post("/users/update/",protect,verify,userUpdate)
router.post("/users/update/admin",protect,verify,AdminUpdate)
router.post("/users/delete",protect,verify,userDelete)
router.post("/users/delete/admin",protect,verify,adminDelete)
router.get("/users",verify,getallUsers)
router.get("/history",verify,history)
router.get("/admin",verify,getallAdmins)
router.get("/feedback",verify,feedback)
router.post("/feedback",verify,addFeedback)

module.exports = router;