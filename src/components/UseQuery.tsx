import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4001/superheroes");
};

const onSuccess = (data: any) => {
  console.log("On Success Message", data);
};
const onError = (error: any) => {
  console.log("On Error Message", error);
};

function UseQuery() {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes-use-query",
    fetchSuperHeroes,
    {
      onSuccess, //!! if the query is success then this callback will called if not then onError will be triggered
      onError,
      staleTime: 8000, //!! Keep the query into fresh state for a given time period. While query is in fresh state there will be no network call even if revisit the component.
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
      <h2>Use Query</h2>
      <div>
        {data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
}

export default UseQuery;
