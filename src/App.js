import React from "react";

import ThemeContext from "./context/ThemeContext.js";

import "./App.css";

//conectamos nuestro componente Header al App.js
import Header from "./components/Header.js";
import Charcaters from "./components/Characters.js";

function App() {
  const [theme, updateTheme] = React.useState("bg-light");

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div className={"App " + theme}>
        <Header />
        <Charcaters />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
