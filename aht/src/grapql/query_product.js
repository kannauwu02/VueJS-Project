import gql from "graphql-tag";

export const GET_PRODUCT = gql`
  query GetProduct($sku: String!) {
    product: products(filter: { sku: { eq: $sku } }, pageSize: 1) {
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
        related_products {
          uid
          name
          sku
          url_key
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
        ... on ConfigurableProduct {
          configurable_options {
            uid
            attribute_uid
            label
            position
            use_default
            attribute_code
            values {
              uid
              label
              swatch_data {
                value
              }
            }
            product_id
          }
          variants {
            product {
              uid
              name
              sku
              ... on PhysicalProductInterface {
                weight
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
            attributes {
              label
              code
              value_index
            }
          }
        }
      }
      total_count
    }
  }
`;
