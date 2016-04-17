import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

import {
  getCompaniesInformations,
  getCompanyStock
} from './api';

const stockType = new GraphQLObjectType({
  name: 'Stock',
  fields: {
    lastPrice: { type: GraphQLFloat },
    change: { type: GraphQLFloat },
    changePercent: { type: GraphQLFloat },
    marketCap: { type: GraphQLFloat },
  }
});

const companyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    symbol: { type: GraphQLString },
    name: { type: GraphQLString },
    exchange: { type: GraphQLString },
    stock: {
      type: stockType,
      resolve: ({ symbol }) => getCompanyStock(symbol)
    }
  }
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      companies: {
        type: new GraphQLList(companyType),
        args: {
          search: {
            type: GraphQLString
          }
        },
        resolve: (_, { search }) => getCompaniesInformations(search)
      }
    }
  })
});
