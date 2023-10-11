const express = require('express');
const router = express.Router();

const perm = require('../middleware/perm');

const adminController = require('../controllers/admin');
//Tüm testleri listeler **EKRANI**
router.get('/:lang/test',perm(),adminController.showTest);
//Test'i oluşturma **EKRANI**
router.get('/:lang/test/add', perm(),adminController.getAddTest);
//Test'i oluşturma **İSTEĞİ**
router.post('/test/add', perm(),adminController.createTest);
//Test'e soru ekleme **İSTEĞİ**
router.post('/test/question/add',perm(),adminController.cpUpload, adminController.addQuestion);
//Test'e soru ekleme **İSTEĞİ**
router.post('/test/question/delete/2',perm(),adminController.cpUpload, adminController.deleteQuestionTypeText);

router.post('/test/question/delete/3',perm(),adminController.cpUpload, adminController.deleteQuestionTypeFunny);
//Test'e soru ekleme **İSTEĞİ**
router.post('/test/question/add/2',perm(),adminController.cpUpload, adminController.addQuestionTypeText);

//Test'e soru ekleme **İSTEĞİ**
router.post('/test/question/add/3',perm(),adminController.cpUpload, adminController.addQuestionTypeIMGText);


//Şık Güncelleme
router.post('/test/answer/update', perm(),adminController.updateQuestionAnswer);
//Soru PUAN Güncelleme
router.post('/test/question/update/iqscore', perm(),adminController.updateQuestionIQVal);
//Test'in bilgilerini ve içindeki soruları çekme ve soruların cevaplarını belirleyebilme ekranı ve testi güncelleyebilme **EKRANI**
router.get('/test/:testid', perm(),adminController.getTestDetail);
router.get('/test/:testid/:lang', perm(),adminController.getTestDetail);
module.exports = router;