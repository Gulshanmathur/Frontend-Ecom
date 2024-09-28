import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { deleteItemFromCartAsync, selectCartStatus, selectItems, updateCartAsync } from "./cartSlice";
import { discountedPrice } from "../../app/constants";
import { Grid } from "react-loader-spinner";
// import Modal from "../common/Modal";

// import { XMarkIcon } from "@heroicons/react/24/outline";
export default function Cart() {
  console.log("inside cart")
  const dispatch = useDispatch();
  const items = useSelector(selectItems)??[];
  console.log(items);
  const totalAmount = items.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount, 0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const status = useSelector(selectCartStatus)

  // const [openModal,setOpenModal] = useState(null);
  const handleQuantity = (e, item) => {
    console.log(e.target.value)
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }))
  }
  function handleRemove(e, id) {
    e.preventDefault();
    dispatch(deleteItemFromCartAsync(id));
  }
  return (
    <>
      {!items.length && <Navigate to={"/"} replace={true}></Navigate>}
      {/* <Modal title="delete cart item" message="Are you sure you want to delete this cart item" dangerOption="delete" cancelOption="cancel" /> */}
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className=" text-3xl font-bold p-3 sm:my-2 tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            {status === 'loading' ? <Grid
              visible={true}
              height="80"
              width="80"
              color="rgb(79, 70, 229)"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            /> : null}
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items?.map((item, index) => (
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
                          Qty
                        </label> 
                        <select onChange={e => handleQuantity(e, item)} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>

                      <div className="flex">
                        {/* <Modal
                        /> */}
                        <button
                          onClick={(e) => handleRemove(e, item.id)}
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
