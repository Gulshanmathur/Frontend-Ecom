import { useEffect, useState } from "react"
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants"
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, EyeIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import Pagination from "../../common/Pagination";
function AdminOrders() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({});
    const orders = useSelector(selectOrders);
    const totalOders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);

    function handleShow(order) {
        console.log("handleShow");
    }
    function handleEdit(order) {
        setEditableOrderId(order.id)
    }

    function handleDelete(id) {
        console.log("handleDelete");
    }
    function handleUpdate(e, order) {
        console.log("inside handleUpdate");
            
        const updatedOrder = { ...order, status: e.target.value }
        console.log({updatedOrder});
        
        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId(-1);
    }
    const handleSort = (sortOption) => {
        // FOR: sorting the item rating and price based;
        // console.log({sortOption});
        let newOrder = 'asc';
        // Toggle logic
        if (sort._sort === sortOption.sort) {
            newOrder = sort._order === 'asc' ? 'desc' : 'asc';
        }
        const newSort = { _sort: sortOption.sort, _order: newOrder };
        // const newSort = { _sort: sortOption.sort, _order: sortOption.order };
        setSort(newSort);
    }

    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-800';
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-800';
            case 'delivered':
                return 'bg-green-200 text-green-800';
            case 'cancelled':
                return 'bg-red-200 text-red-800';
            default:
                return 'bg-purple-200 text-purple-800';
        }
    }
    function handlePage(page) {

        setPage(page);
        // const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
        // dispatch(fetchAllOrdersAsync({ pagination }));    
    }
    useEffect(() => {
        //_per_page
        const pagination = { _page: page, _per_page: 5 };  //before use- ITEMS_PER_PAGE
        dispatch(fetchAllOrdersAsync({ sort, pagination }))
        //TODO: Server will filter the delted products
    }, [dispatch, page, sort])

    return (
        <div className="overflow-x-auto" >
            <div className="bg-gray-100 flex items-center justify-center font-sans overflow-scroll">
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto table-auto">
                    <thead className="bg-gray-50">
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm loading-normal">
                            <th
                                scope="col"
                                className="px-6 py-3 text-left cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider"
                                onClick={() => handleSort({ sort: 'id', order: sort?._order === 'asc' ? 'desc' : 'asc' })}
                            >
                                Order# {" "}
                                {
                                    sort._sort === 'id' && (sort._order === 'asc' ? (
                                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>) :
                                        (<ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                        ))
                                }
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Items
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider"
                                onClick={() => handleSort({ sort: 'totalAmount', order: sort?._order === 'asc' ? 'desc' : 'asc' })}
                            >
                                Total Amount {" "}
                                {
                                    sort._sort === 'totalAmount' && (sort._order === 'asc' ? (
                                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>) :
                                        (<ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                        ))
                                }
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Shipping Address
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders?.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                                            {/* <div className="text-sm text-gray-500">jane.cooper@example.com</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">

                                    {order.items.map((item, index) => (
                                            <div className="flex items-center" key={item.id}>
                                                <div className="mr-2">
                                                    <div key={index} className="text-sm text-gray-900">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.product.thumbnail}
                                                        />
                                                    </div>

                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {item.product.title.length > 17 ? item.product.title.substring(0, 19) : item.product.title} - #{item.quantity} - $ {discountedPrice(item.product)}
                                                </span>

                                            </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {order.id === editableOrderId ? (

                                        <select onChange={e => handleUpdate(e, order)} >
                                            <option value="choose status">...choose status...</option>
                                            <option value="pending">Pending</option>
                                            <option value="dispatched">Dispatched</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    ) : (<span className={`${chooseColor(order.status)} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                        {order.status}
                                    </span>)
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    $ {Math.round(order.totalAmount * 100) / 100}
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {
                                        order.selectedAddress.map((address,index) => (
                                            <div key={index}>
                                                <div>
                                                    <strong>{address.name}</strong>
                                                </div>
                                                <div>{address.street},</div>
                                                <div>{address.city},</div>
                                                <div>{address.state},</div>
                                                <div>{address.pincode},</div>
                                                <div>{address.phone}</div>
                                            </div>
                                        ))
                                    }

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm  font-medium">
                                    <div className="flex items-center space-x-2 ">
                                        <button onClick={e => handleShow(order)} className="text-indigo-600 hover:text-indigo-900">
                                            <EyeIcon className="w-4 h-4"></EyeIcon>
                                        </button>
                                        <button onClick={() => handleEdit(order)} className="text-indigo-600 hover:text-indigo-900">
                                            <PencilIcon className="w-4 h-4"></PencilIcon>
                                        </button>
                                        <button onClick={() => handleDelete(order)} className="ml-2 text-red-600 hover:text-red-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>))}

                        {/* More rows... */}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={orders.length} />
        </div>
    )
}

export default AdminOrders