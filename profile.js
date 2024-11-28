// Get the username from localStorage and display it
const username = localStorage.getItem('username');
document.getElementById('userName').textContent = username;

// Logout functionality
document.getElementById('logout').addEventListener('click', function() {
  localStorage.removeItem('username');
  window.location.href = 'login.html';  // Redirect to login page
});

// Change profile picture feature
document.getElementById('changePic').addEventListener('click', function() {
  // Simulate profile picture change
  document.getElementById('profilePic').src = 'images/new-profile.png';
});

// Chat button functionality to navigate to chat page
document.getElementById('chatButton').addEventListener('click', function() {
  window.location.href = 'chat.html';  // Redirect to chat page
});
