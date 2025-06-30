import { CountriesType, CountryType } from "../types";
import { useQuery } from "@apollo/client";
import { LIST_COUNTRIES } from "../api/queries";

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
            {data && (
                <ul>
                    {data?.countries?.map((c: CountryType) => (
                        <li>
                            <div>{c.country.name}</div>
                            <div>{c.country.emoji}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
