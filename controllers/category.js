const categoryModel = require('../models/categories');


exports.test_response = (req,res,next) => {
    res.json({message:"Success",statusCode:201});
}

exports.show_categories_from_lang = async (req,res,next) => {
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
    
};