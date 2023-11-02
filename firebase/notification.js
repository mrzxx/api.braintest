const admin = require('./admin');
async function sendNotification (data,token,userId="") {

    if(token == "" || token == undefined){
        return -1;
    }
    try {
        let message = {
            notification: data,
            token: token
        };
        let response = await admin.messaging().send(message);
        //console.log('Bildirim gönderildi:', response);
        return response;
    } catch (error) {
        if(error.errorInfo.code == 'messaging/registration-token-not-registered'){
            //console.log("here down");
            return -2;
        }else{
            let errorObject = {
                firebaseError:error,
                userId:userId
            }
            throw errorObject;
        }
        
    }
}
module.exports = sendNotification;