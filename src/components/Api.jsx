import React, { useState, useEffect } from "react";
import axios from "axios";

export function Api() {
  const [posts, setPosts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        console.log(response);
        setPosts([posts, ...response.data]);
        setFilteredData([posts, ...response.data]);
      });
  }, []);

  useEffect(() => {
    const afterFilterData = posts.filter((post) => {
      if (post.name) {
        return post.name.includes(search);
      }
    });
    setFilteredData(afterFilterData);
  }, [search]);
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredData.map((post) => (
        <div key={post.id}>
          <h1>{post.name}</h1>
          <h1>{post.body}</h1>
        </div>
      ))}
    </div>
  );
}
