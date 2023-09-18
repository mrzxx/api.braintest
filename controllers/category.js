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
        let returns = [{id:1,title:"Raven Test",tests:[]},{id:2,title:"Logic Test",tests:[]}];    
        for (let i = 0; i < data.length; i++) {
            let pick = data[i];
            //pick.questions = data[i].questions;
            Object.keys(req.user.testresult).includes(data[i].testid) ? pick.solved=true : pick.solved=false;
            Object.keys(req.user.testresult).includes(data[i].requiredtestid) ? pick.locked=false : pick.locked=true;
            if(pick.solved){
                pick.iq = req.user.testresult[data[i].testid].iq;
            }
            if(pick.category == 1){

                if(data[i].requiredtestid == 0) pick.locked = false;
                returns[0].tests.push(pick);
            }else{

                if(data[i].requiredtestid == 0) pick.locked = false;
                returns[1].tests.push(pick);
            }
        }
        res.status(200).json(returns);
    } catch (error) {
        next(error);
    }
    
};