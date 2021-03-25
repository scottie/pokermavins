const request = require('request');

module.exports = (form, config) => {
  form.Password = config.password;
  form.JSON = 'yes';

  return new Promise(function(resolve, reject) {
    request.post({
      url: config.url,
      json: true,
      form: form
    }, (err, res, body) => {
      const error = createError(err, body);

      if (error) {
        reject(error);
      } else {
        //console.log("body", body);
        resolve(body);
      }
    });
  });
};

function createError(err, body) {
  let error = null;
  if (err) {
    error = err;
  }

  if (body && body.Result === 'Error') {
    error = body.Error;
  }
  return error;
}
