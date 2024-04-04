import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000");

export const UsersAPI = {
  getUser: async function (userId) {
    try {
      const query = gql`
        query getUser($cognitoId: String!) {
          userByCognito(cognitoId: $cognitoId) {
            id
            name
            email
            username
            tokens
          }
        }
      `;
      const { userByCognito } = await client.request(query, {
        cognitoId: userId,
      });
      return userByCognito;
    } catch (err) {
      console.log(err);
    }
  },
  createUser: async function (userInput) {
    try {
      const mutation = gql`
        mutation addUser($userInput: userInput!) {
          addUser(userInput: $userInput) {
            id
            name
            username
          }
        }
      `;
      const variables = { userInput };
      const { addUser } = await client.request(mutation, variables);
      return addUser;
    } catch (err) {
      console.log(err);
    }
  },
};
