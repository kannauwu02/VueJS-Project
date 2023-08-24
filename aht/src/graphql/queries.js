import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query {
    categories(filters: {}, pageSize: 20, currentPage: 1) {
      items {
        id
        name
        products {
          items {
            id
            name
            thumbnail {
              url
            }
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
              }
            }
            
          }
          total_count
          page_info {
          current_page
          page_size
          }
        }
      }
    }
  }
`;