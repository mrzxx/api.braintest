const firebase = require('../database/database');
const { getFirestore, collection, getDocs, getDoc, setDoc, updateDoc, doc,query,where,orWhere ,orderBy,limit } = require('firebase/firestore');
//const { getStorage, ref, uploadBytes, listAll, getBytes, getDownloadURL } = require('firebase/storage');

exports.update_user_testresult = async (userId,testresult)=> {
    try {

        const docSnapshot = await updateDoc(doc(firebase.db, "userdata", userId), {
            testresult: testresult
        });
        return docSnapshot;
        //const docSnapshot = await updateDoc(doc(firebase.db, 'userdata', userId),{testresult:testresult});
/*
        if (docSnapshot) {
            return true;
        }else{
            console.log(docSnapshot);
            const error = new Error('Kullanıcı güncellerken problem yaşandı.');
            error.status = 500;
            throw error;
        }
*/
    } catch (error) {
        throw error;
    }
}