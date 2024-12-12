"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxjgSfixCzyNXk2FxpBDtIYp72Ojr_Po0",
    authDomain: "expense-be919.firebaseapp.com",
    projectId: "expense-be919",
    storageBucket: "expense-be919.firebasestorage.app",
    messagingSenderId: "861978647508",
    appId: "1:861978647508:web:08b1f9f4bcb30bbb5e5441",
    measurementId: "G-7ZVEZ5WW42"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
