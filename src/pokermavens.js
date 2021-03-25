const req = require('../src/req');
const _ = require('underscore');
const accounts = ['AccountsAdd', 'AccountsDecBalance', 'AccountsDelete', 'AccountsEdit', 'AccountsGet', 'AccountsIncBalance', 'AccountsList', 'AccountsPassword', 'AccountsPermission', 'AccountsSessionKey', 'AccountsTicket'];
const blacklist = ['BlacklistAdd', 'BlacklistDelete', 'BlacklistEdit', 'BlacklistGet', 'BlacklistList'];
const connections = ['ConnectionsGet', 'ConnectionsList', 'ConnectionsMessage', 'ConnectionsTerminate'];
const logs = ['LogsAddEvent', 'LogsError', 'LogsEvent', 'LogsHandHistory', 'LogsLobbyChat'];
const ringGames = ['RingGamesAdd', 'RingGamesDelete', 'RingGamesEdit', 'RingGamesGet', 'RingGamesList', 'RingGamesMessage', 'RingGamesOffline', 'RingGamesOnline', 'RingGamesOpen', 'RingGamesPause', 'RingGamesPlaying', 'RingGamesResume', 'RingGamesWaiting'];
const system = ['SystemAccount', 'SystemBalance', 'SystemGet', 'SystemSet', 'SystemLobbyMessage', 'SystemReboot', 'SystemStats'];
const tournaments = ['TournamentsAdd', 'TournamentsDelete', 'TournamentsEdit', 'TournamentsGet', 'TournamentsList', 'TournamentsMessage', 'TournamentsOffline', 'TournamentsOnline', 'TournamentsOpen', 'TournamentsPause', 'TournamentsPlaying', 'TournamentsRegister', 'TournamentsRemoveNoShows', 'TournamentsResults', 'TournamentsResume', 'TournamentsStart', 'TournamentsStats', 'TournamentsUnregister', 'TournamentsWaiting'];
const commands = accounts.concat(blacklist, connections, logs, ringGames, system, tournaments);
const zipCommands = ['AccountsList','BlacklistList','ConnectionsList','RingGamesList','RingGamesPlaying','TournamentsList','TournamentsPlaying','TournamentsResults'];

function PM(config) {
  const methods = {};
  _.each(commands, (com) => {
    methods[com] = (params) => commandRequest(config, com, params);
  });
  return methods;
}

module.exports = PM;

function commandRequest(config, command, params) {
  const form = _.extend({Command: command}, params);

  //if (_.contains(zipCommands, command)) {
  //  return req(form, config).then(zipObj);
  //} else {
    return req(form, config);
  //}
}

function zipObj(body) {
	const obj = _.pick(body, (value, key, object) => _.isArray(value));
	const keys = _.keys(obj);
	const values = _.map(keys, (k) => obj[k]);
	const valueSlices = _.zip.apply(_, values);
	return _.map(valueSlices, _.partial(_.object, keys));
}
