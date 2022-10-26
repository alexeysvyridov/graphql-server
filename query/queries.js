const { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString } = require('graphql');
const {UserType} = require('./types');
const User = require('../mongo');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      getAllUsers: {
          type: new GraphQLList(UserType),
            resolve() {
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
          args: { _id: { type: GraphQLString } },
          resolve(parent, args) {
            return new Promise((resolve,reject)=>{
                User.findOne({_id: args._id},(err,user)=>{
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