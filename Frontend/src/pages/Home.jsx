import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"
import ProductList from "../features/product-list/components/ProductList"

function Home() {
  return (
    <div>
        <Navbar>
            <ProductList/>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default Home