const testdataModel = require('../models/testdata');
const userdataModel = require('../models/userdata');

exports.show_test_by_id = async (req,res,next) => {
    try {
        let show_test_by_id = await testdataModel.get_test_by_id(req.params.testid);

        if(!show_test_by_id){
            const error = new Error('Test isteğinde hata! değer boş döndü.');
            error.status = 404;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
            throw error;
        }
        res.json(show_test_by_id);


    } catch (error) {
        next(error);
    }
    
}



exports.check_solved_test_answers = async (req,res,next) => {
    try {
        let returns = [];
        let checkIsThatTestSolved;
        const data = await testdataModel.get_test_by_id(req.params.testid);
        Object.keys(req.user.testresult).includes(req.params.testid) ? checkIsThatTestSolved=true : checkIsThatTestSolved=false;
        if(checkIsThatTestSolved){
            let mytest = req.user.testresult[req.params.testid];
            data.questions.forEach(element => {
                let mineAnswerId=0;

                for (let index = 0; index < mytest.questions.length; index++) {
                    let element2 = mytest.questions[index];
                    if(parseInt(element2.questionid) == parseInt(element.questionid)){
                        mineAnswerId = element2.manswerid;
                        break;
                    }
                }

                let temp = {questionid:parseInt(element.questionid),trueanswerid:parseInt(element.answerid),myanswerid:parseInt(mineAnswerId)};
                returns.push(temp);
            });
            res.json(returns);
        }else{
            const error = new Error('Bu test kullanıcı tarafından çözülmemiş!');
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error);
    }
    
}

exports.complete_test = async (req,res,next) => {

    try {
        
        let data = req.user.testresult;
        if(data == undefined){
            data = {};
        }
        let check;
        if(req.user.testresult == undefined){
            check = false;
        }else{
            check = Object.keys(req.user.testresult).includes(req.params.testid);
        }
        
    
    
        
        if(!check){
            let gettest = await testdataModel.get_test_by_id(req.params.testid);
    
            //if(gettest.reqired)
            
            let user_answers = req.body;

            if(user_answers == undefined){
                const error = new Error('HATALI POST Hocam hala öğrenemedin mi?.');
                error.status = 404;
                throw error;
            }
            let results = gettest.questions;
            if(user_answers.length != results.length){
                
                const error = new Error('POST Hatası gönderilen cevaps sayısı ile testteki mevcut soru sayısı aynı değil! Tüm şıkların cevaplarını gönderin eğer boş ise 0 verin manswer değerine.');
                error.status = 400;
                throw error;
            }
            let myiqscore = 0;    
            for (let index = 0; index < results.length; index++) {
                const element = results[index];
                
              
                if(element.questionid == user_answers[index].questionid){
                    if(element.answerid == user_answers[index].manswerid){
                        myiqscore+=parseInt(element.iqscore);
                    }
                }
            }
            data[req.params.testid] = {};
            data[req.params.testid]["questions"] = req.body;
            data[req.params.testid]["iq"] = myiqscore;
            data[req.params.testid]["xp"] = parseInt(gettest.xp);
            data[req.params.testid]["solvedtime"] = Date.now();
        
            try {
                const update = await userdataModel.update_user_testresult(req.headers['authorization'],data);
                res.status(200).json({testid:req.params.testid,iq:myiqscore,xp:gettest.xp});
            } catch (error) {
                throw error;
            }
        }else{
            const error = new Error('Bu test kullanıcı tarafından zaten çözülmüş!');
            error.status = 401;
            throw error;
        }


    } catch (error) {
        next(error);
    }

}