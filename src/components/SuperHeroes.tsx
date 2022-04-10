import { useState, useEffect } from "react";
import axios from "axios";

export const SuperHeroes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>SuperHeroes</h2>
      <div>
        {data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
};
