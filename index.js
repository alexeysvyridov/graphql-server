const express = require("express");
const PORT = 6969
const app = express();

const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const {RootQuery } = require('./query/queries');
const {Mutation } = require('./query/mutations');

const schema = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation })
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