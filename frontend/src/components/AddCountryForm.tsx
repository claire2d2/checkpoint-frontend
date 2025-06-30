import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CreateCountryType } from "../types";
import { LIST_CONTINENTS } from "../api/queries";
import { ContinentsType } from "../types";
import { ADD_COUNTRY } from "../api/mutations";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface AddCountryFormProps {
    setNbCountriesAdded: React.Dispatch<React.SetStateAction<number>>;
}

export function AddCountryForm({ setNbCountriesAdded }: AddCountryFormProps) {
    const { data: continentsData } = useQuery<ContinentsType>(LIST_CONTINENTS);
    const initialData = {
        code: "",
        continent: {
            id: "",
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
            [name]: value,
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
        <div className="flex flex-col gap-2 my-3">
            <h3 className="font-semibold">Add a country:</h3>
            <form
                onSubmit={(e) => handleSubmit(e, data)}
                className="flex flex-col gap-3 items-center"
            >
                <div className="w-full flex flex-col md:flex-row gap-2">
                    <label htmlFor="name" className="w-1/12">
                        Name:
                    </label>
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Country's name"
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2">
                    <label htmlFor="emoji" className="w-1/12">
                        Emoji:
                    </label>
                    <Input
                        type="text"
                        name="emoji"
                        value={data.emoji}
                        onChange={handleChange}
                        placeholder="Country's emoji"
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2">
                    <label htmlFor="code" className="w-1/12">
                        Code:
                    </label>
                    <Input
                        type="text"
                        name="code"
                        value={data.code}
                        onChange={handleChange}
                        placeholder="Country's code "
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-2">
                    <label htmlFor="continent" className="w-1/12">
                        Continent:{" "}
                    </label>
                    <Select
                        value={String(data.continent.id)}
                        onValueChange={(value: string) =>
                            setData((prevData) => ({
                                ...prevData,
                                continent: { id: Number(value) },
                            }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a continent" />
                        </SelectTrigger>
                        <SelectContent>
                            // <option value={0} selected disabled></option>
                            {continentsData?.continents?.map((continent) => (
                                <SelectItem
                                    key={continent.id}
                                    value={String(continent.id)}
                                >
                                    {continent.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    className="w-1/4"
                    type="submit"
                    disabled={
                        data.code === "" ||
                        data.name === "" ||
                        data.emoji === "" ||
                        data.continent.id === 0
                    }
                >
                    Submit
                </Button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    );
}
