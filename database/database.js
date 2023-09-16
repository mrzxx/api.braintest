const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
//const { getFirestore, collection, getDocs, getDoc, setDoc, updateDoc, doc,query,where,orderBy,limit } = require('firebase/firestore');
//const { getStorage, ref, uploadBytes, listAll, getBytes, getDownloadURL } = require('firebase/storage');
const firebaseConfig = {
    apiKey: "AIzaSyC_mATDSKlSRFahtO3zyg3tJ7fJcG1m7mE",
    appId: "1:65412343691:android:b85e995ee43f392ca2318e",
    projectId: "brain-test-d86cd",
    databaseURL: "https://brain-test-d86cd-default-rtdb.firebaseio.com",
    storageBucket: "brain-test-d86cd.appspot.com",
};
const firebase = initializeApp(firebaseConfig);
exports.db = getFirestore();
exports.storage = getStorage(firebase);



