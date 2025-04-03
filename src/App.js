import { createBrowserRouter, RouterProvider } from 'react-router';
import Root from './Components/Root';
import './Styles/App.css';
import Home from './Pages/Home';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {index: true, element: <Home />},
    ]
  },
]);

function App() {
  return ( 
    <RouterProvider router={router} />
  );
}

export default App;
