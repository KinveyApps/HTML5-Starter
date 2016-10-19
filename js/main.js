// Initialize Kinvey
// Replace appKey and appSecret with your apps credentials
Kinvey.init({
  appKey: 'kid_WJt3WXdOpx',
  appSecret: '7cfd74e7af364c8f90b116c835f92e7d'
});


// Get the active user
var activeUser = Kinvey.User.getActiveUser();

// Redirect to /login.html if an active user
// does not exist
if (activeUser === null) {
  var authorizedHrefs = [
    '/',
    '/index.html'
  ];

  if (authorizedHrefs.indexOf(location.pathname) !== -1) {
    location.replace('/login.html');
  }
} else {
  // Update the drowdown with the account name
  $('#account-dropdown').html((activeUser.data.firstname || 'User') + ' ' + (activeUser.data.lastname || '') + ' <span class="caret"></span>');
}
