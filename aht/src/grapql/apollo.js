import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://magentoapi.merket.io/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  headers: {
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Content-Type:": "application/json; charset=UTF-8"
  }
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider;
