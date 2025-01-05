

function clearData() {
    if (confirm("Are you sure you want to clear all your data?") === true) {
        localStorage.clear();
        alert("Data has been cleared")
    }
}

function logoff() {
    if (confirm("Are you sure you want to log off?") === true) {
        window.location.href='login.html';
    }
}