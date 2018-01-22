const axios = require("axios");
const get = require('lodash/get');
const auth = require('./src/auth');
const createErrorResponse = require('./src/helpers/create-error-response');

// module.exports.authorizeUser = (event, context, callback) => {
//   const authToken = get(event, 'pathParameters.id');
//   if(!authToken) callback(null, createErrorResponse(401, 'Unauthorized'));
//   axios.get(`https://graph.facebook.com/me?access_token=${authToken}`)
//   .then(authResp => {
//     const userId = get(authResp, 'data.id');
//     callback(null, {
//       statusCode: 200,
//       body: JSON.stringify({
//         user: userId
//       })
//     });
//   })
//   .catch(error => {
//     callback(null, createErrorResponse(401, 'Unauthorized'));
//   });
// };

module.exports.authorizeUser = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hi ⊂◉‿◉つ from Private API. Only logged in users can see this',
    }),
  });
};

module.exports.auth = auth;
