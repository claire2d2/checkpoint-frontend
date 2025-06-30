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
