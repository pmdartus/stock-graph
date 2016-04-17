import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} from 'graphql';
import graphqlHTTP from 'express-graphql';
import express from 'express';

import data from './data.json';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }
});

const schema = new GraphQLSchema({
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


express()
  .use('/graphql', graphqlHTTP({ schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
