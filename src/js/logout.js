import { User } from 'kinvey-html5-sdk/lib/user';
import './app';

User.logout()
  .then(() => {
    window.location.assign('/login.html');
  })
  .catch((error) => {
    alert(error);
  });
