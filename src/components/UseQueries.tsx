import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHeroes = (id: any) => {
  return axios.get(`http://localhost:4001/superheroes/${id}`);
};

const onSuccess = (data: any) => {
  console.log("On Success Message", data);
};
const onError = (error: any) => {
  console.log("On Error Message", error);
};

function UseQueries() {
  const heroId = [1, 3]; //!! These ids are hardcoded here but it can be dynamic value, by which dynamic parallel queries will be executed
  const heroes = useQueries(
    heroId.map((id: any) => {
      return {
        queryKey: ["hero", id],
        queryFn: () => fetchSuperHeroes(id),
      };
    })
  );
  console.log(heroes);

  return (
    <>
      <h2>Dynamic parallel queries</h2>
      <div>
        {heroes?.map((oneHero: any) => {
          {
            return (
              <div key={oneHero?.data?.data?.id}>
                {oneHero?.data?.data?.name}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default UseQueries;
