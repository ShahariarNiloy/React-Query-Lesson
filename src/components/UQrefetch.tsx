import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4001/superheroes");
};

function UQrefetch() {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "super-heroes-refetch",
    fetchSuperHeroes,
    {
      enabled: false, //!! Enable false so that not to execute the query as default page load, it helps to trigger the query on any event (ex. button hit)
      cacheTime: 5000, //!! Set Cache Time
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
      <h2>Refetch</h2>
      <button onClick={() => refetch()}>Fetch Heroes</button>
      <div>
        {data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
}

export default UQrefetch;
