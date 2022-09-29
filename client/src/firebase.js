import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";


const firebaseCofig = {
    apiKey: "AIzaSyDC-s2HkvdZzr17ukXYJpdgCxW49DcWOdQ",
    authDomain: "codeblogs-22b77.firebaseapp.com",
    projectId: "codeblogs-22b77",
    storageBucket: "codeblogs-22b77.appspot.com",
    messagingSenderId: "106219115388",
    appId:"1:106219115388:web:d799e96daebdfac8084af9"
}

const app = initializeApp(firebaseCofig);
const storage = getStorage(app, "gs://codeblogs-22b77.appspot.com/");

export default storage;