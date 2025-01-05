
var growthDirection = 0;
var loopCounter = 0;
const BreatheCycles = 3;

var circleDiv = document.getElementsByClassName("circle")[0];
var initialCircleWidth = parseFloat(circleDiv.getBoundingClientRect()["width"]);

function setSalutation() {
    const dateNow = new Date();
    const hour = dateNow.getHours();

    var timeOfDay = "";
    if (hour > 0 && hour < 12) {
        timeOfDay = "morning";
    } else if (hour >= 12 && hour < 18) {
        timeOfDay = "afternoon";
    } else {
        timeOfDay = "evening";
    }
    document.getElementById("saluteTime").innerHTML = timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1);
}

function breatheCircleClick()
{
    var loopTimer = setInterval(function () {
        if (!breatheCircleGrowth()) {
            loopCounter++;
            if (loopCounter === BreatheCycles) {
                clearInterval(loopTimer);
            }
        }
    }, 5);
}
function breatheCircleGrowth() {

    var circleW = parseFloat(circleDiv.getBoundingClientRect()["width"]);
    var circleH = parseFloat(circleDiv.getBoundingClientRect()["height"]);


    if (growthDirection === 0) {
        circleW += 0.1;
        circleH += 0.1;
        document.getElementById("breathLabel").innerHTML = "Inhale";
    } else {
        circleW -= 0.1;
        circleH -= 0.1;
        document.getElementById("breathLabel").innerHTML = "Exhale";
    }
    circleDiv.style.width = circleW + 'px';
    circleDiv.style.height = circleH + 'px';

    if (Math.round(circleW) === (initialCircleWidth + 50) && growthDirection === 0) {
        growthDirection = 1;
    }

    if (Math.round(circleW) === initialCircleWidth && growthDirection === 1) {
        growthDirection = 0;
        document.getElementById("breathLabel").innerHTML = "Breathe";
        return false;
    }

    return true;
}

setSalutation();
