// Initialize Kinvey
Kinvey.initialize({
  appKey: 'kid_WJt3WXdOpx',
  appSecret: '7cfd74e7af364c8f90b116c835f92e7d'
})
  .then(function(activeUser) {
    if (activeUser) {
      return activeUser.logout();
    }

    return null;
  })
  .then(function() {
    location.replace('/login.html');
  })
  .catch(function(error) {
    console.log(error);
  });
