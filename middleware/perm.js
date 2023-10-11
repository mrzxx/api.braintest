const permissionControl = () => {
    return async (req,res,next) => {
        try {
            if(req.headers['authorization'] != "zabulbeni"){
                const error = new Error('Auth Error.');
                error.status = 401;
                throw error;
            }
            next();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = permissionControl;