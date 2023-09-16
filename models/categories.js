const firebase = require('../database/database');
const { getFirestore, collection, getDocs, getDoc, setDoc, updateDoc, doc,query,where,orWhere,orderBy,limit } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, listAll, getBytes, getDownloadURL } = require('firebase/storage');

exports.get_categories_from_lang = async (lang="en")=> {
    try {
        // Örneğin, "users" koleksiyonundan "country" sütunu "USA" olan kullanıcıları alalım
        const usersRef = firebase.db.collection('testdata');
        const query = usersRef.where('lang', '==', lang).orWhere('category','==','1');
        let snapshot = await query.get();
        
        if(!snapshot){
            const error = new Error('get_categories_from_lang model hatası!');
            error.status = 404;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
            throw error;
        }

        let createArrayOfReturnedObject = [];
        snapshot.forEach((doc) => {
            console.log('ID:', doc.id, 'Data:', doc.data());
            createArrayOfReturnedObject.push({id:doc.id,data:doc.data()});
        });
        return createArrayOfReturnedObject;

    } catch (error) {
        return error;
    }
}  