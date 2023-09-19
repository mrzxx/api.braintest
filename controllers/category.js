const categoryModel = require('../models/categories');


exports.test_response = (req,res,next) => {
    res.json({message:"Success",statusCode:201});
}

exports.show_categories_from_lang = async (req,res,next) => {

    /*
    try {
        let get_categories_from_model = await categoryModel.get_categories_from_lang(req.params.lang);

        if(!get_categories_from_model){
            const error = new Error('Kategori isteğinde hata!');
            error.status = 500;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
            throw error;
        }
        res.json(get_categories_from_model);


    } catch (error) {
        next(error);
    }

    */

    try {
        const data = await categoryModel.get_categories_from_lang(req.params.lang);
        let returns = [{id:1,title:"Raven Test",tests:[],raveniq:0},{id:2,title:"Logic Test",tests:[],logiciq:0}];   
        let raventotal = 0; 
        let ravensolvedcount = 0;
        let logictotal = 0; 
        let logicsolvedcount = 0;
        for (let i = 0; i < data.length; i++) {
            let pick = data[i];
            //pick.questions = data[i].questions;
            Object.keys(req.user.testresult).includes(data[i].testid) ? pick.solved=true : pick.solved=false;
            Object.keys(req.user.testresult).includes(data[i].requiredtestid) ? pick.locked=false : pick.locked=true;
            if(pick.solved){
                pick.iq = req.user.testresult[data[i].testid].iq;
                
            }
            if(pick.category == 1){
                if(pick.solved){
                    raventotal += pick.iq;
                    ravensolvedcount++;
                }
                if(data[i].requiredtestid == 0) pick.locked = false;
                returns[0].tests.push(pick);
            }else{
                if(pick.solved){
                    logictotal += pick.iq;
                    logicsolvedcount++;
                }
                if(data[i].requiredtestid == 0) pick.locked = false;
                returns[1].tests.push(pick);
            }
        }
        returns[0].raveniq = raventotal/ravensolvedcount;
        returns[1].logiciq = logictotal/logicsolvedcount;
        res.status(200).json(returns);
    } catch (error) {
        next(error);
    }
    
};