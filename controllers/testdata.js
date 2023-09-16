const testdataModel = require('../models/testdata');

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