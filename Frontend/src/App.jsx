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
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import OrderSuccesspage from './pages/OrderSuccess';
import PageNotFound from './pages/404';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchedLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AlertTemplate from "react-alert-template-basic";
import AdminProductDetailPage from './pages/AdminProdutDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider, transitions } from 'react-alert';
import { checkAuthAsync, selectloggedInUser, selectUserChecked } from './features/auth/authSlice';

const options = {
  position: positions.BOTTOM_LEFT,
  timeout: 2000,
  transition: transitions.SCALE,

};

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
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
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
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>,
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
    element: <UserOrderPage />,
  },
  {
    path: "/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);
function App() {
  const user = useSelector(selectloggedInUser);
  const userChecked = useSelector(selectUserChecked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [])


  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync())
      //we can get req.user by token on backend so need to give in front-end
      dispatch(fetchedLoggedInUserAsync())
    }
  }, [dispatch, user])

  return (
    <>
      {userChecked && <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
      }
    </>
  )
}

export default App
