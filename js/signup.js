// Bind to the submit event of the signup form.
$('#signup-form').submit(function(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Remove the signup-error
  $('#signup-error').remove();

  // Get entered values
  var data = {
    username: $('#username').val(),
    password: $('#password').val(),
    firstname: $('#firstname').val(),
    lastname: $('#lastname').val()
  };

  // Login to Kinvey
  Kinvey.User.signup(data)
    .then(function() {
      location.replace('/');
    })
    .catch(function(error) {
      $('#signup-form').append('<p id="signup-error" class="text-danger" style="margin-top: 10px;">' + error.message + '</p>');
    });
});
