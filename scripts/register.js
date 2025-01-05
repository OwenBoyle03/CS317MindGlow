document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var dob = document.getElementById('dob').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log('New joiner: ', name);
    window.location.href = "login.html";
});


function setDobMax() {
    const d = new Date(new Date().setFullYear(new Date().getFullYear() - 13));
    document.getElementById("dob").max = d.toISOString().substring(0, 10);
}

setDobMax();