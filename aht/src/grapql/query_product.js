import gql from "graphql-tag";

export const GET_PRODUCT = gql`
  query {
    product: products(
      filter: { sku: { eq: "laptop-1" } }
      pageSize: 1
      currentPage: 1
    ) {
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
        media_gallery {
          url
        }
        review_count
        rating_summary
        reviews {
          items {
            average_rating
            summary
            text
            created_at
            nickname
          }
        }
      }
      total_count
    }
  }
`;
