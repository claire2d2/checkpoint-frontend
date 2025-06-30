import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CreateCountryType } from "../types";
import { LIST_CONTINENTS } from "../api/queries";
import { ContinentsType } from "../types";
import { ADD_COUNTRY } from "../api/mutations";

interface AddCountryFormProps {
    setNbCountriesAdded: React.Dispatch<React.SetStateAction<number>>;
}

export function AddCountryForm({ setNbCountriesAdded }: AddCountryFormProps) {
    const { data: continentsData } = useQuery<ContinentsType>(LIST_CONTINENTS);
    const initialData = {
        code: "",
        continent: {
            id: 0,
        },
        emoji: "",
        name: "",
    };
    const [data, setData] = useState<CreateCountryType>(initialData);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        console.log("data", data);
    }, [data]);
    const [addCountry, { error }] = useMutation<CreateCountryType>(ADD_COUNTRY);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: name === "continent" ? { id: Number(value) } : value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        values: any
    ) => {
        e.preventDefault();
        if (
            data.code === "" ||
            data.name === "" ||
            data.emoji === "" ||
            data.continent.id === 0
        ) {
            setErrorMessage("Please fill in all the fields");
            return;
        }
        // const values = Object.fromEntries(formData) as any;
        addCountry({
            variables: { data: values },
            onCompleted: async () => {
                console.log("Country created");
                setNbCountriesAdded((prev) => prev + 1);
                setData(initialData);
            },
        });
        if (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e, data)}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
                <label htmlFor="emoji">Emoji:</label>
                <input
                    type="text"
                    name="emoji"
                    value={data.emoji}
                    onChange={handleChange}
                />
                <label htmlFor="code">Code:</label>
                <input
                    type="text"
                    name="code"
                    value={data.code}
                    onChange={handleChange}
                />
                <select
                    name="continent"
                    value={data.continent.id}
                    onChange={handleChange}
                >
                    <option value={0} selected disabled>
                        Select a continent
                    </option>
                    {continentsData?.continents?.map((continent) => (
                        <option key={continent.id} value={continent.id}>
                            {continent.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    disabled={
                        data.code === "" ||
                        data.name === "" ||
                        data.emoji === "" ||
                        data.continent.id === 0
                    }
                >
                    Submit
                </button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    );
}
