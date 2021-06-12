import github from "./db.js";
import {useEffect, useState, useCallback} from "react";
import './App.css';
import query from './Query';
import SearchBox from './SearchBox';
import RepoInfo from './RepoInfo';


function App() {

  const [userLocation, setUserLocation] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState("10");
  const [queryString, setQueryString] = useState("App");
  const [totalCount, setTotalCount] = useState(null);

  
    const fetchData = useCallback( () => {
      const queryText = JSON.stringify(query(pageCount, queryString));

      fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })  
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserLocation(viewer.location);
        setRepoList(repos);
        setTotalCount(total);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [pageCount, queryString]);
    
      useEffect(()=> {
        fetchData();
      }, [fetchData]);
  
  return (
    <div>
      <h1>
        <i></i>
      </h1>
      <p>Hey there from {userLocation}</p>
      <SearchBox
        totalCount = {totalCount}
        pageCount = {pageCount}
        queryString = {queryString}
        onTotalChange = {(myNumber) => {setPageCount(myNumber)}}
        onQueryChange = {(myString) => {setQueryString(myString)}} />
      { repoList && (
        <ul>
          {
            repoList.map((repo) => (
              <RepoInfo key={repo.id} repo={repo} />

            ))
          }
        </ul>
      )}
      
    </div>
  );
}

export default App;
