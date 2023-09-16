const firebase = require('../database/database');
const { getFirestore, collection, getDocs, getDoc, setDoc, updateDoc, doc,query,where,orWhere ,orderBy,limit } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, listAll, getBytes, getDownloadURL } = require('firebase/storage');

exports.get_categories_from_lang = async (lang="en")=> {
    /*
    try {
        // Örneğin, "users" koleksiyonundan "country" sütunu "USA" olan kullanıcıları alalım
        const usersRef = collection('testdata');
        const query = usersRef.where('lang', '==', lang).orWhere('category','==','1');
        let snapshot = await query.get();
        
        if(!snapshot){
            const error = new Error('get_categories_from_lang model hatası!');
            error.status = 404;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
            throw error;
        }

        let createArrayOfReturnedObject = ["a"];
        snapshot.forEach((doc) => {
            console.log('ID:', doc.id, 'Data:', doc.data());
            createArrayOfReturnedObject.push({id:doc.id,data:doc.data()});
        });
        return 1;

    } catch (error) {
        throw error;
    }
*/

    try {
        const q = query(
            collection(firebase.db, "testdata"),
            where("lang", '==', lang),
            where("category","!=",1),
            orderBy('category','asc'),
            orderBy('queue','asc')
          );
          
          const q2 = query(
            collection(firebase.db, "testdata"),
            where("category", '==', 1),
            orderBy('queue','asc')
          );
        //const q = query(collection(firebase.db, "testdata"), where("lang", '==', lang),orWhere("category","==",1),orderBy('category','asc'),orderBy('queue','asc'));
        //const querySnapshot = await getDocs(q);
        const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q), getDocs(q2)]);
        const combinedResults = querySnapshot2.docs.concat(querySnapshot1.docs);
        if (!combinedResults.empty) {
            let data = [];
            combinedResults.map(doc => {
           
                let obj = {};
                obj = doc.data();
                obj.testid = doc.id;
                data.push(obj);
            });
            return data;
        } else {
            const error = new Error('get_categories_from_lang model hiç test bulunamadı!');
            error.status = 404;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
            throw error;
        }
    } catch (error) {
        throw error;
    }



}  