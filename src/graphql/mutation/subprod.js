import gql from "graphql-tag";

export const createSubprodMutation = gql`
  mutation createSubprod(
    $name: String
    $company_id: String
    $subcat_id: String
    $price: Int
  ) {
    createSubprod(
      name: $name
      company_id: $company_id
      subcat_id: $subcat_id
      price: $price
    ) {
      ok
      subprod {
        id
        name
        company_id
        price
        subcat_id
        author {
          id
          name
          lastname
          picture
        }

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
