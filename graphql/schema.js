const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    input PostInput {
        id: ID!
        title: String!
        content: String!
        imageUrl: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        status: String!
        password: String
        posts: [Post!]!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input PostInputData {
        title: String!
        imageUrl: String!
        content: String!
    }

    type AuthData {
        token: String!
        userId: String! 
    }

    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }
    type DeletedData{
        message: String!, 
        _id: ID!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
        updatePost(postInput: PostInput!): Post!
        deletePost(id: String!): DeletedData!
    }
    
    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getPosts(page: Int): PostData!
        getSinglePost(id: ID!): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
