// Bind to the submit event of the file form.
$('#file-form').submit(function(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Remove the upload-success and upload-error
  $('#upload-success').remove();
  $('#upload-error').remove();

  // Get entered values
  var file = $('#file')[0].files[0];

  if (file) {
    var filename = $('#filename').val();
    filename = filename || filename !== '' ? filename : file.name;

    // Upload the file
    Kinvey.Files.upload(file, { filename: filename, public: true })
      .then(function() {
        $('#file-form').append('<p id="upload-success" class="text-success" style="margin-top: 10px;">File uploaded!</p>');
      })
      .catch(function(error) {
        $('#file-form').append('<p id="upload-error" class="text-danger" style="margin-top: 10px;">' + error.message + '</p>');
      });
  } else {
    $('#file-form').append('<p id="upload-error" class="text-danger" style="margin-top: 10px;">Please select a file to upload.</p>');
  }
});
