import * as DataStore from 'kinvey-html5-sdk/lib/datastore';
import { User } from 'kinvey-html5-sdk/lib/user';
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
