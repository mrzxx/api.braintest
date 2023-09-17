const userdataModel = require('../models/userdata');
const testdataModel = require('../models/testdata');

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
        next(error);
    }
}
