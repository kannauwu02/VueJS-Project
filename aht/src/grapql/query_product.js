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
query GetProductFilter($id: String!, $pageSize: Int!, $currentPage: Int!, $sort: ProductAttributeSortInput){
  products(filter: { 
    category_id: { eq: $id } } 
    pageSize: $pageSize
    currentPage: $currentPage
    sort: $sort) {
    total_count
    page_info {
      current_page
      page_size
      total_pages
    }
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
  }
}`;
