import axios from "axios";
import React, { useState } from "react";

export const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    console.log("submited");
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const getData = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="pokemon"
            id="pokemon"
            className="input-container"
            onChange={handleChange}
            placeholder="Enter Pokemon Name"
          />
        </label>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} alt={data.name} />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell1">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell1">Height</div>
                  <div className="divTableCell">{data.height * 3.9}"</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell1">Weight</div>
                  <div className="divTableCell">{data.weight} kg</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell1">Battle Played</div>
                  <div className="divTableCell">{data.game_indices.length}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell1">Base exp.</div>
                  <div className="divTableCell">{data.base_experience}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
