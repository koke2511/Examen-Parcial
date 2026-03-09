import { api } from "./axios";


export const getCocktailById = async (id: string) => {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.drinks[0];
};

export const getCocktails = async () => {
    const response = await api.get ("/search.php?s=margarita");
    return response.data.drinks;
};

export const getCocktailRandom = async () => {
    const response = await api.get("/random.php");
    return response.data.drinks[0];
};
