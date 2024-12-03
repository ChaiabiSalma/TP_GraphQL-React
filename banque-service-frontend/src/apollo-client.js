import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8082/graphql', // Assurez-vous que l'URL correspond à celle de votre backend GraphQL
  cache: new InMemoryCache(),
});

export default client;
