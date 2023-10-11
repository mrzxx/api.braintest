const categoryModel = require('../models/categories');
const testdataModel = require('../models/testdata');
const userdataModel = require('../models/userdata');
const adminModel = require('../models/admin');
const multer = require('multer');
exports.cpUpload = multer().fields([{ name: 'question', maxCount: 1 },{ name: 'choices', maxCount: 6 },]);


//Completed v2
exports.showTest = async (req, res, next) => {
    try {
        const test = await categoryModel.get_categories_from_lang(req.params.lang);
        res.render("./showtest.ejs",{
            data:test
        });
    } catch (error) {
        next(error);
    }
    
}
//Completed v2

//Completed v2
exports.getTestDetail = async (req, res, next) => {
    try {
        const data = await testdataModel.get_test_by_id(req.params.testid);
        res.render("./testdetail.ejs",{
            data:data,
            testid:req.params.testid,
            lang:req.params.lang
        });
    } catch (error) {
        next(error);
    }   
}
//Completed v2

//Completed v2
exports.getAddTest = async (req,res,next) => {
    try {
        const test = await categoryModel.get_categories_from_lang(req.params.lang);
        res.render('./addtest.ejs',{
            data:test 
        });
    } catch (error) {
        next(error);
    }
    
}
//Completed v2


//Completed v2
exports.createTest = async (req,res,next) => {  

    try {
        let showalltest = await categoryModel.get_categories_from_lang(req.body.lang);

        let latestid = 0;
        let lasttest = null;
        for (let index = 0; index < showalltest.length; index++) {
            const element = showalltest[index];
            if(element.createdTime > latestid && element.category == req.body.category){
                latestid = element.createdTime;
                lasttest = element;
            }
        }
        if(lasttest == null){
            lastqueue = 1;
        }else{
            lastqueue = lasttest.queue+1;
        }
        
        const data = {
            category:parseInt(req.body.category),
            title:req.body.title,
            requirediq:parseInt(req.body.requirediq),
            requiredtestid:parseInt(req.body.requiredtestid),
            requiredxp:parseInt(req.body.requiredxp),
            timelimit:parseInt(req.body.timelimit),
            xp:parseInt(req.body.xp),
            createdTime:Date.now(),
            questions:[],
            lang:req.body.lang,
            queue:lastqueue
        };
        let j = await adminModel.createTest(data);
        res.redirect('/admin/'+req.body.lang+'/test');
    } catch (error) {
        next(error);   
    }

}   
//Completed v2

//Completed v2
exports.addQuestion = async (req, res,next) => {

    try {
        const testinfo = await testdataModel.get_test_by_id(req.body.testid);
        data = testinfo.questions;
        let lastId;
        let index = parseInt((Object.keys(data).length));//new index
        if(index == 0 || data == []){
            lastId=1;
        }else{
            lastId = parseInt(data[index-1]["questionid"]) + 1;
        }
        //Question UPLAOD
        let metadata = {
            contentType: req.files["question"][0]["mimetype"]
        };
        let qurl = await adminModel.uploadFile(req.body.testid,lastId,"question.svg",req.files["question"][0]["buffer"],metadata);
        data[index] = {answerid:1,answers:[],questionid:lastId,url:qurl};
        for (let i = 0; i < Object.keys(req.files["choices"]).length; i++) {
            let metadata = {
                contentType: req.files["choices"][i]["mimetype"]
            };
            let churl = await adminModel.uploadFile(req.body.testid,lastId,`answer_${i}.svg`,req.files["choices"][i]["buffer"],metadata);
            data[index].answers.push({id:data[index].answers.length+1,url:churl});
        }
        let check = await adminModel.updateTestQuestions(req.body.testid,data);
        if(check == 1){
            res.redirect('/admin/test/'+req.body.testid);
        }else{
            const error = new Error('Firebase Güncellenmemiş olabilir!');
            error.status = 500;
            throw error;
        }
    } catch (error) {
        next(error);
    }


    
}
//Completed v2

