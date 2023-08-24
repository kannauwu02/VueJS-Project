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

export const GET_PRODUCT_FILTER = gql`
query{
  products(filter: { category_id: { eq: "2" } }) {
    total_count
    aggregations{
      attribute_code
      label
      count
      options{
        count
        label
        value
      }
    }
  }
}`;
