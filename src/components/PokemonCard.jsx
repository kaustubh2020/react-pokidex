import PropTypes from "prop-types";

const PokemonCard = ({ id, image, gif, name, type }) => {
  const style = `${type} thumb-container`;

  return (
    <div className={style}>
      <div className="number">
        <small>#{id}</small>
        <div>
          <img src={gif} alt={name} width={20} height={20} loading="lazy" />
        </div>
      </div>
      <img src={image} alt={name} width={120} height={120} loading="lazy" />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <small>Type: {type}</small>
      </div>
    </div>
  );
};

// Prop validation
PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  gif: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default PokemonCard;
