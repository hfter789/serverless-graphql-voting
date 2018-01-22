const axios = require("axios");
const get = require('lodash/get');

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

module.exports.authorizeUser = (event, context, callback) => {
  const authToken = event.pathParameters.id;
  if(!authToken) callback(null, createErrorResponse(401, 'Unauthorized'));
  axios.get(`https://graph.facebook.com/me?access_token=${authToken}`)
  .then(authResp => {
    const userId = get(authResp, 'data.id');
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        user: userId
      })
    });
  })
  .catch(error => {
    callback(null, createErrorResponse(401, 'Unauthorized'));
  });
};
