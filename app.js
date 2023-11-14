document.getElementById('emailCaptureForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var data = { email: email };

    fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
        alert('Thank you for your subscription!');
        // Reset the form after successful submission or show a success message
        document.getElementById('emailCaptureForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        // Show error message to the user
        alert('An error occurred while subscribing.');
    });
});