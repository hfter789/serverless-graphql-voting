const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  return authResponse
}

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports = (event, context, callback) => {
  if (!event.authorizationToken) {
    return callback('Unauthorized')
  }

  const authToken = event.authorizationToken;

  axios.get(`https://graph.facebook.com/me?access_token=${authToken}`)
  .then(authResp => {
    const userId = get(authResp, 'data.id');
    return callback(null, generatePolicy(userId, 'Allow', event.methodArn))
  })
  .catch(error => {
    return callback('Unauthorized');
  });
}
