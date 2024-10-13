import { useEffect, useState } from "react";
import { constant } from "./constants/constants";
import PokemonCard from "./components/PokemonCard";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(`${constant.API_URL}?limit=20`);

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(`${constant.API_URL}/${pokemon.name}`);
        const data = await res.json();

        // Check if the Pokémon is already in the array before adding
        setAllPokemons((currentList) => {
          if (!currentList.some((p) => p.id === data.id)) {
            return [...currentList, data].sort((a, b) => a.id - b.id);
          }
          return currentList;
        });
      });
    }

    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <h1>{constant.PAGE_TITLE}</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => (
            <PokemonCard
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          {constant.BUTTON_LABEL}
        </button>
      </div>
    </div>
  );
};

export default App;
