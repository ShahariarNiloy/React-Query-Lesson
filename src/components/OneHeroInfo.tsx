import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const fetchSuperHeroes = (id: any) => {
  return axios.get(`http://localhost:4001/superheroes/${id}`);
};

const onSuccess = (data: any) => {
  console.log("On Success Message", data);
};
const onError = (error: any) => {
  console.log("On Error Message", error);
};

function OneHeroInfo() {
  const id = useParams();
  const { isLoading, data, isError, error } = useQuery(["super-hero", id], () =>
    fetchSuperHeroes(id?.heroId)
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
      <h2>One Hero Info</h2>
      <div>
        <ul>
          <li>{data?.data?.name}</li>
          <li>{data?.data?.alterEgo}</li>
        </ul>
      </div>
    </>
  );
}

export default OneHeroInfo;
