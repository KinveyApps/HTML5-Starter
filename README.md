# HTML5-Starter
A Kinvey starter application that uses the Kinvey HTML5 3.x SDK.

## Setup

1. Clone the repo.
2. Create an app backend using the [console](http://console.kinvey.com) for your application.
2. Create a user (with password) using the [console](http://console.kinvey.com) for your application.
3. Open `www/js/app.js` in a text editor
4. Search for `<appKey>` and `<appSecret>` and replace with your `appKey` and `appSecret` for the app you created in step 1.
5. Create a `books` collection and import `data/books.json`.

**Mobile Identity Connect Setup** *<small>(Optional)</small>*

6. Open `www/js/app.js` in a text editor.
7. Serach for `<micRedirectUr>` and replace with your `redirectUri` for Mobile Identity Connect

## Run

1. Execute `npm install`.
2. Execute `npm start`.

## License

Copyright (c) 2017 Kinvey Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in
writing, software distributed under the License
is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing permissions and limitations under
the License.
