import { User, DataStore } from 'kinvey-html5-sdk';
import 'bootstrap';
import './app';

if (!User.getActiveUser()) {
  window.location.assign('/login.html');
}

const collection = DataStore.collection('pies');
collection.find()
  .subscribe(function (pies) {
    console.log(pies);
  });
