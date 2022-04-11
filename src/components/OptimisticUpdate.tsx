import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

function OptimisticUpdate() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4001/superheroes");
  };
  const { data } = useQuery("super-heroes-optimistic", fetchSuperHeroes);

  const addSuperHero = (hero: any) => {
    return axios.post("http://localhost:4001/superheroes", hero);
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addSuperHero, {
    onMutate: async (hero: any) => {
      //!! onMutate execute before mutation function execute && hero parameter is the same object that mutation function receive
      await queryClient.cancelQueries("super-heroes-optimistic"); //!! Cancel any outgoing refetch so that they don/t overwrite the optimistic update
      const previousHeroData = queryClient.getQueryData(
        "super-heroes-optimistic" //!! This previousHeroData is needed if any error occur and then this previous data can rollback
      );
      queryClient.setQueryData(
        //!! Setting the data before mutation occur for better UI experience
        "super-heroes-optimistic",
        (oldQueryData: any) => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData.data,
              { id: oldQueryData?.data?.length + 1, ...hero },
            ],
          };
        }
      );
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(
        "super-heroes-optimistic",
        context?.previousHeroData
      ); //!! Rollback logic if error occur
    },
    onSettled: () => {
      //!! onSettled is called after the mutation function execute, by this function a background refetch is called by invalidate the query
      queryClient.invalidateQueries("super-heroes-optimistic");
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

export default OptimisticUpdate;
