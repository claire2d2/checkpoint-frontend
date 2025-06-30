import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CountryType } from "../types";
import { FIND_COUNTRY } from "../api/queries";
type CountryData = {
    country: CountryType;
};
export function Country() {
    const params = useParams();
    const { data, loading, error, refetch } = useQuery<CountryData>(
        FIND_COUNTRY,
        {
            variables: { code: params.id },
        }
    );

    useEffect(() => {
        refetch({ code: params.id });
    }, [params.id]);
    if (loading) {
        return <div>Loading ...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return <div>{data?.country?.name}</div>;
}
