import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import Protected from './features/auth/components/Protected';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import ProductDetailPage from './pages/ProductDetailPage';
import SignupPage from './pages/SignupPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import OrderSuccesspage from './pages/OrderSuccess';
import PageNotFound from './pages/404';
import UserOrderPage from './pages/UserOrderPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccesspage></OrderSuccesspage>,
  },
  {
    path: "/orders",
    element: <UserOrderPage/>,
  },
  {  
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);
function App() {
const user = useSelector(selectLoggedInUser);
const dispatch =useDispatch();

 useEffect(() => {
   if(user){
     dispatch(fetchItemsByUserIdAsync(user.id))
   }
 }, [dispatch,user])
 
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
