const admin = require('./admin');
async function sendNotification (data,token) {
    try {
        let message = {
            notification: data,
            token: token
        };
        let response = await admin.messaging().send(message);
        console.log('Bildirim gönderildi:', response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = sendNotification;