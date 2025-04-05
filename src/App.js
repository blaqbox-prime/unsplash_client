import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './Components/Root';
import './Styles/App.css';
import Home from './Pages/Home';
import SearchResults from './Pages/SearchResults';
import AppRoot from './Components/AppRoot';
import Collections from './Pages/Collections';
import Collection from './Pages/Collection';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {index: true, element: <Home />},
    ]
  },

  {
    element: <AppRoot />,
    children: [
      {path: '/search', element: <SearchResults />},
      {path: '/collections', element: <Collections />},
      {path: '/collections/:collectionId', element: <Collection />},
      {path: '/sign-in', element: <SignIn />},
      {path: '/sign-up', element: <SignUp />},
    ]
  }
]);

function App() {
  return ( 
    <RouterProvider router={router} />
  );
}

export default App;
