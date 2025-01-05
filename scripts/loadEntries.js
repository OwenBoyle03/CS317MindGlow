document.addEventListener('DOMContentLoaded', () => {
    const entriesContainer = document.getElementById('entriesContainer');
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    entries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'entry';

        // Displaying the date
        const dateElement = document.createElement('div');
        dateElement.className = 'entry-date';
        dateElement.textContent = `Date: ${entry.date}`;
        entryElement.appendChild(dateElement);

        // Displaying the location
        if (entry.location && entry.location !== "") {
            const locationElement = document.createElement('div');
            locationElement.className = 'entry-location';
            locationElement.textContent = `Location: ${entry.location}`;
            entryElement.appendChild(locationElement);
        }

        // Displaying the entry text
        const textElement = document.createElement('p');
        textElement.className = 'entry-text';
        textElement.textContent = entry.text;
        entryElement.appendChild(textElement);

        // Displaying the image if it exists
        if (entry.image) {
            const imageElement = document.createElement('img');
            imageElement.src = entry.image;
            imageElement.alt = 'Entry Image';
            imageElement.className = 'entry-image';
            entryElement.appendChild(imageElement);
        }

        entriesContainer.appendChild(entryElement);
    });
});

function goBack() {
    window.history.back();
}
