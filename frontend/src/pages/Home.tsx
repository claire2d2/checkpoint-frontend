import { useEffect } from "react";
import { CountriesType, CountryType } from "../types";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "../api/example";

export function HomePage() {
    const { data, loading, error } = useQuery<CountriesType>(LIST_COUNTRIES);
    if (loading) {
        return <div>Loading ...</div>;
    }
    if (error) {
        return <div>Error</div>;
    }

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    return (
        <div>
            {data && (
                <ul>
                    {data?.countries?.map((country: CountryType) => (
                        <li>
                            <div>{country.name}</div>
                            <div>{country.emoji}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
