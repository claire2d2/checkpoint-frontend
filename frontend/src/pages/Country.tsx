import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CountryType } from "../types";
import { FIND_COUNTRY } from "../api/queries";
import { ArrowLeft } from "lucide-react";

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

    return (
        <div className="mt-3">
            <Link to="/" className="flex gap-2">
                <ArrowLeft /> Go back to countries list
            </Link>
            <div className="flex flex-col items-center">
                <div className="text-5xl">{data?.country?.emoji}</div>
                <div>Name: {data?.country?.name}</div>
                <div>Continent: {data?.country?.continent?.name}</div>
            </div>
        </div>
    );
}
