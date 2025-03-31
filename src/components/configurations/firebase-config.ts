// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOTZ-vsA9hSfdZfsLBkhRs_8j0g0_J6TA",
    authDomain: "shop-bd97c.firebaseapp.com",
    projectId: "shop-bd97c",
    storageBucket: "shop-bd97c.firebasestorage.app",
    messagingSenderId: "213183566038",
    appId: "1:213183566038:web:0c91aeef1ebc9e3ec1b977",
    measurementId: "G-00X692W0ZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);