import graphqlHTTP from 'express-graphql';
import express from 'express';

import { schema } from './src/schema';

const IN_DEV = process.env.ENV !== 'production';

express()
  .use('/graphql', graphqlHTTP({
    schema,
    pretty: IN_DEV,
    graphiql: IN_DEV
  }))
  .use('/', (reqq, res) => res.redirect('/graphql'))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
