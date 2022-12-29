var express = require('express');
var router = express.Router();
var authcontroller=require("../controllers/auth");
var chatcontroller=require("../controllers/chat");
//-----authcontroller-------
router.get('/getusers', authcontroller.authenticateJWT,authcontroller.getusers);
router.post('/login', authcontroller.login);
//-----chatcontroller-------
router.post('/chatsave',authcontroller.authenticateJWT,chatcontroller.savechat);
router.get('/getchat',authcontroller.authenticateJWT,chatcontroller.getchats);
router.get('/getchatcount',authcontroller.authenticateJWT,chatcontroller.getchatscount);
router.get('/updatecount',authcontroller.authenticateJWT,chatcontroller.updateCount);
router.post('/sendrequest',authcontroller.authenticateJWT,chatcontroller.sendrequest);
router.get('/getrequest',authcontroller.authenticateJWT,chatcontroller.getrequest);
router.post('/actionrequest',authcontroller.authenticateJWT,chatcontroller.actionrequest);
router.post('/uploadfile',authcontroller.authenticateJWT,chatcontroller.uploadfile);
router.get('/getfullchat',authcontroller.authenticateJWT,chatcontroller.getfullchat);
module.exports = router;