import gql from "graphql-tag";

export const findSubprodQuery = gql`
  query findSubprod(
    $subcat_id: String
    $name: String
    $company_id: String
    $skip: Int
    $take: Int
  ) {
    findSubprod(
      subcat_id: $subcat_id
      name: $name
      company_id: $company_id
      skip: $skip
      take: $take
    ) {
      total
      skip
      take
      data {
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
    }
  }
`;

export const subprodsQuery = gql`
  query subprods($subcat_id: String) {
    subprods(subcat_id: $subcat_id) {
      id
      name
      price
    }
  }
`;
