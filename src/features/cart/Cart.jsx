// import { useState, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from "./cartSlice";
import { useId } from "react";
import { discountedPrice } from "../../app/constants";

// import { XMarkIcon } from "@heroicons/react/24/outline";
// const products = [
//   {
//     id: 1,
//     name: "Throwback Hip Bag",
//     href: "#",
//     color: "Salmon",
//     price: "$90.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
//     imageAlt:
//       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
//   },
//   {
//     id: 2,
//     name: "Medium Stuff Satchel",
//     href: "#",
//     color: "Blue",
//     price: "$32.00",
//     quantity: 1,
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
//     imageAlt:
//       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
//   },
//   // More products...
// ];
export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalAmount = items.reduce((amount, item)=> discountedPrice(item) * item.quentity + amount,0);
  const totalItems = items.reduce((total,item)=> item.quentity + total, 0 );
  const handleQuantity = (e,item)=>{
    dispatch (updateCartAsync({...item,quentity: +e.target.value}))
  }
  function handleRemove(e,id){
     dispatch(deleteItemFromCartAsync(id));
  }
  return (
    <>
    {!items.length && <Navigate to={"/"} replace = {true}></Navigate>}
    <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <h1 className=" text-3xl font-bold p-3 sm:my-2 tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items?.map((item,index) => (
              <li key={index} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.href}>{item.title}</a>
                      </h3>
                      <p className="ml-4">{discountedPrice(item)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mx-2 text-sm font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select onChange={e => handleQuantity(e,item)} value={item.quentity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={e=> handleRemove(e,item.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$ {totalAmount.toFixed(3)}</p>
        </div>
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Total items in Cart</p>
          <p>{totalItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <NavLink to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </NavLink>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <NavLink to="/">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              // onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
