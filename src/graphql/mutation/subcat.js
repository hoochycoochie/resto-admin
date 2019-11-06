import gql from "graphql-tag";

export const createSubcatMutation = gql`
  mutation createSubcat($name:String,$company_id:String) {
    createSubcat(name: $name, company_id: $company_id) {
      ok
      subcat{
        id
        name
        company_id
        author{
            id
            name
            lastname
            picture
        }
        subprod_count
        created_at
        updated_at
      }
      errors{
          path
          message
      }
    }
  }
`;
