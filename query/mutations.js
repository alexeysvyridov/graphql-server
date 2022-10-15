
const { GraphQLObjectType, GraphQLString } = require('graphql');
const {UserType} = require('./types');
const userData = require('../MOCK_DATA.json');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      createUser: {
          type: UserType,
          args: {
              firstName: { type: GraphQLString },
              lastName: { type: GraphQLString },
              email: { type: GraphQLString },
              password: { type: GraphQLString },
          },
          resolve(parent, args) {
              userData.push({
                  id: userData.length + 1,
                  firstName: args.firstName,
                  lastName: args.lastName,
                  email: args.email,
                  password: args.password
              })

              return args
          }
      }
  }
});

module.exports = {
  Mutation,
}
