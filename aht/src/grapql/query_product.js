import gql from "graphql-tag";

export const GET_PRODUCT = gql`
  query {
    products(
      filter: { sku: { eq: "laptop-1" } }
      pageSize: 20
      currentPage: 1
      sort: {}
    ) {
      total_count
      items {
        name
        sku
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;
