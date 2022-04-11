import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4001/superheroes");
};

function OneHero() {
  const { isLoading, data, isError, error } = useQuery(
    "one-super-hero",
    fetchSuperHeroes
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    if (error instanceof Error) {
      return <h2>{error.message}</h2>;
    }
  }
  return (
    <>
      <h2>Use Query</h2>
      <div>
        {data?.data?.map((hero: any) => {
          return (
            <div key={hero?.id}>
              <Link to={`/one-hero/${hero.id}`}>{hero?.name}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default OneHero;
