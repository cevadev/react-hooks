import { useState, useEffect } from "react";

/**
 * useEffect llama a nuestra api y pasa los datos a nuestra propiedad characters mediante la funcion setCharacters.
 * useEffect recibe una funcion anonima donde va la lógica y como segundo argumento es una variable que estará escuchando
 * en el caso que tenga un cambio, cuando no tenemos algo que useEffect deba escuchar pasamos un arreglo vacio asi solo
 * hace render la primera vez y no un ciclo infinito intentando renderizar elcontenido
 */
/**
 * Desacoplamos o modularizamos esta funcion que recupera todos los personajes de ryck and morty
 * cada vez que necesitemos los personje podemos utilizar este custom hooks.
 * @param {*} url -> url de la cual se llama a la api
 */
const useCharacters = (url) => {
  //logica de la funcion
  const [characters, setCharacters] = useState([]);
  //useEffecto recibe un funcion anonima
  useEffect(() => {
    fetch(url)
      //del llamado de la api obtenemos un response y lo convertimos en json
      .then((response) => response.json())
      //la informacion transformada (data) se la enviamos a la funcion para que actualice la propiedad characters
      .then((data) => setCharacters(data.results));
    //escuchamos cuando url cambie, cuando url llegue a nuestro llamado va estar escuchando para hacer la lógica
  }, [url]);
  //la funcion retorna el estado con los datos obtenido del llamado a la api
  return characters;
};

export default useCharacters;
