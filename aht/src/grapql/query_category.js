import gql from 'graphql-tag';

export const GET_ALL_CATEGORIES = gql`
  query {
    categories(filters: {}, pageSize: 20, currentPage: 1) {
      items {
        id
        name 
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($id: String!) {
    categories(filters: { ids: { eq: $id } }) {
      items {
        id
        name
        
      }
    }
  }
`;