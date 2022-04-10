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
  const { isFetching, isLoading, data, isError, error, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    if (error instanceof Error) {
      return <h2>{error.message}</h2>;
    }
  }
  return (
    <>
      <h2>RQSuperHeroes</h2>
      <button onClick={() => refetch()}>Fetch Heroes</button>
      <div>
        {data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
}

export default UseQuery;
