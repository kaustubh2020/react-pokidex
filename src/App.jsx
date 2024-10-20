import { useEffect, useState } from "react";
import "./App.css";
import { constant } from "./constants/constants";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";
import ScrollToTopButton from "./components/ScrollToTopBtn";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    `${constant.API_URL}?limit=${constant.LIMIT}`
  );
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
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
    setLoading(false);
  };

  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1>{constant.PAGE_TITLE}</h1>
        {loading && <Loader />}
        {error && <div>{error}</div>}
        <div>
          <div className="p-4 grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-8 md:grid-cols-3 md:gap-6">
            {allPokemons.map(({ id, sprites, name, types, abilities }) => (
              <PokemonCard
                key={id}
                id={id}
                image={sprites.other.home.front_default}
                name={name}
                type={types[0].type.name}
                ability={abilities
                  .map((abilityInfo) => {
                    const abilityName = abilityInfo.ability.name;
                    return (
                      abilityName.charAt(0).toUpperCase() + abilityName.slice(1)
                    );
                  })
                  .join(", ")}
              />
            ))}
          </div>
          {!error && (
            <button
              className="m-4 group relative inline-block focus:outline-none focus:ring"
              onClick={getAllPokemons}
            >
              <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                {constant.BUTTON_LABEL}
              </span>
            </button>
          )}
        </div>
      </div>
      {!loading && !error && <ScrollToTopButton />}
    </>
  );
};

export default App;
