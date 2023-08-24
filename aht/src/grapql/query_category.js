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
  query ($name: String!, $pageSize: Int!, $currentPage: Int!, $sort: ProductAttributeSortInput) {
    categories(filters: { name: { match: $name } }) {
      items {
        id
        name
        products(
          pageSize: $pageSize
          currentPage: $currentPage
          sort: $sort) {
          items {
            id
            sku
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
            total_pages
          }
        }
      }
    }
  }
`;