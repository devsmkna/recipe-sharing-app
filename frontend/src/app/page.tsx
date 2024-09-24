"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((text) => setData(text));
  }, []);

  return (
    <div>
      <h1>Recipe sharing app</h1>
      <p>{data}</p>
    </div>
  );
};

export default Home;
