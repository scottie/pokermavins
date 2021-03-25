Poker Mavens API Wrapper
==================

Lightweight promise based Node.js wrapper for the Poker Mavens Admin API.

## Poker Mavens Version

Poker Mavens version **4.20** is the lowest version that can be used with this module since it is when the JSON response format was introduced.

## Installation

    $ npm install pokermavens --save

## Usage

Create new instance and pass in your Poker Mavens API URL and API Password.
```javascript
var PM = require('pokermavens');

var pm = new PM({
  url: 'http://yourpmapiurl.com',
  password: 'yourapipassword'
});
```

All of the commands on the [API Command List](https://www.briggsoft.com/docs/pmavens/Technical_Interface.htm) can be accessed.

**NOTE**: All commands are PascalCase

```javascript
// Create a new account
pm.AccountsAdd({
  player: 'newguy',
  pw: 'pass',
  location: 'Newland',
  email: 'itsnew@guy.com'
})
.then(function(result) {
  console.log(result);
})
.catch(function(err) {
  console.log(err);
});
```

## Response

Most of the responses from the Poker Mavens API are returned directly in the response from the module. The only exceptions are for Errors and Lists.

### Errors

By default the Poker Mavens API will send back a "Result" parameter that could be either Ok or Error. To stick with traditional Node.js style error handling, if the Result is an Error it is sent back in the `catch` method.

### Lists

Anytime a list of results is returned from the API it is in an object of arrays instead of an array of objects.

For example:

```javascript
{"Result":"Ok","Accounts":3,"Player":["Aces123","BoneCrusher","David"],"Balance":[2345,3470,1000]}
```

To make the response look like a more traditional JSON array, all of the lists are transformed into array of objects.

Below is a list of the commands that are currently being transformed:

'AccountsList','BlacklistList','ConnectionsList','RingGamesList','RingGamesPlaying','TournamentsList','TournamentsPlaying','TournamentsResults'

## Running tests

`npm test`
