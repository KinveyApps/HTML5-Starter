// Bind to the submit event of the login form.
$('#login-form').submit(function(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Remove the login-error
  $('#login-error').remove();

  // Get entered username and password values
  var username = $('#username').val();
  var password = $('#password').val();

  // Login to Kinvey
  Kinvey.User.login(username, password)
    .then(function() {
      location.replace('/');
    })
    .catch(function(error) {
      $('#login-form').append('<p id="login-error" class="text-danger" style="margin-top: 10px;">' + error.message + '</p>');
    });
});
