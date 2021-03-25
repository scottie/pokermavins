var nock = require('nock');
var expect = require('chai').expect;
var pmurl = 'http://mypmsite.com:8087/api';
var PM = require('../src/pokermavens');

describe('Accounts', function() {
  var pm;
  before(function() {
    pm = new PM({
    	url: pmurl,
      password: 'testkey'
    });
  });

  after(function() {
    pm = null;
  });

  it('should create new account', function() {
    var form = {
      Player: 'newguy',
      PW: 'pass',
      Location: 'Newland',
      Email: 'itsnew@guy.com'
    };
    nock(pmurl)
      .post('', form)
      .reply(200, {"Result":"Ok","Balance":0});

    pm.AccountsAdd(form)
    .then(function(result) {
      expect(result).to.be.an('object');
      expect(result).to.have.property('Balance');
    });
  });

  it('should list accounts', function() {
    var form = {Fields:'Player,Balance'};
    nock(pmurl)
      .post('', form)
      .reply(200, {"Result":"Ok","Accounts":3,"Player":["Aces123","BoneCrusher","David"],"Balance":[2345,3470,1000]});

    pm.AccountsList(form)
    .then(function(result) {
      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
    });
  });

  it('should decrement a player\'s balance', function() {
    var form = {
      Player: 'newguy',
      Amount: '100'
    };
    nock(pmurl)
      .post('', form)
      .reply(200, {"Result":"Ok","Amount":100,"Balance":500});

    pm.AccountsDecBalance(form)
    .then(function(result) {
      expect(result).to.be.an('object');
      expect(result).to.have.property('Amount');
      expect(result).to.have.property('Balance');
    });
  });

  it('should delete a player account', function() {
    var form = {
      Player: 'newguy'
    };
    nock(pmurl)
      .post('', form)
      .reply(200, {"Result":"Ok"});

    pm.AccountsDelete(form)
    .then(function(result) {
      expect(result).to.be.an('object');
    });
  });

  it('should edit a player account', function() {
    var form = {
      Player: 'newguy',
      Location: 'New Location'
    };
    nock(pmurl)
      .post('', form)
      .reply(200, {"Result":"Ok"});

    pm.AccountsEdit(form)
    .then(function(result) {
      expect(result).to.be.an('object');
    });
  });

  it('should get a single player account', function() {
    var form = {
      Player: 'newguy'
    };
    nock(pmurl)
      .post('', form)
      .reply(200, {"Result":"Ok","Player":"Aces123","Title":"","Level":"","RealName":"John","Location":"Texas","Email":"aces123@gmail.com"});

    pm.AccountsGet(form)
    .then(function(result) {
      expect(result).to.be.an('object');
      expect(result).to.have.property('Player');
      expect(result).to.have.property('RealName');
    });
  });
});
