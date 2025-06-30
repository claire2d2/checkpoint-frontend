import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CountryType } from "../types";
import { FIND_COUNTRY } from "../api/queries";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

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

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="mt-3">
            <Link to="/" className="flex gap-2 mb-4">
                <ArrowLeft /> Go back to countries list
            </Link>
            {loading && (
                <div className="flex flex-col items-center text-2xl md:text-xl gap-2">
                    <Skeleton className="h-[60px] w-[100px] rounded-xl" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            )}
            {data && !loading && (
                <div className="flex flex-col items-center text-2xl md:text-xl">
                    <div className="text-8xl">{data?.country?.emoji}</div>
                    <div>Name: {data?.country?.name}</div>
                    <div>Continent: {data?.country?.continent?.name}</div>
                </div>
            )}
        </div>
    );
}
