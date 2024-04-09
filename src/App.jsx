import './App.css'
import CartPage from './pages/CartPage';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {  //for testing purpose
    path: "/cart",
    element: <CartPage/>,
  },
]);
function App() {

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
