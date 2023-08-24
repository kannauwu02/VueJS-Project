import gql from "graphql-tag";

export const GET_PRODUCT = gql`
  query GetProduct($sku: String!) {
    products(
      filter: { sku: { eq: $sku } }
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
