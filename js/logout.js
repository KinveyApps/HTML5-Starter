// Logout
Kinvey.User.logout()
  .then(function() {
    location.replace('/login.html');
  });
