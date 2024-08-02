// import  React,{ useState } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchedLoggedInUserAsync, selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";


export default function UserProfile() {
  const dispatch = useDispatch();
  // TODO: We will add payment section when we work on backend.
  const {
    register,
    handleSubmit,
    reset,
    setValue,   // to set the initial value, it is easy way to avoid controlled form long method
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showAddAddressForm,setShowAddAddressForm] = useState(false);
  function handleEdit(updatedAddress, index) {
    const newUser = { ...user, addresses: [...user.addresses] } // to avoid shallow copy
    console.log({ newUser });
    newUser.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1);
    console.log({ user });
  }

  function handleEditForm(index) {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("country", address.country);
  }
  
  function handleAdd(address){
    const newUser = { ...user, addresses: [...user.addresses,address] } // to avoid shallow copy
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);

  }

  function handleRemove(e, index) {
    const newUser = { ...user, addresses: [...user.addresses] } // to avoid shallow copy
    console.log({ newUser });
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser))
    console.log({ user });
  }
  useEffect(() => {
    dispatch(fetchedLoggedInUserAsync(user.id));
  }, [dispatch, user])


  return (
    <div>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className=" text-3xl font-bold p-3 sm:my-2 tracking-tight text-gray-900">
            Name : {user.name === null ? user.name : "Anonymous"}
          </h1>
          <h3 className=" text-xl font-bold p-3 sm:my-2 tracking-tight text-green-900">
            email address : {user.email}
          </h3>
          <div className="flow-root">
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <button
          onClick={() => {setShowAddAddressForm(true); setSelectedEditIndex(-1)}}
          type="submit"
          className="rounded-md bg-green-600 px-3 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Address
        </button>
        {showAddAddressForm && <form action="" className="bg-white"
                autoComplete="true"
                noValidate onSubmit={handleSubmit((data) => {
                  handleAdd(data) // on which index need to update
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl px-2 font-semibold leading-7 text-gray-900 pt-5">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600 px-2">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-5">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", { required: "name is required" })}
                            id="full-name"

                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", { required: "email is required" })}
                            type="email"

                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country", { required: "country is required" })}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>India</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", { required: "street is required" })}
                            id="street-address"

                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", { required: "city is required" })}
                            id="city"

                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", { required: "state is required" })}
                            id="region"

                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pincode", { required: "pincode is required" })}
                            id="postal-code"

                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone📞
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", { required: "phone is required" })}
                            id="phone"

                            autoComplete="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 mx-5 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                  <div className="border-b border-gray-900/10 pb-12 px-5">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from existing addresses
                    </p>
                    <ul role="list">
                      {user.addresses.map((person, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              // onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {person.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.email}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.code}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col  sm:items-end">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              Phone: {person.phone}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {person.city}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payments Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payments"
                              checked={paymentMethod === 'cash'}
                              // onChange={handlePayment}
                              value="cash"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card"
                              checked={paymentMethod === 'card'}
                              // onChange={handlePayment}
                              name="payments"
                              value="card"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>}
          <p className="mt-0.5 text-sm text-gray-500">
            Your Address:
          </p>
          {user.addresses.map((address, index) => (

            <div key={index}>
              {selectedEditIndex === index && <form action="" className="bg-white"
                autoComplete="true"
                noValidate onSubmit={handleSubmit((data) => {
                  handleEdit(data, index) // on which index need to update
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl px-2 font-semibold leading-7 text-gray-900 pt-5">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600 px-2">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-5">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", { required: "name is required" })}
                            id="full-name"

                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", { required: "email is required" })}
                            type="email"

                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country", { required: "country is required" })}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>India</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", { required: "street is required" })}
                            id="street-address"

                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", { required: "city is required" })}
                            id="city"

                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", { required: "state is required" })}
                            id="region"

                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pincode", { required: "pincode is required" })}
                            id="postal-code"

                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone📞
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", { required: "phone is required" })}
                            id="phone"

                            autoComplete="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 mx-5 flex items-center justify-end gap-x-6">
                    <button
                      onClick={() => setSelectedEditIndex(-1)}
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Address
                    </button>
                  </div>
                  <div className="border-b border-gray-900/10 pb-12 px-5">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from existing addresses
                    </p>
                    <ul role="list">
                      {user.addresses.map((person, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              // onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {person.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.email}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.code}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col  sm:items-end">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              Phone: {person.phone}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {person.city}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payments Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payments"
                              checked={paymentMethod === 'cash'}
                              // onChange={handlePayment}
                              value="cash"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card"
                              checked={paymentMethod === 'card'}
                              // onChange={handlePayment}
                              name="payments"
                              value="card"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>}
              <div
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
                  <button
                    onClick={() => handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-gray-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={e => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-gray-500"
                  >
                    Remove
                  </button>


                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
