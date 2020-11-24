import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";

//ya no usamos useEffect e importamos nuestro custom hook
import useCharacters from "../hooks/useCharcaters.js";

import Search from "./Search.js";
import "../styles/styles.css";

/**
 * creamos un estado inicial para trabajar con useReducer
 */
const initialState = {
  favorites: [],
};

const API = "https://rickandmortyapi.com/api/character/";

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
  //const [characters, setCharacters] = useState([]); ya no la utilizamos porque es usada en el custom hook useCharacter

  //llamamos a nuestro custom hook
  const characters = useCharacters(API);

  //incorporamos al useReducer en el componente. al useReducer le pasamos nuestro reducer y el initialState
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  /**
   * useRef-> creamos una referencia hacia un valor (searchInput) que es el valor que ingresa el user para buscar un
   * personaje.
   * Esto nos permite trabajar con formularios y sus diversos campos o inputs
   */
  const searchInput = useRef(null);

  /**
   * useMemo -> Añadimos la propiedad de filtro o busqueda en nuestro componente, para la busqueda vamos  memorizar
   * las busquedad y cálculos.
   * useState que se encargara de la busqueda. le pasamos un valor vacio para hacer la inicializacion
   * handleSearch -> funcion que se encarga de manejar la busqueda
   */
  const [search, setSearch] = useState("");

  //ya no utilizamos handleSearch = (event) como la funte que contiene el valor a buscar sino nuestro searchInput que utiliza useRef
  /* const handleSearch = () => {
    //obtenemos el valor de loque estamos escribiendo en el input y lo enviamos a setSearch
    setSearch(searchInput.current.value);
    //setSearch(event.target.value);
  }; */

  /**
   * Adicionamos la logica de usCallbacka handleSearch.
   * El useCallback se encargara de recibir la funcion anonima y segundo parametro que es la refrencia al elemento que va a escuchar
   * y solo hara un cambio de la referencia cuando el elemento cambie, para nuestro caso es un arreglo vacio
   */
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  /**
   * FUNCION SIN useMemo
   * creamos nuestro filtro. Consultamos nuestros arreglo de personajes (characters) y sobre cada elemento
   * preguntamos si coincide el nombre con el nombre de la busqueda que ingresó el usuario
   */
  /* const filteredUsers = characters.filter((character) => {
    //retornamos el nombre del usuario en minusculas
    return character.name.toLowerCase().includes(search.toLowerCase());
  }); */

  /**
   * FUNCION CON useMemo con una funcion anonima y un arreglo que escucha sobre los personajes y sobre search
   */
  const filteredUsers = useMemo(
    () =>
      characters.filter((character) => {
        return character.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  /**
   * useEffect llama a nuestra api y pasa los datos a nuestra propiedad characters mediante la funcion setCharacters.
   * useEffect recibe una funcion anonima donde va la lógica y como segundo argumento es una variable que estará escuchando
   * en el caso que tenga un cambio, cuando no tenemos algo que useEffect deba escuchar pasamos un arreglo vacio asi solo
   * hace render la primera vez y no un ciclo infinito intentando renderizar elcontenido
   */
  /* useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json()) //del llamado de la api obtenemos un response y lo convertimos en json
      .then((data) => setCharacters(data.results)); //la informacion transformada (data) se la enviamos a la funcion para que actualice la propiedad characters
  }, []); */

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

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      {
        /**con map() retornamos un nuevo arreglo donde por cada personaje mostramos el nombre */
        //ya no es characters.map(...)
        filteredUsers.map((character) => (
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
