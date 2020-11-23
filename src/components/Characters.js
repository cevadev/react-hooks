import React, { useState, useEffect, useReducer } from "react";

import "../styles/styles.css";

/**
 * creamos un estado inicial para trabajar con useReducer
 */
const initialState = {
  favorites: [],
};

/**
 * Creacion de reducer
 * state -> estado
 * action -> la accion a la que va a responder
 */
const favoriteReducer = (state, action) => {
  //la logica del reducer
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  //propiedad y funcion que van a trabajar con los personajes
  const [characters, setCharacters] = useState([]);

  //incorporamos al useReducer en el componente. al useReducer le pasamos nuestro reducer y el initialState
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  /**
   * useEffect llama a nuestra api y pasa los datos a nuestra propiedad characters mediante la funcion setCharacters.
   * useEffect recibe una funcion anonima donde va la lógica y como segundo argumento es una variable que estará escuchando
   * en el caso que tenga un cambio, cuando no tenemos algo que useEffect deba escuchar pasamos un arreglo vacio asi solo
   * hace render la primera vez y no un ciclo infinito intentando renderizar elcontenido
   */
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json()) //del llamado de la api obtenemos un response y lo convertimos en json
      .then((data) => setCharacters(data.results)); //la informacion transformada (data) se la enviamos a la funcion para que actualice la propiedad characters
  }, []);

  /**
   * esta funcion se encarga de consumir el disptach y enviar el valor a favorites
   */
  const handleClick = (favorite) => {
    dispatch({
      type: "ADD_TO_FAVORITE",
      payload: favorite,
    });
  };

  return (
    <div className="Characters">
      {
        /**mostramos nuestros favoritos. Cada vez que iteramos debemos crear un key */
        favorites.favorites.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))
      }

      {
        /**con map() retornamos un nuevo arreglo donde por cada personaje mostramos el nombre */
        characters.map((character) => (
          /**agregamos un key para que react lo identifique */
          <article className="Characters-item" key={character.id}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            {/**conectamos nuestra funcion anonima que llamara a handleClick() con la app a traves de un boton 
              que envia a un personaje seleccionado a favorites */}
            <button type="button" onClick={() => handleClick(character)}>
              Add to favorties
            </button>
          </article>
        ))
      }
    </div>
  );
};

export default Characters;
