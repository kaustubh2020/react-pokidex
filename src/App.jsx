import { useEffect, useState } from "react";
import "./App.css";
import { constant } from "./constants/constants";
import PokemonCard from "./components/PokemonCard";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    `${constant.API_URL}?limit=${constant.LIMIT}`
  );
  const [error, setError] = useState(null);

  const getAllPokemons = async () => {
    try {
      const res = await fetch(loadMore);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const { results, next } = await res.json();
      setLoadMore(next);
      await createPokemonObjects(results);
    } catch (error) {
      setError(
        "Failed to fetch Pokémon data. Please try again later. " + error
      );
    }
  };

  const createPokemonObjects = async (results) => {
    try {
      const pokemonDetails = await Promise.all(
        results.map((pokemon) =>
          fetch(`${constant.API_URL}/${pokemon.name}`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            return res.json();
          })
        )
      );

      setAllPokemons((currentList) => {
        const newPokemons = pokemonDetails.filter(
          (data) => !currentList.some((p) => p.id === data.id)
        );
        return [...currentList, ...newPokemons]; // No need to sort here
      });
    } catch (error) {
      setError(
        "Error fetching Pokémon details. Please try again later. " + error
      );
    }
  };

  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <h1>{constant.PAGE_TITLE}</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map(({ id, sprites, name, types }) => (
            <PokemonCard
              key={id}
              id={id}
              image={sprites.other["official-artwork"].front_default}
              gif={sprites.other.showdown.front_default}
              name={name}
              type={types[0].type.name}
            />
          ))}
        </div>
        {!error && (
          <button className="load-more" onClick={getAllPokemons}>
            {constant.BUTTON_LABEL}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
