'use client'

import { getCocktailById } from "@/lib/cocktails";
import { Cocktail } from "@/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

const DetailCocktail = () => {
    const { id } = useParams();

    const [cocktail, setCocktail] = useState <Cocktail | null>(null);
    const [error, setError] = useState <String> ("");
    const [loading, setLoading] = useState <boolean> (true);
    
    useEffect(() => {
        getCocktailById(String(id))
        .then((data) => {
            setCocktail(data)
        })
        .catch((e: AxiosError) => {
            setError (e.message)
        })
        .finally(() => {
            setLoading(false);
        })
            
    }, [id]);

    const ingredients = [
        cocktail?.strIngredient1,
        cocktail?.strIngredient2,
        cocktail?.strIngredient3,
        cocktail?.strIngredient4,
    ]

    return(
        <div>
            <h1>{cocktail?.strDrink}</h1>
            <img src = {cocktail?.strDrinkThumb}/>
            <br/>
            <p>{cocktail?.strCategory}</p>
            <br/>
            <p>{cocktail?.strAlcoholic}</p>
            <br/>
            <p>{cocktail?.strGlass}</p>
            <br/>
            <p>{cocktail?.strInstructions}</p>
            <br/>
            {/* <p>{cocktail?.strIngredient1}--{cocktail?.strIngredient2}--{cocktail?.strIngredient3}--{cocktail?.strIngredient4}</p>*/}
            <ul>
                <li>
                    {cocktail?.strIngredient1}
                </li>
                <li>
                    {cocktail?.strIngredient2}
                </li>
                <li>
                    {cocktail?.strIngredient3}
                </li>
                <li>
                    {cocktail?.strIngredient4}
                </li>
            </ul>
        </div>
    )
};

export default DetailCocktail;