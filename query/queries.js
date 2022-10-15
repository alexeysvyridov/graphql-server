const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');
const {UserType} = require('./types');
const userData = require('../MOCK_DATA.json');
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      getAllUsers: {
          type: new GraphQLList(UserType),
          args: { id: { type: GraphQLInt } },
          resolve(parent, args) {
              return userData
          }
      },
      getUser: {
          type: UserType,
          args: { id: { type: GraphQLInt } },
          resolve(parent, args) {
              return userData.find((user) => user.id === args.id)
          }
      }
  }
});

module.exports = {
  RootQuery,
}