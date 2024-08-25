import AdminProductDetails from "../features/admin/components/AdminProductDetails";
import NavBar from "../features/navbar/Navbar";  
function AdminProductDetailPage() {
    return ( 
        <div>
            <NavBar>
                <AdminProductDetails></AdminProductDetails>
            </NavBar>
        </div>
     );
}

export default AdminProductDetailPage;