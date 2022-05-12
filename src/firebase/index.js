import store from '../store'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyASpCyzRmmwVlQUqG7G-ArJ31iogpM5auI",
    authDomain: "test-project-33489.firebaseapp.com",
    databaseURL: "https://test-project-33489.firebaseio.com",
    projectId: "test-project-33489",
    storageBucket: "test-project-33489.appspot.com",
    messagingSenderId: "493620055150"
};
let default_file_url = ''
console.log(default_file_url)
// 线上库
// {
//     firebaseConfig = {
//         apiKey: "AIzaSyA7XIUBy2r4pGP84sjQjHwOUylHhDdc3gE",
//         authDomain: "face-yoga-01.firebaseapp.com",
//         projectId: "face-yoga-01",
//         storageBucket: "face-yoga-01.appspot.com",
//         messagingSenderId: "100665753581",
//         appId: "1:100665753581:web:6731b65e04bd99483771e4",
//         measurementId: "G-66VH0H8VBP"
//     };
//     default_file_url = 'https://firebasestorage.googleapis.com/v0/b/face-yoga-01.appspot.com/o/'
// }
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

let firebaseLoadFile = (name, file, func) => {
    const auth = getAuth();
    signInAnonymously(auth)
        .then(async () => {
            let storageRef = ref(storage, name)
            // let metadata = {
            //     'contentType': 'application/octet-stream',
            //     'cacheControl': 'no-cache,max-age=1296000',
            // }
            // console.log(name, storageRef)
            await new Promise((resolve) => {
                uploadBytes(storageRef, file).then((s) => {
                    console.log('upload success: ', s)
                    // console.log(storageRef.getDownloadURL())
                    resolve()
                })
            })
            getDownloadURL(storageRef).then((url) => {
                if(!default_file_url){
                    default_file_url = store.state.default_file_url
                }
                func(url.replace(default_file_url, ''))
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(errorCode)
            // ...
        });
}
let metadata = {
    'contentType': 'application/octet-stream',
    'cacheControl': 'no-cache,max-age=1296000',
}
let uploadJSON = (name, fileString, func) => {
    name, fileString, func
    const auth = getAuth();
    signInAnonymously(auth)
        .then(async () => {
            let storageRef = ref(storage, name)
            let string = await new Promise((resolve) => {
                uploadString(storageRef, fileString,'raw',metadata).then((s) => {
                    // console.log('upload success: ', s)
                    // console.log(storageRef.getDownloadURL())
                    resolve(s)
                })
            })
            func(string)
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            func('error')
            console.log(errorCode)
            // ...
        });
}

export default {
    firebaseLoadFile, 
    uploadJSON
}