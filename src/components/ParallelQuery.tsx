import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4001/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4001/friends");
};

function ParallelQuery() {
  const superHero = useQuery("parallel-hero", fetchSuperHeroes);
  const friends = useQuery("parallel-friends", fetchFriends);

  if (superHero?.isLoading || friends?.isLoading) {
    return <h2>Loading...</h2>;
  }
  if (superHero?.isError || friends?.isError) {
    if (superHero?.error instanceof Error || friends?.error instanceof Error) {
      return <h2>Error</h2>;
    }
  }
  return (
    <>
      <h2>Parallel Query</h2>
      <h6>Super Heroes</h6>
      <div>
        {superHero?.data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
      <h6>Friends</h6>
      <div>
        {friends?.data?.data?.map((friend: any) => {
          return <div key={friend?.id}>{friend?.name}</div>;
        })}
      </div>
    </>
  );
}

export default ParallelQuery;
