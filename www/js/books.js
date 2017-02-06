// Get the active user
var activeUser = Kinvey.User.getActiveUser();

if (activeUser !== null) {
  // Render the table
  function renderTable(books) {
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
      $('#books-table').html(html);
  }

  // Load the books
  var store = Kinvey.DataStore.collection('books');
  store.find()
    .subscribe(function(books) {
      renderTable(books);
    });
}
