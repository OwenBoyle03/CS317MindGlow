'use strict'

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAH8r1CBDI6PuBSMuG62Vl9Gou2vgrbVM8",
    authDomain: "mad2-77632.firebaseapp.com",
    projectId: "mad2-77632",
    storageBucket: "mad2-77632.appspot.com",
    messagingSenderId: "672271518614",
    appId: "1:672271518614:web:4527ec05c64c5e8dfd2bb7",
    measurementId: "G-V9REP3EC4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging(app);

navigator.serviceWorker.register('./challengeNotificationsServiceWorker.js').then((registration) => {
    getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: 'BMtpAFr1HLiDSNa6IOWHWBYKZxnRxdTeAkPq4xiBG0OkQpuJzxoEaD9qcPnhETlFyYxrpiI1vCj6A0RAlTyrSyY'
    }).then((currentToken) => {
        if (currentToken) {
            console.log("Token is: " + currentToken);
            // Send the token to your server and update the UI if necessary
            // ...
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });
});

const view = new challengeView();

fetch('./scripts/challengeContent.json').then(data => data.json()).then(json => {

    let lastLoadDate = 0;
    let dailyChallengeString = "";

    window.addEventListener("beforeunload", () => {
        //localStorage.setItem("lastLoadDate", Date.now().toString());
        //localStorage.setItem("lastLoadDate", ((new Date('2023-3-12')).valueOf().toString()));
        localStorage.setItem("dailyChallengeString", model.getChallengeOfTheDay());
        //localStorage.setItem("dailyChallengeString", "");
    });

    if (localStorage.getItem("lastLoadDate") !== null) {
        lastLoadDate = new Date(parseInt(localStorage.getItem("lastLoadDate")));
    }

    localStorage.setItem("lastLoadDate", Date.now().toString());

    if (localStorage.getItem("dailyChallengeString") !== null) {
        dailyChallengeString = (localStorage.getItem("dailyChallengeString"));
    }

    const model = new challengeModel(json, dailyChallengeString, lastLoadDate);

    //console.log(model.getChallengeOfTheDay());

    view.setChallengeOfTheDay(model.getChallengeOfTheDay());

    view.checkForChallengeOfTheDayClick( () => {
        console.log("Daily Challenge Clicked.");
    });

    view.checkForColl1Click( () => {
        view.setGeneralChallengesToViewExpanded(model.getChallengePack1(), 1);
    });

    view.checkForColl2Click( () => {
        view.setGeneralChallengesToViewExpanded(model.getChallengePack2(), 2);
    });

    view.checkForColl3Click( () => {
        view.setGeneralChallengesToViewExpanded(model.getChallengePack3(), 3);
    });

    view.checkForColl4Click( () => {
        view.setGeneralChallengesToViewExpanded(model.getChallengePack4(), 4);
    });

    view.checkForColl5Click( () => {
        view.setGeneralChallengesToViewExpanded(model.getChallengePack5(), 5);
    });

    view.checkForColl6Click( () => {
        view.setGeneralChallengesToViewExpanded(model.getChallengePack6(), 6);
    });

    view.checkForBackButtonClick( () => {
        view.setChallengeCollectionsToDefault();
    });

}).catch(error => {
    document.getElementById("challengeOfTheDayTextPara").innerText = "Something has went wrong with file loading. Please try again later.";
});