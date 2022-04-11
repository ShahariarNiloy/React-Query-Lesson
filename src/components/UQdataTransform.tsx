import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4001/superheroes");
};

function UQdataTransform() {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes-data-transform",
    fetchSuperHeroes,
    {
      //!! Select helps to transform the data into any format, for example here we're getting data as an array of objects,
      //!! but after transforming we're getting only hero name in an array. any other modification is possible.
      select: (data: any) => {
        console.log("data", data);
        const afterDataTransformation = data?.data?.map(
          (hero: any) => hero.name
        );
        console.log("after transformation", afterDataTransformation);
        return afterDataTransformation;
      },
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
      <h2>Data Transformation</h2>
      <div>
        {data?.map((heroName: any) => {
          return <div key={heroName}>{heroName}</div>;
        })}
      </div>
    </>
  );
}

export default UQdataTransform;
