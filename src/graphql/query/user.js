import gql from "graphql-tag";

export const userCompanyQuery = gql`
  query userCompany {
    userCompany {
      id
      name
      picture
      email
      phone
      
       
    }
  }
`;
