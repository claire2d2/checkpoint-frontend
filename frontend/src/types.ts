export type CountryType = {
    id: number;
    code: string;
    name: string;
    emoji: string;
    continent: ContinentType;
};
export type CountriesType = {
    countries: CountryType[];
};
export type ContinentType = {
    id: number;
    name: string;
};
