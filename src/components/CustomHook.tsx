import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4001/superheroes");
};
export const useSuperHeroes = () => {
  return useQuery("custom-hook-super-heroes", fetchSuperHeroes);
};

function CustomHook() {
  const { isLoading, data, isError, error } = useSuperHeroes();
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
      <h2>Custom Hook</h2>
      <div>
        {data?.data?.map((hero: any) => {
          return <div key={hero?.id}>{hero?.name}</div>;
        })}
      </div>
    </>
  );
}

export default CustomHook;
