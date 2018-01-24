const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const voteOptionType = new GraphQLObjectType({
  name: 'VoteOption',
  description: 'the vote option description and vote option count',
  fields: () => ({
    desc: {
      type: GraphQLString,
    },
    voteCount: {
      type: GraphQLInt,
    },
  }),
});

const voteType = new GraphQLObjectType({
  name: 'VoteInfo',
  description: 'vote summary about how many votes each options get',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({_id: id,}) => id.toString()
    },
    topic: {
      type: GraphQLString,
    },
    voteOptions: {
      type: new GraphQLList(voteOptionType),
    },
  }),
});

module.exports = {
  voteOptionType,
  voteType,
}
