import gql from "graphql-tag";

export const oneCompanyQuery = gql`
  query oneCompany($company_id: String) {
    oneCompany(company_id: $company_id) {
      id
      name
      description
      reference
      picture
      created_at
      updated_at
    }
  }
`;

export const findCompanyAdminQuery = gql`
  query findCompanyAdmin($name: String, $skip: Int, $take: Int) {
    findCompanyAdmin(name: $name, skip: $skip, take: $take) {
      total
      skip
      take
      data {
        id
        name
        description
        reference
        picture
        
      }
    }
  }
`;
