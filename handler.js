const axios = require("axios");
const get = require('lodash/get');
const { voteOptionType, voteType } = require('./src/graphql-types');
const auth = require('./src/auth');
const createErrorResponse = require('./src/helpers/create-error-response');

const {
  graphql,
  GraphQLID,
  GraphQLList,
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

function getVoteById(id) {
  return [
    {
      _id: 1,
      topic: 'hello',
      voteOptions: [],
    }
  ];
}

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType', // an arbitrary name
    fields: {
      vote: {
        type: new GraphQLList(voteType),
        args: {
          id: {
            type: GraphQLID,
          },
        },
        resolve: (root, args) => getVoteById(args.id),
      },
      // userVote: {
      //   type: new GraphQLList(voteType),
      //   resolve: (root, args, context, { rootValue: { userId } }) => {
      //     if (userId) {
      //       return getUserPoll(userId);
      //     }
      //     return [];
      //   },
      // },
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
