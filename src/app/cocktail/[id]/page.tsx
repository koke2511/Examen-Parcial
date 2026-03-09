'use client'

import { getCocktailById } from "@/lib/cocktails";
import { Cocktail } from "@/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const DetailCocktail = () => {
    const { id } = useParams();

    const [cocktail, setCocktail] = useState <Cocktail | null>(null);
    const [error, setError] = useState <string> ("");
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

    return(
        <div className="container">
            <h1>{cocktail?.strDrink}</h1>
            <img  className="image" src = {cocktail?.strDrinkThumb} alt={cocktail?.strDrink} />
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