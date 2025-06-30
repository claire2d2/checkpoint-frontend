import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CreateCountryType } from "../types";
import { LIST_CONTINENTS } from "../api/queries";
import { ContinentsType } from "../types";
import { ADD_COUNTRY } from "../api/mutations";

export function AddCountryForm() {
    const { data: continentsData } = useQuery<ContinentsType>(LIST_CONTINENTS);

    const [data, setData] = useState<CreateCountryType>({
        code: "",
        continent: {
            id: 0,
        },
        emoji: "",
        name: "",
    });

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
        // const values = Object.fromEntries(formData) as any;
        addCountry({
            variables: { data: values },
            onCompleted: async () => {
                console.log("Country created");
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
                    {continentsData?.continents?.map((continent) => (
                        <option key={continent.id} value={continent.id}>
                            {continent.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