//Completed v2
exports.addQuestionTypeText = async (req,res,next) => {

    try {
        const testinfo = await testdataModel.get_test_by_id(req.body.testid);
        data = testinfo.questions;
    
        let lastId;
        let index = parseInt((Object.keys(data).length));//new index
        if(index == 0 || data == []){
            lastId=1;
        }else{
            lastId = parseInt(data[index-1]["questionid"]) + 1;
        }
        //Question UPLAOD
        data[index] = {answerid:1,answers:[],questionid:lastId,url:req.body.question};
        let carray = (req.body.choices).split('**');
        for (let j = 0; j < carray.length; j++) {
            let choice = carray[j].trim();
            if(choice != ""){
                data[index].answers.push({id:data[index].answers.length+1,url:choice});
            }
            
        }
        let check = await adminModel.updateTestQuestions(req.body.testid,data);
        if(check == 1){
            res.redirect('/admin/test/'+req.body.testid);        
        }else{
            console.log(check);
            res.end("Hatalı");
        }
    } catch (error) {
        next(error);
    }


}
//Completed v2




//Completed v2
exports.addQuestionTypeIMGText = async (req,res,next) => {

    try {
        const testinfo = await testdataModel.get_test_by_id(req.body.testid);
        data = testinfo.questions;
        let lastId;
        let index = parseInt((Object.keys(data).length));//new index
        if(index == 0 || data == []){
            lastId=1;
        }else{
            lastId = parseInt(data[index-1]["questionid"]) + 1;
        }
        //Question UPLAOD
        let metadata = {
            contentType: req.files["question"][0]["mimetype"]
        };
        let qurl = await adminModel.uploadFile(req.body.testid,lastId,"question.svg",req.files["question"][0]["buffer"],metadata);
        data[index] = {answerid:1,answers:[],questionid:lastId,url:qurl};

        let carray = (req.body.choices).split('**');
        for (let j = 0; j < carray.length; j++) {
            let choice = carray[j].trim();
            if(choice != ""){
                data[index].answers.push({id:data[index].answers.length+1,url:choice});
            }
            
        }



        let check = await adminModel.updateTestQuestions(req.body.testid,data);
        if(check == 1){
            res.redirect('/admin/test/'+req.body.testid);        
        }else{
            console.log(check);
            res.end("Hatalı");
        }
    } catch (error) {
        next(error);
    }


}
//Completed v2




//Completed v2
exports.updateQuestionAnswer = async (req, res,next) => {

    try {
        const testinfo = await testdataModel.get_test_by_id(req.body.testid);
        data = testinfo.questions;
        for (let i = 0; i < Object.keys(data).length; i++) {
            if(data[i]["questionid"] == req.body.questionid){
                data[i]["answerid"] = parseInt(req.body.answerid);
            }
        }
        let check = await adminModel.updateTestQuestions(req.body.testid,data);
        res.json(check);
    } catch (error) {
        next(error);
    }
  
}
//Completed v2


//Completed v2
exports.updateQuestionIQVal = async (req,res,next) => {

    try {
        const testinfo = await testdataModel.get_test_by_id(req.body.testid);
        data = testinfo.questions;
        for (let i = 0; i < Object.keys(data).length; i++) {
            if(data[i]["questionid"] == req.body.questionid){
                data[i]["iqscore"] = req.body.iqscore;
            }
        }
        let check = await adminModel.updateTestQuestions(req.body.testid,data);
        res.status(200).json(check);
    } catch (error) {
        next(error);
    }
    
}
//Completed v2

//Completed v2
exports.deleteQuestionTypeText = async (req, res,next) => {

    try {
        const testinfo = await testdataModel.get_test_by_id(req.body.testid);   
        let data = testinfo.questions;
        for (let i = 0; i < Object.keys(data).length; i++) {
            if(data[i]["questionid"] == req.body.questionid){
                data.splice(i, 1);
            }
        }
        let check = await adminModel.updateTestQuestions(req.body.testid,data);
        res.json(check);
    } catch (error) {
        next(error);
    }
    
}
//Completed v2


//Completed v2
exports.deleteQuestionTypeFunny = async (req, res,next) => {

    try {
        const testinfo = await testdataModel.get_test_by_id(req.body.testid);   
        let data = testinfo.questions;
        for (let i = 0; i < Object.keys(data).length; i++) {
            if(data[i]["questionid"] == req.body.questionid){
                console.log("here2");
                let j = await adminModel.deleteFilesInFolder('testdata/'+req.body.testid+'/'+req.body.questionid);
                console.log("here22");
                data.splice(i, 1);
            }
        }
        let check = await adminModel.updateTestQuestions(req.body.testid,data);
        res.json(check);
    } catch (error) {
        console.error(error);
        next(error);
    }

    
}
//Completed v2