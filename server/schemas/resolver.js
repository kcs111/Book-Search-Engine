const {Book, User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){

            return User.findOne({_id: context.user._id}).populate("books");
            }
            throw new AuthenticationError("1 not logged in.");
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = await signToken(user);
            return {user, token};
        },
        saveBook: async (parent, {bookData}, context) => {
            if(context.user){

            return User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: bookData}},
                {new: true}
            );
            }
            throw new AuthenticationError("2 ot logged in ")
        },
        deleteBook: async (parent, {bookId}, context) => {
            if(context.user){

            return Book.findOneAndUpdate(
                {_id: context.user._id},
                {$pull:{savedBooks: context.bookId}},
                {new: true}
            );
            }
            throw new AuthenticationError("3 not logged in ")

        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError("4 invalid login / password");
            }
            const  correctPassword  = await User.isCorrectPassword(password);
             console.log("---> correctPassword :" + (correctPassword) );
            if(!correctPassword){

                throw new AuthenticationError("5 invalid login / password");
            }
            const  token  = signToken(user);
             console.log("---> token :" + (token) );
            return {token, user};
        },
    },
};

module.exports = resolvers;
