import React, { useState, useEffect } from "react";

const Characters = () => {
  //propiedad y funcion que van a trabajar con los personajes
  const [characters, setCharacters] = useState([]);

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

  return (
    <div className="Charcaters">
      {
        /**con map() retornamos un nuevo arreglo donde por cada personaje mostramos el nombre */
        characters.map((character) => (
          <h2>{character.name}</h2>
        ))
      }
    </div>
  );
};

export default Characters;
