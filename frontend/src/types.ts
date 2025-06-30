export type CountryType = {
    id: number;
    code: string;
    name: string;
    emoji: string;
    continent: ContinentType;
};

export type CreateCountryType = {
    code: string;
    name: string;
    emoji: string;
    continent: {
        id: number;
    };
};
export type CountriesType = {
    countries: CountryType[];
};
export type ContinentType = {
    id: number;
    name: string;
};

export type ContinentsType = {
    continents: ContinentType[];
};
