const admin = require('./admin');
async function sendNotification (data,token) {
    try {
        let message = {
            data: data,
            token: token
        };
        let response = await admin.messaging().send(message);
        console.log('Bildirim gönderildi:', response);
        return 1;
    } catch (error) {
        throw error;
    }
}
module.exports = sendNotification;