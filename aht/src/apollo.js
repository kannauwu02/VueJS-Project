import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'; // Correct import paths
// import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://magentoapi.merket.io/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;