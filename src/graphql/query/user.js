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

export const findUsersAdminQuery = gql`
  query findUsersAdmin(
    $name: String
    $has_company: Boolean
    $is_client: Boolean
    $is_team_member: Boolean
    $is_restaurant: Boolean
    $skip: Int
    $take: Int
  ) {
    findUsersAdmin(
      name: $name
      has_company: $has_company
      is_client: $is_client
      is_team_member: $is_team_member
      is_restaurant: $is_restaurant
      skip: $skip
      take: $take
    ) {
      total
      skip
      take
      data {
        id
        name
        lastname
        phone
        picture
        email

        created_at
        updated_at
      }
    }
  }
`;

export const findDeliverersAdminQuery = gql`
  query findDeliverersAdmin($name: String, $skip: Int, $take: Int) {
    findDeliverersAdmin(
      name: $name

      skip: $skip
      take: $take
    ) {
      total
      skip
      take
      data {
        id
        name
        lastname
        phone
        picture
        email

        created_at
        updated_at
      }
    }
  }
`;

export const findRestaurersAdminQuery = gql`
  query findRestaurersAdmin($name: String, $skip: Int, $take: Int) {
    findRestaurersAdmin(
      name: $name

      skip: $skip
      take: $take
    ) {
      total
      skip
      take
      data {
        id
        name
        lastname
        phone
        picture
        email

        created_at
        updated_at
      }
    }
  }
`;
