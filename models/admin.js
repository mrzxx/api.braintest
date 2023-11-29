const firebase = require('../database/database');
const { getFirestore, collection, getDocs, getDoc, setDoc, updateDoc, doc,query,where,orWhere ,orderBy,limit } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, listAll, getBytes, getDownloadURL,deleteObject } = require('firebase/storage');


exports.updateTestQuestions = async (testid,questions) => {
    try {
        let update = await updateDoc(doc(firebase.db, "testdata", testid), {
            questions: questions
        });
        return 1;
    } catch (error) {
        throw error;
    }
    
    /*
    return new Promise((resolve, reject) => {
        if(lang=="_de"){
            updateDoc(doc(this.db, "testdata", testid), {
                questions_de: questions
            }).then(r => {
                resolve(1);
            }).catch(err => {
                reject(0);
            });
        }else{
            updateDoc(doc(this.db, "testdata", testid), {
                questions: questions
            }).then(r => {
                resolve(1);
            }).catch(err => {
                reject(0);
            });
        }

        
    });
    */
}


exports.uploadFile = async (id,questionNumber,name, buffer, metadata) => {

    try {
        const storageRef = ref(firebase.storage, `testdata/${id}/${questionNumber}/${name}`);
        let snapshot = await uploadBytes(storageRef, buffer, metadata);
        let myref = getFileRef(snapshot.metadata.fullPath);
        let url = await getDownloadURL(myref);
        return url;
    } catch (error) {
        throw error;
    }
    
/*

    const storageRef = ref(storage, `testdata/${id}/${questionNumber}/${name}`);

    return new Promise  ((resolve, reject) => { 
        uploadBytes(storageRef, buffer, metadata).then((snapshot) => {
            let myref = getFileRef(snapshot.metadata.fullPath);
            getDownloadURL(myref).then((url) => {
                //add database
                resolve(url);
            }).catch(err => {
                reject(err);
            });
        });
    });

*/
}
const getFileRef = (name) => {
    const storageRef = ref(firebase.storage, name);
    return storageRef;
}





exports.deleteFilesInFolder = async (folderPath) => {
    try {
      const listResult = await listAll(ref(firebase.storage, folderPath));
  
      const deletePromises = listResult.items.map(item => deleteObject(item));
  
      await Promise.all(deletePromises);
  
      console.log('Klasör içindeki dosyalar başarıyla silindi.');
    } catch (error) {
      console.error('Hata:', error);
    }
}



exports.createTest = async (data) => {
    try {
        const docRef = doc(firebase.db, "testdata", (Date.now()).toString());
        return await setDoc(docRef, data);
    } catch (error) {
        throw error;
    }
}