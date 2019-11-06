import gql from "graphql-tag";

export const findProdQuery = gql`
  query findProd($name: String, $company_id: String, $skip: Int, $take: Int) {
    findProd(name: $name, company_id: $company_id, skip: $skip, take: $take) {
      total
      skip
      take
      data {
        id
        name
        company_id
        price

        category {
          id
          name
        }

        created_at
        updated_at
      }
    }
  }
`;
