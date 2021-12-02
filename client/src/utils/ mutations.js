import {gql} from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser(
        $username: String!,
        $email: String!,
        $password: String!
    ) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook( $savedBook: SavedBooks ){
        saveBook( savedBook: $savedBook ){
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String){
        deleteBook(bookId: $bookId){
            _id
            username
            savedBooks
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

