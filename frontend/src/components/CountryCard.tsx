import { CountryType } from "../types";
import { Link } from "react-router-dom";

export function CountryCard({ country }: { country: CountryType }) {
    return (
        <Link key={country.id} to={`/country/${country.code}`}>
            <li className="flex flex-col justify-center items-center m-2 h-32 md:w-32 rounded-lg bg-gray-50 hover:bg-gray-100">
                <div>{country.name}</div>
                <div>{country.emoji}</div>
            </li>
        </Link>
    );
}
