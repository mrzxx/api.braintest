const userdataModel = require('../models/userdata');
const testdataModel = require('../models/testdata');
const categoryModel = require('../models/categories');
const firebaseNotification = require('../firebase/notification');

exports.get_profile = async (req,res,next) => {
    /*
    try {
        let data = {...req.user};
        let arr = Object.keys(data.testresult);
        let lasttestid = arr[arr.length-1];
        let gettest = await testdataModel.get_test_by_id(lasttestid);
        gettest.questions = [];
        data.testresult = [];
        gettest.testid = lasttestid;
        data.testresult = gettest;
        data.testresult.iq = req.user.testresult[lasttestid].iq;
        data.testresult.questions = req.user.testresult[lasttestid].questions;
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
    */

    try {
        let data = {...req.user};
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }

}
exports.get_app_version = async (req,res,next) => {
    try {
        let data = await userdataModel.get_app_version();
        if(data == undefined){
            const error = new Error('Veritabanı boş döndü. Data çekilemedi _controllers');
            error.status = 404;
            throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
}



exports.send_notification_about_test = async (req,res,next) => {

    try {
        

        let users = await userdataModel.get_all_user();
        for (let index = 0; index < users.length; index++) {



            const user = users[index];
            //HERE LOG
            console.log(user.data.devicetoken);
            //HERE LOG
            if(user.data.devicetoken != undefined){
                




                let model = {
                    lang:'en',
                    testresult:user.data.testresult,
                    token:user.data.devicetoken
                }
                if(user.data.lang != undefined){model.lang = user.data.lang;}

                //FOUND AND SEND NOTIFICATION AREA
                const data = await categoryModel.get_categories_from_lang(model.lang);
                let test1info = 0;
                let test2info = 0;
                for (let i = 0; i < data.length; i++) {
                    let pick = data[i];
                    //pick.questions = data[i].questions;
                    Object.keys(req.user.testresult).includes(data[i].testid) ? pick.solved=true : pick.solved=false;
                    Object.keys(req.user.testresult).includes(data[i].requiredtestid) ? pick.locked=false : pick.locked=true;

                    if(pick.category    ==     1 && pick.solved    ==  false && pick.locked    ==  false){
                        //FOUND RAVEN TEST
                        test1info = {...pick};
                    }else if(pick.category == 2 && pick.solved == false && pick.locked == false){
                        //FOUND LOGIC TEST
                        test2info = {...pick};
                    }
                }

                if(test1info != 0){
                    let title = test1info.title
                    let noti = {
                        title:title,
                        body:'Eyvallah sayende 100kya yaklaşıyoruz.'
                    }
                    firebaseNotification(noti,model.token);
                }else if(test2info != 0){
                    let title = test2info.title
                    let noti = {
                        title:title,
                        body:'Eyvallah sayende 100kya yaklaşıyoruz.'
                    }
                    firebaseNotification(noti,model.token);
                }
                //FOUND AND SEND NOTIFICATION AREA




            }


            


            
        }
        return 1;
    } catch (error) {
        next(error);
    }



}