import UserOrder from '../features/user/components/UserOrder'
import NavBar from "../features/navbar/Navbar";

function UserOrderPage() {
    return (
        <div>
            <NavBar>
                <h1 className='mx-auto text-2xl font-semibold'>My Orders</h1>
                <UserOrder></UserOrder>
            </NavBar>
        </div>
    )
}

export default UserOrderPage