// import  React,{ useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { discountedPrice } from "../../../app/constants";

export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id))
  }, [])

  return (
    <div>
      {orders?.map((order, index) => (
        <div key={index} >
          <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              <h1 className=" text-3xl font-bold p-3 sm:my-2 tracking-tight text-gray-900">
                Order# {order.id}
              </h1>
              <h3 className=" text-xl font-bold p-3 sm:my-2 tracking-tight text-green-900">
                Order status : {order.status}
              </h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">{discountedPrice(item.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mx-2 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
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
                <p>$ {order.totalAmount.toFixed(3)}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total items in Cart</p>
                <p>{order.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Your Address:
              </p>
              {user.addresses.map((address, index) => (
                <div key={index}
                  className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5"
                >
                  <div className="flex min-w-0 gap-x-4">

                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.email}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.code}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col  sm:items-end">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      Phone: {address.phone}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>))}

    </div>
  );
}
