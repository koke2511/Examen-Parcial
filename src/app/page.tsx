'use client'
import { useEffect, useState } from "react";
import { Cocktail } from "@/types";
import { useRouter } from "next/navigation";
import { getCocktails } from "@/lib/cocktails";
import { getCocktailRandom } from "@/lib/cocktails";
import { AxiosError } from "axios";

const FuncionCocktel = () => {

  const [cocktail, setCocktail] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState <String> ("");

  const router = useRouter();

  useEffect(() => {
          getCocktails()
          .then((data) => {
              setCocktail(data)
          })
          .catch((e: AxiosError) => {
              setError (e.message)
          })
          .finally(() => {
              setLoading(false);
          })
              
      }, []);

  const CocktailRandom = async () => {
    const drink = await getCocktailRandom();

    router.push(`/cocktail/${drink.idDrink}`);
  };

  return(
    <div>
      <h1>Cocktails</h1>
      <button onClick={CocktailRandom}>Dime algo bonito</button>

      {loading && <h2>Loading...</h2>}
      <div>
        {cocktail && cocktail.map((cocktail: Cocktail) => (
          <div key={cocktail.idDrink} onClick={() => router.push(`/cocktail/${cocktail.idDrink}`)}>
            {cocktail.strDrink}
             <img src={cocktail?.strDrinkThumb}/>
             <p>{cocktail.strDrink}</p>
          </div>
        ))}
        
      </div>
    </div>
  );

};

export default FuncionCocktel;