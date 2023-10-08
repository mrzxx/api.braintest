const errorHandler = (req, res) => {
    res.status(404).json({ message: 'Error 404. Unvalid Request.',errorTime:Date.now(),Auth:req.headers['authorization'] });
};
module.exports = errorHandler;
