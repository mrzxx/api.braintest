const firebase = require('../database/database');
const { getDoc,doc,collection } = require('firebase/firestore');


const Auth = async (req,res,next) => {
    try {
        
        if(req.headers['authorization'] == undefined){
            const error = new Error('Auth Error.');
            error.status = 401;
            throw error;
        }

        const collectionRef = collection(firebase.db, 'userdata');
        const docRef = doc(collectionRef, req.headers['authorization']);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            req.user = docSnapshot.data();
            next();
        }else{
            const error = new Error('Kullanıcı girişinde hata!');
            error.status = 404;
            throw error;
        }

    } catch (error) {

        next(error);

    }   
}

/*
const Auth = async (req,res,next) => {

    try {
        const userDocRef = doc(db, 'userdata', req.headers['authorization']);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // Belge bulundu, belge verilerini alabiliriz
            next();
        } else {
            const error = new Error('Kullanıcı girişinde hata!');
            error.status = 404;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
            throw error;
        }
    } catch (error) {
        next(error);
    }
};
*/
module.exports = Auth;