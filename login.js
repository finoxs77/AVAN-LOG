document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    // Show loader
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loginButton').disabled = true;

    setTimeout(() => {
      // Simulate login check and redirect to the profile page
      localStorage.setItem('username', username);
      window.location.href = 'profile.html';
    }, 1500); // Simulate server delay
  } else {
    alert('Please enter both username and password');
  }
});
