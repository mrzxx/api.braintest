const firebase = require('../database/database');
const { getFirestore, collection, getDocs, getDoc, setDoc, updateDoc, doc,query,where,orWhere ,orderBy,limit } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, listAll, getBytes, getDownloadURL } = require('firebase/storage');

exports.get_test_by_id = async (testid)=> {
    try {

        const collectionRef = collection(firebase.db, 'testdata');
        const docRef = doc(collectionRef, testid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            return docSnapshot.data();
        }else{
            const error = new Error('Veritabanı boş döndü.Test bulunamadı.');
            error.status = 404;
            throw error;
        }

    } catch (error) {
        throw error;
    }
}