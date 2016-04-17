import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} from 'graphql';

import data from './data.json';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, args) => data[args.id]
      }
    }
  })
});
