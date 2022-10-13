const express = require("express");
const PORT = 6969
const app = express();
const userData = require('./MOCK_DATA.json');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: {type: GraphQLInt}},
            resolve(parent, args) {
                return userData
            }
        },
        getUser: {
            type: UserType,
            args: { id: {type: GraphQLInt}},
            resolve(parent, args) {
                return userData.find((user) => user.id === args.id)
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length +1, 
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

const schema = new graphql.GraphQLSchema({query: RootQuery, mutation: Mutation})
// app.use(cors());
app.use('/graphql',
cors(),
graphqlHTTP({
    schema,
    graphiql: true,
},
))

app.listen(PORT, () => {
    console.log('Server is running, listen port', PORT);
})