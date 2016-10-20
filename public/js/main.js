// Initialize Kinvey
// Replace appKey and appSecret with your apps credentials
Kinvey.init({
  appKey: '',
  appSecret: ''
});


// Get the active user
var activeUser = Kinvey.User.getActiveUser();

// Redirect to /login.html if an active user
// does not exist
if (activeUser === null) {
  var authorizedHrefs = [
    '/',
    '/index.html',
    '/upload.html'
  ];

  if (authorizedHrefs.indexOf(location.pathname) !== -1) {
    location.replace('/login.html');
  }
} else {
  // Update the drowdown with the account name
  $('#account-dropdown').html((activeUser.data.firstname || 'User') + ' ' + (activeUser.data.lastname || '') + ' <span class="caret"></span>');
}

/***************/
/* REMOVE THIS */
/***************/
Kinvey.ping()
  .catch(function(error) {
    alert('It looks like something is wrong. Please check that your appKey and appSecret are correct.')
    console.log('Kinvey Ping Failed. Response: ' + error.description);
  });
