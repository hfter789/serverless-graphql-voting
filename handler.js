const axios = require("axios");
const get = require('lodash/get');
const auth = require('./src/auth');
const createErrorResponse = require('./src/helpers/create-error-response');

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.authTest = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hi ⊂◉‿◉つ from Private API. Only logged in users can see this',
    }),
  });
};

function getGreeting(firstName) {
  return `Hello ${firstName}`;
}

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType', // an arbitrary name
    fields: {
      // the query has a field called 'greeting'
      greeting: {
        args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) } },
        type: GraphQLString,
        resolve: (parent, args) => getGreeting(args.firstName),
      },
    },
  }),
  // mutation: new GraphQLObjectType({
  //   name: 'RootMutationType', // an arbitrary name
  //   fields: {
  //     changeNickname: {
  //       args: {
  //         firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) },
  //         nickname: { name: 'nickname', type: new GraphQLNonNull(GraphQLString) },
  //       },
  //       type: GraphQLString,
  //       resolve: (parent, args) => changeNickname(args.firstName, args.nickname),
  //     },
  //   },
  // }),
});

module.exports.query = (event, context, callback) => {
  graphql(schema, get(event, 'queryStringParameters.query'))
  .then(
    result => callback(null, { statusCode: 200, body: JSON.stringify(result) }),
    err => callback(err),
  );
}
module.exports.auth = auth;
