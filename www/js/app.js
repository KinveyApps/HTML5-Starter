var app = {
  events: {
    // Signup
    '#signup-form submit': 'signup',

    // Login
    '#login-form submit': 'login',
    '#login-with-mic click': 'loginWithMIC',

    // Files
    '#upload-form submit': 'uploadFile',

    // Profile
    '#profile-form submit': 'saveProfile'
  },

  login: function(event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Remove the login-error
    $('#login-error').hide(0);

    // Get entered username and password values
    var username = $('#username').val();
    var password = $('#password').val();

    // Login to Kinvey
    Kinvey.User.login(username, password)
      .then(function() {
        location.replace('/');
      })
      .catch(function(error) {
        $('#login-error').html('<p>' + error.message + '</p>').show(0);
      });
    },

    loginWithMIC: function(event) {
      // Prevent the form from being submitted
      event.preventDefault();

      // Remove the login-error
      $('#login-error').hide(0);

      // Login with Mobile Identity Connect
      Kinvey.User.loginWithMIC('<micRedirectUri>')
        .then(function() {
          location.replace('/');
        })
        .catch(function(error) {
          $('#login-error').html('<p>' + error.message + '</p>').show(0);
        });
    },

    signup: function(event) {
      // Prevent the form from being submitted
      event.preventDefault();

      // Remove the signup-error
      $('#signup-error').hide(0);

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
          $('#signup-error').html('<p>' + error.message + '</p>').show(0);
        });
    },

    loadBooks: function(dataStoreType) {
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
        var html = '<table class="table table-striped">\n'
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
      var store = Kinvey.DataStore.collection('books', dataStoreType);
      store.find()
        .subscribe(function(books) {
          return renderTable(books, '#books-table')
        });
    },

    loadFiles: function() {
      // Render the table
      function renderTable(files, selector) {
        // Default files to an empty array
        files = files || [];

        // Create the rows
        var rows = files.map(function(file) {
          return '<tr>\n'
            + '<td>' + file._filename + '</td>\n'
            + '<td>' + file.mimeType + '</td>\n'
            + '<td>' + file._public + '</td>\n'
            + '<td><a target="_blank" href="' + file._downloadURL + '">Download URL</a></td>\n'
            + '</tr>';
        });

        // Create the table
        var html = '<table class="table table-striped">\n'
          +   '<thead>\n'
          +     '<tr>\n'
          +       '<th>Filename</th>\n'
          +       '<th>MIME Type</th>\n'
          +       '<th>Public</th>\n'
          +       '<th>Url</th>\n'
          +     '</tr>\n'
          +   '</thead>\n'
          +   '<tbody>\n'
          +     rows.join('')
          +   '</tbody>\n'
          + '</table>\n';

        // Add the html to the page
        $(selector).html(html);
      }

      // Load the files
      Kinvey.Files.find()
        .then(function(files) {
          return renderTable(files, '#files-table')
        });
    },

    uploadFile: function(event) {
      // Prevent the form from being submitted
      event.preventDefault();

      // Remove the upload-success and upload-error
      $('#upload-success').hide(0);
      $('#upload-error').hide(0);

      // Get entered values
      var file = $('#file')[0].files[0];

      if (file) {
        var filename = $('#filename').val();
        var public = document.getElementById('public').checked;
        filename = filename || filename !== '' ? filename : file.name;

        // Show progress
        $('#upload-progress').show(0);

        // Upload the file
        Kinvey.Files.upload(file, { filename: filename, public: public }, { timeout: 10 * 60 * 1000 })
          .then(function() {
            // Hide progress
            $('#upload-progress').hide(0);

            // Show success message
            $('#upload-success').html('<p>File uploaded!</p>').show(0);
          })
          .catch(function(error) {
            // Hide progress
            $('#upload-progress').hide(0);

            // Show error message
            $('#upload-error').html('<p>' + error.message + '</p>').show(0);
          });
      } else {
        // Hide progress
        $('#upload-progress').hide(0);

        // Show error message
        $('#upload-error').html('<p>Please select a file to upload.</p>').show(0);
      }
    },

    saveProfile: function(event) {
      // Get the active user
      var activeUser = Kinvey.User.getActiveUser();

      // Prevent the form from being submitted
      event.preventDefault();

      // Remove the profile-success and profile-error
      $('#profile-success').hide(0);
      $('#profile-error').hide(0);

      // Get entered values
      var data = {
        username: $('#username').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val()
      };

      // Login to Kinvey
      activeUser.update(data)
        .then(function() {
          $('#profile-success').html('<p>Profile updated!</p>').show(0);
        })
        .catch(function(error) {
          $('#profile-error').html('<p>' + error.message + '</p>').show(0);
        });
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
  return new RSVP.Promise(function(resolve) {
    var elementEventKeys = Object.keys(app.events);
    elementEventKeys.forEach(function(elementEventKey) {
      var element = elementEventKey.split(' ')[0];
      var event = elementEventKey.split(' ')[1];
      $(element).on(event, app[app.events[elementEventKey]]);
    });
    resolve();
  });
}

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
    $(document).trigger('app.ready');
  })
  .catch(function(error) {
    alert(error.message);
    console.log(error);
  });

