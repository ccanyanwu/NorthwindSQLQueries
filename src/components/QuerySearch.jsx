//import modules, components and data
import { useState, useEffect } from "react";
import QueryResult from "./QueryResult";
import { bigData } from "../data/TableData";

const QuerySearch = () => {
  const [error, setError] = useState(false);

  //handle textinput state
  const [searchTerm, setSearchTerm] = useState("");

  //handle select dropdown menu state
  const [selectQuery, setSelectQuery] = useState("");

  //Table Name
  const [tableName, setTableName] = useState("");

  //predefined table showing customers
  const [searchResult, setSearchResult] = useState(bigData["categories"]);

  //loop through the data object
  const loopThroughData = (query) => {
    for (const key in bigData) {
      if (key === query) {
        setError(false);
        setSearchResult(bigData[key]);
        setTableName(key);
      }
    }
  };

  //handles re-render for text input
  useEffect(() => {
    const searchResultFetch = (bigData) => {
      //search for query in data
      const someTerm = Object.keys(bigData).some((data) => data === searchTerm);

      //clears error message on empty input
      if (searchTerm.length === 0) setError(false);

      if (!someTerm && !(searchTerm.length === 0)) {
        //validate the input
        setError(true);
        return;
      }

      loopThroughData(searchTerm);
    };

    searchResultFetch(bigData);
  }, [searchTerm]);

  //handles re-render for select dropdown menu
  useEffect(() => loopThroughData(selectQuery), [selectQuery]);

  //Query input
  const handleSearchTerm = (e) =>
    setSearchTerm(e.target.value.trim().toLocaleLowerCase());

  //Query Select
  const handleSelectQuery = (e) => setSelectQuery(e.currentTarget.value);

  return (
    <>
      <div id="querySearch">
        <div>
          <input
            type="text"
            id="searchTerm"
            onChange={handleSearchTerm}
            value={searchTerm}
            placeholder="Enter query"
          />

          {error && <p>your search doesnt match any data</p>}
        </div>

        <div>
          <label htmlFor="queries">Select Query</label><br />

          <select id="queries" value={selectQuery} onChange={handleSelectQuery}>
            <option value="categories">Categories</option>
            <option value="customers">Customers</option>
            <option value="employees">Employees</option>
            <option value="products">Products</option>
            <option value="suppliers">Suppliers</option>
          </select>
        </div>
      </div>

      <QueryResult data={searchResult} tableName={tableName} />
    </>
  );
};

export default QuerySearch;
