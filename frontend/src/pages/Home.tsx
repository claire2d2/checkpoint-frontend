import { useState, useEffect } from "react";
import { CountriesType, CountryType } from "../types";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "../api/queries";
import { AddCountryForm } from "../components/AddCountryForm";

export function HomePage() {
    const [nbCountriesAdded, setNbCountriesAdded] = useState<number>(0);

    const { data, loading, error, refetch } =
        useQuery<CountriesType>(LIST_COUNTRIES);

    useEffect(() => {
        refetch();
        console.log("nbCountriesAdded", nbCountriesAdded);
    }, [nbCountriesAdded]);

    if (loading) {
        return <div>Loading ...</div>;
    }
    if (error) {
        return <div>Error</div>;
    }

    return (
        <div>
            <AddCountryForm setNbCountriesAdded={setNbCountriesAdded} />
            {data && (
                <ul>
                    {data?.countries?.map((c: CountryType) => (
                        <li key={c.id}>
                            <div>{c.name}</div>
                            <div>{c.emoji}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
