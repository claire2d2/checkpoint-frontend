export type CountryType = {
    id: number;
    code: string;
    name: string;
    emoji: string;
    continent: ContinentType;
};

export type ContinentType = {
    id: number;
    name: string;
};
