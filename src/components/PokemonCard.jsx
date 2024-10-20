import PropTypes from "prop-types";
import { pokemonTypeColorCode } from "../constants/constants";

const PokemonCard = ({ id, image, name, type, ability }) => {
  const pokemonTypeColor =
    pokemonTypeColorCode[type.toLowerCase()] || "#C2C2A1";

  return (
    <>
      <div
        className="group relative block h-64 sm:h-80 lg:h-96"
        style={{
          background: `${pokemonTypeColor}`,
        }}
      >
        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

        <div
          className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-3 group-hover:-translate-y-3"
          style={{
            background: `linear-gradient(to right top, white, white, ${pokemonTypeColor}`,
          }}
        >
          <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <h5 className="text-sm font-thin sm:text-2xl">
              #{String(id).padStart(2, "0")}
            </h5>
            <img
              src={image}
              alt={name}
              width={200}
              height={200}
              className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-72 h-auto"
              loading="lazy"
            />
            <h2
              className="mt-4 text-xl font-extrabold sm:text-2xl uppercase"
              style={{ color: pokemonTypeColor }}
            >
              {name}
            </h2>
          </div>

          <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
            <p className="mt-4 text-sm sm:text-base">type: </p>
            <h3
              className=" text-xl font-extrabold sm:text-2xl first-letter:capitalize"
              style={{ color: pokemonTypeColor }}
            >
              {type}
            </h3>

            <div>
              <p className="mt-4 text-sm sm:text-base">ability: </p>
              <h3
                className=" text-xl font-extrabold sm:text-2xl first-letter:capitalize"
                style={{ color: pokemonTypeColor }}
              >
                {ability}
              </h3>
            </div>

            <div
              className="mt-8 font-bold text-left px-2 py-2 rounded-e-full text-white uppercase"
              style={{ backgroundColor: pokemonTypeColor }}
            >
              {name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Prop validation
PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ability: PropTypes.string.isRequired,
};

export default PokemonCard;
