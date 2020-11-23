/**
 * En el header trabajaremos el dark mode y para lo logica emplearemos useState
 */
import React, { useState } from "react";

const Header = () => {
  /**
   * useState va a manejar el estado (darkMode) para ellos utilizamos una constante que manejara el estado y la funcion que
   * modificará dicho estado. Inicialmente el estado es false (useState(false))
   * La funcion setDarkMode hace el cambio entre el darkmode y el light mode
   */
  const [darkMode, setDarkMode] = useState(false); //valor inicial de darkMode es false

  /**
   * la funcion handleClick sera invocada por nuestro boton
   */
  function handleClick() {
    //al inicio darkMode es false. Haremos un toogle a cada click cambiara de darkMode a light mode
    //tomamos el valor booleano de darkMode y lo cambiamos a su valor booleano opuesto
    setDarkMode(!darkMode);
  }

  return (
    <div class="Header">
      <h1>React Hooks</h1>

      <button type="button" onClick={handleClick}>
        {darkMode ? "Dark Mode is ON" : "Light Mode is ON"}
      </button>

      <p>Ejemplo utilizando funcion anonima</p>
      <button type="button" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Dark Mode 2 is ON" : "Light Mode 2 is ON"}
      </button>
    </div>
  );
};

export default Header;
