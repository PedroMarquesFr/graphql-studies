const users = [
    { _id: String(Math.random()), name: "joao", email: "jooa@gmail.com", active: true, age: 20 },
    { _id: String(Math.random()), name: "joao2", email: "jooa2@gmail.com", active: true, age: 19 },
    { _id: String(Math.random()), name: "joao3", email: "joo3@gmail.com", active: false, age: 20 }
  ]

const { ApolloServer, gql } = require("apollo-server");

//Toda request e POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informacoes (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Os tipos, Scalar Types -> string, int, boolean, float, ID

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
    age:Int!
  }
  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }
  type Query {
    hello: String!
    users: [User!]!
    getUserByEmail(email:String!): User!
  }
  type Mutation {
    createUser(name:String!, email:String!, age:Int!): User!
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello world",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((users) => users.email === args.email);
    }
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        age: args.age,
        active: true
      }
      users.push(newUser)
      return newUser
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server started at ${url}`));
