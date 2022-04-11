import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNumber: any) => {
  return axios.get(`http://localhost:4001/colors?_limit=2&_page=${pageNumber}`); //!! _limit=&_page= how many item on one page and page number
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, data, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true, //!! keep and show the data of last successful api call while new data is being requested for fetching
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color: any) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
    </>
  );
};
