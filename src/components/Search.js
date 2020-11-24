import React from "react";

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    /**input para la busqueda. la propiedad search del useState contendrá el valor del input
            onChange desencadena el llamano a la funcion handleSearch
            ref={searchInput} -> */
    <div className="Search">
      <input
        type="text"
        value={search}
        ref={searchInput}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
