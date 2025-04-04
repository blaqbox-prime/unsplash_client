import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './Components/Root';
import './Styles/App.css';
import Home from './Pages/Home';
import SearchResults from './Pages/SearchResults';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {index: true, element: <Home />},
      {path: '/search', element: <SearchResults />},
    ]
  },
]);

function App() {
  return ( 
    <RouterProvider router={router} />
  );
}

export default App;
