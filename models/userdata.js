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



exports.add_user_teststart = async (userId,teststart,testid)=> {
    try {
   
        if(teststart == undefined || teststart == [] || teststart == ""){
            teststart = [];
            teststart.push(testid)
        }else{
  
            if (!teststart.includes(testid)) {
        
                teststart.push(testid);       
            }
        }
  
        const docSnapshot = await updateDoc(doc(firebase.db, "userdata", userId), {
            teststart: teststart
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

exports.get_app_version = async ()=> {
    try {

        const collectionRef = collection(firebase.db, 'server');
        const docRef = doc(collectionRef, 'app');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            return docSnapshot.data();
        }else{
            const error = new Error('Veritabanı boş döndü.Version çekilemedi. _models');
            error.status = 404;
            throw error;
        }

    } catch (error) {
        throw error;
    }
}

exports.get_all_user = async ()=> {
    try {
        const collectionRef = collection(firebase.db, 'userdata');
        const querySnapshot = await getDocs(collectionRef);
    
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, data: doc.data() });
        });
    
        return documents;
      } catch (error) {
        throw error;
      }
}




exports.update_user_device_token = async (userId,devicetoken)=> {
    try {
        const docSnapshot = await updateDoc(doc(firebase.db, "userdata", userId), {
            devicetoken: devicetoken
        });
        return 1;
    } catch (error) {
        return -1;
    }
}