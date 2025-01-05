// Section 1: Entry Manipulation
async function saveEntry() {
    const currentDate = new Date();
    const dateTimeString = currentDate.toLocaleString();
    const entryText = document.getElementById("journalEntry").value.trim();
    let imageURL = null;

    if (entryText !== "") {
        if (document.getElementById("imageInput").files.length > 0) {
            const imageFile = document.getElementById("imageInput").files[0];
            imageURL = URL.createObjectURL(imageFile);
        }

        const entry = {
            id: Date.now(),
            date: dateTimeString,
            text: entryText,
            image: imageURL,
            location: document.getElementById('placesDropdown').value
        };

        saveToLocalStorage(entry);
        alert("Entry saved successfully.");

        clearImagePreview();
        document.getElementById("journalEntry").value = "";
        document.getElementById("imageInput").value = "";
    } else {
        alert("Please write something before saving.");
    }
}

// Section 2: UI Helpers
function clearImagePreview() {
    document.getElementById("imagePreviewContainer").style.display = "none";
    document.getElementById("imagePreview").src = "";
}

function getPrompt() {
    const prompts = [
        "What are you grateful for today?",
        "Describe a challenging situation and how you overcame it.",
        "Reflect on a meaningful conversation you had recently.",
        "Write about a goal you achieved and the steps you took to get there.",
        "How did you take care of your well-being today?",
        "Reflect on a moment that brought you joy.",
        "Write about something you learned recently.",
        "Describe a moment when you felt proud of yourself.",
        "What are your priorities for the upcoming week?",
        "Write about a habit you want to develop or change."

    ];
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const prompt = prompts[randomIndex];
    document.getElementById("promptBubble").textContent = prompt;
    setTimeout(() => document.getElementById("promptBubble").style.display = "none", 5000);
}

function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview").src = e.target.result;
            document.getElementById("imagePreviewContainer").style.display = "block";
        };
        reader.readAsDataURL(file);
        alert("Image has been attached.");
    }
}

function goBack() {
    window.location.href = 'journalIndex.html';
}

// Additional Function: Save to LocalStorage (called within saveEntry)
function saveToLocalStorage(entry) {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
}

function getUserLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchNearbyPlaces(latitude, longitude);
    }

    function error(err) {
        switch (err.code) {
            case err.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case err.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case err.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case err.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function fetchNearbyPlaces(latitude, longitude) {
    const location = new google.maps.LatLng(latitude, longitude);
    const map = new google.maps.Map(document.createElement('div'), { center: location });

    const placesService = new google.maps.places.PlacesService(map);
    placesService.nearbySearch({
        location: location,
        radius: '1000',
        type: ['store', 'cafe', 'park', 'library']
    }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            displayPlaces(results);
        }
    });
}

function displayPlaces(places) {
    const placesDropdown = document.getElementById('placesDropdown');
    placesDropdown.innerHTML = ''; // Clear existing options

    places.forEach((place) => {
        const option = document.createElement('option');
        option.value = place.name;
        option.textContent = place.name;
        placesDropdown.appendChild(option);
    });
};




// Section 3: Initialisation
function setupEventListeners() {
    document.getElementById("imageInput").addEventListener("change", handleImageChange);
    document.getElementById("addImageButton").addEventListener("click", () => document.getElementById("imageInput").click());
    document.getElementById("saveEntry").addEventListener("click", saveEntry);
    document.getElementById('getPrompt').addEventListener('click', getPrompt);
    document.getElementById('goBack').addEventListener('click', goBack);

    // Dropdown for showing locations
    document.getElementById('locationButton').addEventListener('click', function() {
        const placesLabel = document.getElementById('placesLabel');
        const placesDropdown = document.getElementById('placesDropdown');

        if (placesDropdown.classList.contains('hidden')) {
            placesLabel.classList.remove('hidden');
            placesDropdown.classList.remove('hidden');

            if (placesDropdown.options.length <= 1) {
                getUserLocation();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
