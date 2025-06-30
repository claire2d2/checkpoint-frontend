import { gql } from "@apollo/client";
export const ADD_COUNTRY = gql`
    mutation AddCountry($data: NewCountryInput!) {
        addCountry(data: $data) {
            id
            code
            name
            emoji
            continent {
                id
                name
            }
        }
    }
`;
