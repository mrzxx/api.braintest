const errorHandler = (err, req, res, next) => {
    let stat = 500;
    if(err.statusCode != undefined){stat=err.statusCode;}
    console.error(err.stack);
    res.status(500).json({ serverMessage: err.message,message: 'Bir hata meydana geldi.',statusCode:err.status,object:err,errorTime:Date.now(),Auth:req.headers['authorization'] });
};
module.exports = errorHandler;