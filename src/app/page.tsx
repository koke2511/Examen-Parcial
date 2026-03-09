'use client'
import { useEffect, useState } from "react";
import { Cocktail } from "@/types";
import { useRouter } from "next/navigation";
import { getCocktails } from "@/lib/cocktails";
import { getCocktailRandom } from "@/lib/cocktails";
import { AxiosError } from "axios";
import { CocktailSearch } from "@/lib/cocktails";

const FuncionCocktel = () => {

  const [cocktail, setCocktail] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState <string> ("");
  const [search, setSearch] = useState<string>("");

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

  const searchCocktail = async (name:string) => {
    const search = await CocktailSearch(name);
  }

  return(
    <div className="container">
      <h1>Cocktails</h1>
      <button className="button" onClick={CocktailRandom}>Dime algo bonito</button>

      <input type="text" placeholder="Buscar cocktail..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button className="button" onClick={() => searchCocktail(search)}>Buscar</button>
      {loading && <h2>Loading...</h2>}
      <div className="grid">
        {cocktail.map((cocktail: Cocktail) => (
          <div className="card" key={cocktail.idDrink} onClick={() => router.push(`/cocktail/${cocktail.idDrink}`)}>
            {cocktail.strDrink}
             <img className="image" src={cocktail?.strDrinkThumb} alt={cocktail.strDrink} />
             <p>{cocktail.strDrink}</p>
          </div>
        ))}
        
      </div>
    </div>
  );

};

export default FuncionCocktel;