
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const {UserType} = require('./types');
const User = require('../mongo');
const mongoose = require('mongoose');
const { ErrorNames } = require('../consts/errors');
const bcrypt = require('bcrypt')
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
      },
      deleteUser: {
        type: UserType,
        args: {
          _id: { type: GraphQLString }
        },
        async resolve(_, args) {
          if (!args._id) {
            throw Error(ErrorNames.VALIDATION_ERROR)
          }
          console.log(args);
          try {
            await User.deleteOne({ _id: args._id })
          } catch (error) {
            console.log(error);
          }
        }
      },
      signup: {
        type: UserType,
        args: {
          firstName:  { type: GraphQLString },
          lastName:  { type: GraphQLString },
          email:  { type: GraphQLString },
          password: {type: GraphQLString}
        },
        async resolve (parent, args) {
          if (!(args.password && args.email)) {
            throw Error(ErrorNames.LOGIN_ERROR)
          }

          const user = new User({
            firstName: args.firstName,
            lastName: args.lastName
          });

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(args.password, salt);

          try {
            const resp = await user.save();
            console.log("User was registred!");
            return resp
          } catch (error) {
            console.log(error);
          }
        }
      }
  }
});

module.exports = {
  Mutation,
}
