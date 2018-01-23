const axios = require("axios");
const get = require('lodash/get');
const auth = require('./src/auth');
const createErrorResponse = require('./src/helpers/create-error-response');

module.exports.authorizeUser = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hi ⊂◉‿◉つ from Private API. Only logged in users can see this',
    }),
  });
};

module.exports.auth = auth;
