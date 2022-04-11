import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

function UseMutation() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const addSuperHero = (hero: any) => {
    return axios.post("http://localhost:4001/superheroes", hero);
  };
  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4001/superheroes");
  };
  const { data, refetch } = useQuery("super-heroes-mutation", fetchSuperHeroes);
  const { mutate } = useMutation(addSuperHero);
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

      {
        //!! To see recently posted hero value, have to manually refetch the same same query
      }
      <button onClick={() => refetch()}>Fetch Heroes</button>
      <div>
        {data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
}

export default UseMutation;
