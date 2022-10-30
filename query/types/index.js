const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
      _id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
  })
})
const AuthType = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
      user: {
        type: new GraphQLObjectType({
          name: 'user',
          fields: {
            _id: { type: GraphQLString },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
          }
      })
    },
    token: { type : GraphQLString }
  })
})

module.exports = {
  UserType,
  AuthType
};