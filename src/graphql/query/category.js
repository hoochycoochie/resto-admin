import gql from "graphql-tag";

export const findCategoryAdminQuery = gql`
  query findCategoryAdmin($name: String, $skip: Int, $take: Int) {
    findCategoryAdmin(name: $name, skip: $skip, take: $take) {
      total
      skip
      take
      data {
        id
        name
        picture

        created_at
        updated_at
      }
    }
  }
`;
