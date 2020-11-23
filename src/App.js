import React from "react";
import "./App.css";

//conectamos nuestro componente Header al App.js
import Header from "./components/Header.js";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
