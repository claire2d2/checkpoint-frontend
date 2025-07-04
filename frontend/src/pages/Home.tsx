import { useState, useEffect } from "react";
import { CountriesType, CountryType } from "../types";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "../api/queries";
import { AddCountryForm } from "../components/AddCountryForm";
import { CountryCard } from "../components/CountryCard";

export function HomePage() {
    const [nbCountriesAdded, setNbCountriesAdded] = useState<number>(0);

    const { data, loading, error, refetch } =
        useQuery<CountriesType>(LIST_COUNTRIES);

    useEffect(() => {
        refetch();
        console.log("nbCountriesAdded", nbCountriesAdded);
    }, [nbCountriesAdded]);

    if (error) {
        return <div>There was an error. Please refresh the page.</div>;
    }

    return (
        <div>
            <AddCountryForm
                setNbCountriesAdded={setNbCountriesAdded}
                loading={loading}
            />
            {loading && <div>Loading...</div>}
            {data && !loading && (
                <ul className=" grid grid-cols-2 md:grid-cols-8">
                    {data?.countries?.map((c: CountryType) => (
                        <CountryCard country={c} />
                    ))}
                </ul>
            )}
        </div>
    );
}
