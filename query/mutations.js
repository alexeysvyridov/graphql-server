
const { GraphQLObjectType, GraphQLString } = require('graphql');
const {UserType} = require('./types');
const User = require('../mongo');
const mongoose = require('mongoose');
const { ErrorNames } = require('../consts/errors');
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
          async resolve(parent, args) {
            const isExist = await User.findOne({email: args.email});

            if (isExist) {
              throw new Error(ErrorNames.USER_ALREADY_EXISTS)
            }

            try {
              const user = await User.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: args.password
              })
              console.log('user created', user);
              return args
            } catch (error) {
              console.log(error);
              throw new Error(ErrorNames.SERVER_ERROR)
            }
          }
      }
  }
});

module.exports = {
  Mutation,
}
