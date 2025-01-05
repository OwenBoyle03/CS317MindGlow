'use strict';

class challengeModel {

    constructor(json, challengeOfTheDayString, lastLoad) {
        //console.log(challengeOfTheDayString);
        this.challengeOfTheDay = challengeOfTheDayString;
        this.challengePacks = [json['challengePack1'], json['challengePack2'],
                               json['challengePack3'], json['challengePack4'],
                               json['challengePack5'], json['challengePack6']];

        //console.log(this.challengePacks);

        if (lastLoad === 0) {
            lastLoad = new Date("1980-11-11");
        }

        //console.log("Last Load: " + lastLoad.toDateString());
        //console.log("Now: " + new Date(Date.now()).toDateString());

        let dateNow = new Date(Date.now());

        if (new Date(dateNow.toDateString()) > (new Date(lastLoad.toDateString())) || challengeOfTheDayString === "" || challengeOfTheDayString === "Loading challenge of the day.") {
            const randomPack = Math.floor(Math.random() * (Object.keys(json).length - 1));
            //console.log(this.challengePacks[randomPack].length - 1);
            this.challengeOfTheDay = this.challengePacks[randomPack][Math.floor(Math.random() * (this.challengePacks[randomPack].length))];
        }

    }

    getChallengeOfTheDay() {
        return this.challengeOfTheDay;
    }

    getChallengePack1() {
        return this.challengePacks[0];
    }

    getChallengePack2() {
        return this.challengePacks[1];
    }

    getChallengePack3() {
        return this.challengePacks[2];
    }

    getChallengePack4() {
        return this.challengePacks[3];
    }

    getChallengePack5() {
        return this.challengePacks[4];
    }

    getChallengePack6() {
        return this.challengePacks[5];
    }

}