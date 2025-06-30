import { CountriesType, CountryType } from "../types";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "../api/queries";
import { AddCountryForm } from "../components/AddCountryForm";

export function HomePage() {
    const { data, loading, error } = useQuery<CountriesType>(LIST_COUNTRIES);
    if (loading) {
        return <div>Loading ...</div>;
    }
    if (error) {
        return <div>Error</div>;
    }

    return (
        <div>
            <AddCountryForm />
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
