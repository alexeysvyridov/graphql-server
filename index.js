const express = require("express");
const PORT = 6969
const app = express();
const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const {RootQuery } = require('./query/queries');
const {Mutation } = require('./query/mutations');
const { getErrorCode } = require("./consts/errors");
const schema = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.listen(PORT, async() => {
    console.log('Server is running, listen port', PORT);
});

app.use('/graphql',
    cors(),
    graphqlHTTP({
        schema,
        graphiql: true,
        customFormatErrorFn: (err) => {
            const error = getErrorCode(err.message);
            console.log(error);
            return ({message: error.message, statusCode: error.statusCode})
        }
    },
));