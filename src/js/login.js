import $ from 'jquery';
import { User } from 'kinvey-html5-sdk/lib';
import './app';
import '../styles/login.scss';

$(function () {
  function login(username, password) {
    return User.logout()
      .then(function () {
        return User.login(username, password);
      })
      .then(function () {
        window.location.assign('/index.html');
      });
  }

  function loginWithMIC() {
    User.logout()
      .then(function () {
        return User.loginWithMIC('http://localhost:8080');
      })
      .then(function () {
        window.location.assign('/index.html');
      });
  }

  $('.form-login').on('submit', function (event) {
    event.preventDefault();
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    login(username, password);
  });

  $('#login-mic').on('click', function () {
    loginWithMIC();
  });
});
