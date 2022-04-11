import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

function QueryInvalidation() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4001/superheroes");
  };
  const { data } = useQuery("super-heroes-without-refetch", fetchSuperHeroes);

  const addSuperHero = (hero: any) => {
    return axios.post("http://localhost:4001/superheroes", hero);
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addSuperHero, {
    onSuccess: () => {
      //!! To see recently uploaded hero entity , now we don't need to manually refetch the same query. Simply invalidate te query by the query key which one is responsible for fetching the data, and after invalidation that query will automatically refetch the same query
      queryClient.invalidateQueries("super-heroes-without-refetch");
    },
  });
  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    mutate(hero);
  };
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <div>
        {data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
}

export default QueryInvalidation;
