'use strict';

class challengeView {

    constructor() {
        this.challengeOfTheDay = document.getElementById("challengeOfTheDayTextPara");
        this.challengeCollections = document.getElementById("challengeCollections");
        this.generalChallenges = document.getElementById("generalChallenges");
        this.challengeNumberHeader = document.getElementById("collectionNumberHeader");
        this.collectionsPacksView = true;
        this.coll1 = document.getElementById("coll1");
        this.coll2 = document.getElementById("coll2");
        this.coll3 = document.getElementById("coll3");
        this.coll4 = document.getElementById("coll4");
        this.coll5 = document.getElementById("coll5");
        this.coll6 = document.getElementById("coll6");
        this.backButton = document.getElementById("BackButton");
        this.backButton.style.display = "none";
        this.challengeNumberHeader.style.display = "none";
    }

    setChallengeOfTheDay(string) {
        this.challengeOfTheDay.innerText = string;
    }

    setChallengeCollections(string) {
        this.generalChallenges.innerHTML = string;
    }

    setChallengeCollectionsToDefault() {
        this.challengeCollections.removeAttribute("style");
        this.generalChallenges.removeAttribute("style");
        this.backButton.style.display = "none";
        this.challengeNumberHeader.style.display = "none";
    }

    setGeneralChallengesToViewExpanded(packContent, packNumber) {
        this.challengeNumberHeader.removeAttribute("style");
        this.challengeNumberHeader.innerHTML = '<h3>Challenge Pack ' + packNumber + '</h3>';
        this.generalChallenges.innerHTML = '<div id="challengeCollections">';
        this.generalChallenges.style.display = "grid";
        this.challengeCollections.style.display = "none";
        this.backButton.removeAttribute("style");
        //this.backButton.style.display = "flex";
        for (let i = 0; i < packContent.length; i++) {
            this.generalChallenges.innerHTML = this.generalChallenges.innerHTML +
                '<div id="challengeViewExpanded">' +
                '<p>' + packContent[i] + '</p>' +
                '</div>';
        }
        this.generalChallenges.innerHTML = this.generalChallenges.innerHTML + '</div>';
        /*
        this.challengeCollections.innerHTML =
            '<div id="challengeViewExpanded">' +
            '<p>Challenge Collection 1</p>' +
            '</div>';
         */
    }

    getCollectionsPacksView() {
        return this.collectionsPacksView;
    }

    getColl1() {
        return this.coll1;
    }

    getColl2() {
        return this.coll2;
    }

    getColl3() {
        return this.coll3;
    }

    getColl4() {
        return this.coll4;
    }

    getColl5() {
        return this.coll5;
    }

    getColl6() {
        return this.coll6;
    }

    checkForChallengeOfTheDayClick(handler) {
        this.challengeOfTheDay.addEventListener("click", handler);
    }

    checkForColl1Click(handler) {
        this.coll1.addEventListener("click", handler);
    }

    checkForColl2Click(handler) {
        this.coll2.addEventListener("click", handler);
    }

    checkForColl3Click(handler) {
        this.coll3.addEventListener("click", handler);
    }

    checkForColl4Click(handler) {
        this.coll4.addEventListener("click", handler);
    }

    checkForColl5Click(handler) {
        this.coll5.addEventListener("click", handler);
    }

    checkForColl6Click(handler) {
        this.coll6.addEventListener("click", handler);
    }

    checkForBackButtonClick(handler) {
        this.backButton.addEventListener("click", handler);
    }

}