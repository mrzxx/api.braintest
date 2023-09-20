const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
//Tüm testleri listeler **EKRANI**
router.get('/:lang/test', adminController.showTest);
//Test'i oluşturma **EKRANI**
router.get('/:lang/test/add', adminController.getAddTest);
//Test'i oluşturma **İSTEĞİ**
router.post('/test/add', adminController.createTest);
//Test'e soru ekleme **İSTEĞİ**
router.post('/test/question/add',adminController.cpUpload, adminController.addQuestion);
//Test'e soru ekleme **İSTEĞİ**
router.post('/test/question/delete/2',adminController.cpUpload, adminController.deleteQuestionTypeText);
//Test'e soru ekleme **İSTEĞİ**
router.post('/test/question/add/2',adminController.cpUpload, adminController.addQuestionTypeText);
//Şık Güncelleme
router.post('/test/answer/update', adminController.updateQuestionAnswer);
//Soru PUAN Güncelleme
router.post('/test/question/update/iqscore', adminController.updateQuestionIQVal);
//Test'in bilgilerini ve içindeki soruları çekme ve soruların cevaplarını belirleyebilme ekranı ve testi güncelleyebilme **EKRANI**
router.get('/test/:testid', adminController.getTestDetail);
router.get('/test/:testid/:lang', adminController.getTestDetail);
module.exports = router;