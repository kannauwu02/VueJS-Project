import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query {
    categories(filters: {}, pageSize: 20, currentPage: 1) {
      items {
        name
        path
        url_key
      }
    }
  }
`;