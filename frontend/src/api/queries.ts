import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
    query Countries {
        countries {
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

export const FIND_COUNTRY = gql`
    query Country($code: String!) {
        country(code: $code) {
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

export const LIST_CONTINENTS = gql`
    query Continents {
        continents {
            id
            name
        }
    }
`;
