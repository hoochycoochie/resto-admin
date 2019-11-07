import gql from "graphql-tag";

export const createProductMutation = gql`
  mutation createProduct($product: ProductInput, $company_id: String) {
    createProduct(product: $product, company_id: $company_id) {
      ok
      product {
        id
        name
        company_id
        description
        created_at
        updated_at
      }
      errors {
        path
        message
      }
    }
  }
`;
