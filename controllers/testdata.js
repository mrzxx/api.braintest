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
    
};