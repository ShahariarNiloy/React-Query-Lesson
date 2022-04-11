import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4001/superheroes");
};

function UQpolling() {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes-polling",
    fetchSuperHeroes,
    {
      refetchInterval: 2000, //!! refetch the query on this time limit. this query will refetch after each 2 second.
    }
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
      <h2>Polling</h2>
      <div>
        {data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
}

export default UQpolling;
