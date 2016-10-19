// Get the active user
var activeUser = Kinvey.User.getActiveUser();

// Update the form values
$('#username').val(activeUser.data.username);
$('#password').val(activeUser.data.password);
$('#firstname').val(activeUser.data.firstname || '');
$('#lastname').val(activeUser.data.lastname || '');

// Bind to the submit event of the profile form.
$('#profile-form').submit(function(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Remove the profile-success and profile-error
  $('#profile-success').remove();
  $('#profile-error').remove();

  // Get entered values
  var data = {
    username: $('#username').val(),
    firstname: $('#firstname').val(),
    lastname: $('#lastname').val()
  };

  // Login to Kinvey
  activeUser.update(data)
    .then(function() {
      $('#profile-form').append('<p id="profile-success" class="text-success" style="margin-top: 10px;">Profile updated!</p>');
    })
    .catch(function(error) {
      $('#profile-form').append('<p id="profile-error" class="text-danger" style="margin-top: 10px;">' + error.message + '</p>');
    });
});
