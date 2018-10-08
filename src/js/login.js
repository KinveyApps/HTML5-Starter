import $ from 'jquery';
import * as DataStore from 'kinvey-html5-sdk/lib/datastore';
import { User } from 'kinvey-html5-sdk/lib/user';
import './app';
import '../styles/login.scss';

$(function () {
  function login() {
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    return User.login(username, password);
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
    login();
  });

  $('#login-mic').on('click', function () {
    loginWithMIC();
  });
});
