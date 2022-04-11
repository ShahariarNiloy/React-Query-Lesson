import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Home from "./components/Home";
import { ReactQueryDevtools } from "react-query/devtools";
import UseQuery from "./components/UseQuery";
import UQrefetch from "./components/UQrefetch";
import UQpolling from "./components/UQpolling";
import UQdataTransform from "./components/UQdataTransform";
import CustomHook from "./components/CustomHook";
import OneHero from "./components/OneHero";
import OneHeroInfo from "./components/OneHeroInfo";
import ParallelQuery from "./components/ParallelQuery";
import UseQueries from "./components/UseQueries";
import DependentQueries from "./components/DependentQueries";
import { PaginatedQueriesPage } from "./components/PaginatedQuery";
import { InfiniteQueriesPage } from "./components/InfiniteQueries";
import UseMutation from "./components/UseMutation";
import QueryInvalidation from "./components/QueryInvalidation";
import OptimisticUpdate from "./components/OptimisticUpdate";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">UseQuery</Link>
              </li>
              <li>
                <Link to="/refetch">Refetch</Link>
              </li>
              <li>
                <Link to="/polling">Polling</Link>
              </li>
              <li>
                <Link to="/dataTransformation">Data Transformation</Link>
              </li>
              <li>
                <Link to="/customhook">Custom Hook</Link>
              </li>
              <li>
                <Link to="/one-hero">One Hero</Link>
              </li>
              <li>
                <Link to="/parallel">Parallel Query</Link>
              </li>
              <li>
                <Link to="/usequeries">Use Queries</Link>
              </li>
              <li>
                <Link to="/dependentQuery">Dependent Query</Link>
              </li>
              <li>
                <Link to="/paginatedQuery">Paginated Query</Link>
              </li>
              <li>
                <Link to="/InfiniteQuery">Infinite Query</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/UseMutation">Use Mutation</Link>
              </li>
              <li>
                <Link to="/invalidateQueries">Query Invalidation</Link>
              </li>
              <li>
                <Link to="/optimisticUpdate">Optimistic Update</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/rq-super-heroes" element={<UseQuery />} />
            <Route path="/refetch" element={<UQrefetch />} />
            <Route path="/polling" element={<UQpolling />} />
            <Route path="/dataTransformation" element={<UQdataTransform />} />
            <Route path="/customhook" element={<CustomHook />} />
            <Route path="/one-hero/" element={<OneHero />} />
            <Route path="/one-hero/:heroId" element={<OneHeroInfo />} />
            <Route path="/parallel" element={<ParallelQuery />} />
            <Route path="/usequeries" element={<UseQueries />} />
            <Route path="/dependentQuery" element={<DependentQueries />} />
            <Route path="/paginatedQuery" element={<PaginatedQueriesPage />} />
            <Route path="/InfiniteQuery" element={<InfiniteQueriesPage />} />
            <Route path="/UseMutation" element={<UseMutation />} />
            <Route path="/invalidateQueries" element={<QueryInvalidation />} />
            <Route path="/optimisticUpdate" element={<OptimisticUpdate />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
