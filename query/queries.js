const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');
const {UserType} = require('./types');
const User = require('../mongo');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      getAllUsers: {
          type: new GraphQLList(UserType),
          args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return new Promise((resolve,reject)=>{
                    User.find((err,users)=>{
                        if(err) reject(err);
                        else resolve(users);
                    })
                })
          }
      },
      getUser: {
          type: UserType,
          args: { id: { type: GraphQLInt } },
          resolve(parent, args) {
            return new Promise((resolve,reject)=>{
                User.findOne({id: args.id},(err,user)=>{
                    if(err) reject(err);
                    else resolve(user);
                })
            })
        }
      }
  }
});

module.exports = {
  RootQuery,
}