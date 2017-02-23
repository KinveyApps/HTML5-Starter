var app = {
  events: {
    // Books;;
    '#reload-books-button click': 'reloadBooks',

    // Files
    '#file-form submit': 'uploadFile',

    // Login
    '#login-form submit': 'login',

    // Profile
    '#profile-form submit': 'saveProfile',

    // Signup
    '#signup-form submit': 'signup'
  },

  reloadBooks: function() {
    // Render the table
    function renderTable(books, selector) {
      // Default books to an empty array
      books = books || [];

      // Create the rows
      var rows = books.map(function(book) {
        return '<tr>\n'
          + '<td>' + book.title + '</td>\n'
          + '<td>' + book.author + '</td>\n'
          + '<td>' + (book.isbn || '') + '</td>\n'
          + '<td>' + book.review + '</td>\n'
          + '</tr>';
      });

      // Create the table
      var html = '<table data-toggle="table" data-toolbar="#toolbar" class="table table-striped">\n'
        +   '<thead>\n'
        +     '<tr>\n'
        +       '<th>Title</th>\n'
        +       '<th>Author</th>\n'
        +       '<th>ISBN</th>\n'
        +       '<th>Review</th>\n'
        +     '</tr>\n'
        +   '</thead>\n'
        +   '<tbody>\n'
        +     rows.join('')
        +   '</tbody>\n'
        + '</table>\n';

      // Add the html to the page
      $(selector).html(html);
    }

    // Load the books
    var store = Kinvey.DataStore.collection('books');
    store.find()
      .subscribe(function(books) {
        renderTable(books, '#books-table')
      }, function(error) {
        console.log(error);
      });
  },

  login: function(event) {
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
    },

    signup: function(event) {
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
    },

    saveProfile: function(event) {
      // Get the active user
      var activeUser = Kinvey.User.getActiveUser();

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
    },

    uploadFile: function(event) {
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
    }
};

// Authorized Hrefs
var authorizedHrefs = [
  '/',
  '/index.html',
  '/upload.html',
  '/profile.html'
];

// Bind events
function bindEvents() {
  return new Promise(function(resolve) {
    var elementEventKeys = Object.keys(app.events);
    elementEventKeys.forEach(function(elementEventKey) {
      var element = elementEventKey.split(' ')[0];
      var event = elementEventKey.split(' ')[1];
      $(element).on(event, app[app.events[elementEventKey]]);
    });
    resolve();
  });
}

// Show the loading modal
$('#loading-modal').modal({
  backdrop: false,
  keyboard: false,
  show: true
});

// Initialize Kinvey
Kinvey.initialize({
  appKey: '<appKey>',
  appSecret: '<appSecret>'
})
  .then(function(activeUser) {
    if (!activeUser && authorizedHrefs.indexOf(location.pathname) !== -1) {
      location.replace('/login.html');
    } else {
     return bindEvents();
    }
  })
  .then(function() {
    $('#loading-modal').modal('hide');
  })
  .catch(function(error) {
    console.log(error);
  });

