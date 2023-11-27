import Authors from "./components/Authors";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Books from "./components/books";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/books',
    element: <Books />
  },
  {
    path: '/authors',
    element: <Authors />
  }
];

export default AppRoutes;
